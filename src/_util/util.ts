import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import Debug from 'debug'
import globby from 'globby'
import indentStringModule from 'indent-string'
import YAML from 'js-yaml'
import _ from 'lodash'
import pMap from 'p-map'
import ts from 'typescript'
import { isValidHeaderKey, validateHeaderKeys } from './headerSchema.ts'

const debug = Debug('locutus:utils')
const indentString = (indentStringModule as { default?: typeof indentStringModule }).default || indentStringModule

interface LangDefaults {
  order: number
  function_title_template: string
  human: string
  packageType: string
  inspiration_urls: string[]
  function_description_template: string
  alias?: string[]
}

interface HeadKeys {
  [key: string]: string[][]
}

interface ParsedParams {
  headKeys: HeadKeys
  name: string
  filepath: string
  codepath: string
  code: string
  language: string
  category: string
  func_name: string
  func_arguments: string[]
  dependencies?: Record<string, ParsedParams>
  codeDependencies?: string[] // Extracted require() paths
}

interface StandaloneDependencyOptions {
  includeTypeOnlyImports?: boolean
}

interface WebsiteJsOptions {
  preserveBlankLines?: boolean
}

interface WebsiteJsFormatOptions {
  restorePreservedBlankLines?: boolean
}

type StandaloneMode = 'js' | 'ts'

interface StandaloneImportSpec {
  depKey: string
  localName: string
  importedName: string
  isTypeOnly: boolean
}

interface StandaloneStatementInfo {
  declaredNames: Set<string>
  runtimeTopLevelDeps: Set<string>
  allTopLevelDeps: Set<string>
  runtimeImportLocals: Set<string>
  typeImportLocals: Set<string>
}

interface StandaloneModuleInfo {
  moduleKey: string
  modulePath: string
  params: ParsedParams
  sourceFile: ts.SourceFile
  hasExternalImports: boolean
  statements: ts.Statement[]
  statementInfo: StandaloneStatementInfo[]
  declarationsByName: Map<string, Set<number>>
  exportToLocalName: Map<string, string>
  importSpecsByLocalName: Map<string, StandaloneImportSpec[]>
}

interface StandaloneModuleSelection {
  includedStatementIndexes: Set<number>
  depRuntimeNames: Map<string, Set<string>>
  depTypeNames: Map<string, Set<string>>
  runtimeAliases: Set<string>
  wrapperAliases: Set<string>
  wrapperRenameByStatementIndex: Map<number, string>
  typeAliases: Set<string>
}

type UnknownMap = { [key: string]: unknown }

type Callback<T = void> = (err: Error | null, result?: T) => void

const WEBSITE_BLANK_LINE_MARKER_COMMENT = '/*__LOCUTUS_PRESERVE_BLANK_LINE__*/'

class Util {
  __src: string
  __root: string
  __test: string
  globals: UnknownMap
  pattern: string[]
  concurrency: number
  authorKeys: string[]
  langDefaults: Record<string, LangDefaults>
  allowSkip: boolean
  _reindexBuffer: Record<string, string[]>
  _injectwebBuffer: Record<string, string>

  constructor(argv?: string[]) {
    if (!argv) {
      argv = []
    }
    this.__src = path.dirname(path.dirname(new URL(import.meta.url).pathname))
    this.__root = path.dirname(this.__src)
    this.__test = path.join(this.__root, 'test')

    this.globals = {}

    this.pattern = [
      this.__src + '/**/**/*.{js,ts}',
      '!**/index.js',
      '!**/index.ts',
      '!**/_util/**',
      '!**/*.mocha.js',
      '!**/*.vitest.ts',
    ]
    this.concurrency = 8
    this.authorKeys = [
      'original by',
      'improved by',
      'reimplemented by',
      'parts by',
      'bugfixed by',
      'revised by',
      'input by',
    ]

    this.langDefaults = {
      c: {
        order: 1,
        function_title_template: "[language]'s [category].[function] in JavaScript",
        human: 'C',
        packageType: 'header file',
        inspiration_urls: [
          '<a href="https://en.cppreference.com/w/c/numeric/math">the C math.h documentation</a>',
          '<a href="https://sourceware.org/git/?p=glibc.git;a=tree;f=math;hb=HEAD">the C math.h source</a>',
        ],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://en.cppreference.com/w/c/numeric/[category]/[function]">[language]'s [function] found in the [category].h header file</a> looks like.`,
      },
      golang: {
        order: 2,
        function_title_template: "[language]'s [category].[function] in JavaScript",
        human: 'Go',
        packageType: 'package',
        inspiration_urls: [
          '<a href="https://golang.org/pkg/strings/">Go strings documentation</a>',
          '<a href="https://golang.org/src/strings/strings.go">Go strings source</a>',
          '<a href="https://golang.org/src/strings/example_test.go">Go strings examples source</a>',
          '<a href="https://gophersjs.com">GopherJS</a>',
        ],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://golang.org/pkg/[category]/#[function]">[language]'s [category].[function]</a> looks like.`,
      },
      python: {
        order: 3,
        function_title_template: "[language]'s [category].[function] in JavaScript",
        human: 'Python',
        packageType: 'module',
        inspiration_urls: [
          '<a href="https://docs.python.org/3/library/string.html">the Python 3 standard library string page</a>',
        ],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://docs.python.org/3/library/[category].html#[category].[function]">[language]'s [category].[function]</a> looks like.`,
      },
      ruby: {
        order: 4,
        function_title_template: "[language]'s [category].[function] in JavaScript",
        human: 'Ruby',
        packageType: 'module',
        inspiration_urls: ['<a href="https://ruby-doc.org/core-2.2.2/Math.html">the Ruby core documentation</a>'],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://ruby-doc.org/core-2.2.2/[category].html#method-c-[function]">[language]'s [category].[function]</a> looks like.`,
      },
      php: {
        order: 5,
        function_title_template: "[language]'s [function] in JavaScript",
        human: 'PHP',
        packageType: 'extension',
        inspiration_urls: [
          '<a href="https://php.net/manual/en/book.strings.php">the PHP string documentation</a>',
          '<a href="https://github.com/php/php-src/blob/master/ext/standard/string.c#L5338">the PHP string source</a>',
          '<a href="https://github.com/php/php-src/blob/master/ext/standard/tests/strings/str_pad_variation1.phpt">a PHP str_pad test</a>',
        ],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://php.net/manual/en/function.[functiondashed].php">[language]'s [function]</a> looks like.`,
        alias: [
          '/categories/',
          '/categories/array/',
          '/categories/bc/',
          '/categories/ctype/',
          '/categories/datetime/',
          '/categories/exec/',
          '/categories/filesystem/',
          '/categories/funchand/',
          '/categories/i18n/',
          '/categories/index/',
          '/categories/info/',
          '/categories/json/',
          '/categories/math/',
          '/categories/misc/',
          '/categories/net/',
          '/categories/network/',
          '/categories/pcre/',
          '/categories/strings/',
          '/categories/url/',
          '/categories/var/',
          '/categories/xdiff/',
          '/categories/xml/',
          '/functions/index/',
          '/functions/',
          '/packages/',
          '/packages/index/',
        ],
      },
      perl: {
        order: 6,
        function_title_template: "[language]'s [category]::[function] in JavaScript",
        human: 'Perl',
        packageType: 'module',
        inspiration_urls: ['<a href="https://perldoc.perl.org/">the Perl documentation</a>'],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://perldoc.perl.org/[category]">[language]'s [category]::[function]</a> looks like.`,
      },
      lua: {
        order: 7,
        function_title_template: "[language]'s [category].[function] in JavaScript",
        human: 'Lua',
        packageType: 'library',
        inspiration_urls: ['<a href="https://www.lua.org/manual/5.4/">the Lua 5.4 manual</a>'],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://www.lua.org/manual/5.4/manual.html#pdf-[category].[function]">[language]'s [category].[function]</a> looks like.`,
      },
      r: {
        order: 8,
        function_title_template: "[language]'s [function] in JavaScript",
        human: 'R',
        packageType: 'function',
        inspiration_urls: [
          '<a href="https://stat.ethz.ch/R-manual/R-devel/library/base/html/00Index.html">the R base documentation</a>',
        ],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://stat.ethz.ch/R-manual/R-devel/library/[category]/html/[function].html">[language]'s [function]</a> looks like.`,
      },
      julia: {
        order: 9,
        function_title_template: "[language]'s [function] in JavaScript",
        human: 'Julia',
        packageType: 'function',
        inspiration_urls: ['<a href="https://docs.julialang.org/en/v1/">the Julia documentation</a>'],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://docs.julialang.org/en/v1/base/math/#Base.[function]">[language]'s [function]</a> looks like.`,
      },
      elixir: {
        order: 10,
        function_title_template: "[language]'s [category].[function] in JavaScript",
        human: 'Elixir',
        packageType: 'module',
        inspiration_urls: ['<a href="https://hexdocs.pm/elixir/">the Elixir documentation</a>'],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://hexdocs.pm/elixir/[category].html#[function]/1">[language]'s [category].[function]</a> looks like.`,
      },
      clojure: {
        order: 11,
        function_title_template: "[language]'s [category]/[function] in JavaScript",
        human: 'Clojure',
        packageType: 'function',
        inspiration_urls: ['<a href="https://clojuredocs.org/">ClojureDocs</a>'],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://clojuredocs.org/clojure.core/[function]">[language]'s [category]/[function]</a> looks like.`,
      },
      awk: {
        order: 12,
        function_title_template: "[language]'s [function] in JavaScript",
        human: 'AWK',
        packageType: 'function',
        inspiration_urls: ['<a href="https://www.gnu.org/software/gawk/manual/gawk.html">the GNU AWK manual</a>'],
        function_description_template: `Here's what our current JavaScript equivalent to <a href="https://www.gnu.org/software/gawk/manual/gawk.html#String-Functions">[language]'s [function]</a> looks like.`,
      },
    }

    this.allowSkip = argv.indexOf('--noskip') === -1

    this._reindexBuffer = {}
    this._injectwebBuffer = {}
  }

  async injectweb(cb: Callback): Promise<void> {
    try {
      this._injectwebBuffer = {}
      await this._runFunctionOnAll(this._injectwebOne.bind(this))

      // Copy rosetta.yml from src/ to website/source/_data/
      const rosettaSrc = path.join(this.__src, 'rosetta.yml')
      const rosettaDest = path.join(this.__root, 'website', 'source', '_data', 'rosetta.yml')
      if (fs.existsSync(rosettaSrc)) {
        await fs.promises.mkdir(path.dirname(rosettaDest), { recursive: true })
        await fs.promises.copyFile(rosettaSrc, rosettaDest)
        debug('copied rosetta.yml to website')
      }

      // Write all buffered index files
      let filesWritten = 0
      for (const indexHtml in this._injectwebBuffer) {
        const html = this._injectwebBuffer[indexHtml]
        if (typeof html === 'undefined') {
          continue
        }
        debug('writing: ' + indexHtml)
        fs.writeFileSync(indexHtml, html, 'utf-8')
        filesWritten++
      }

      // Verification: ensure expected language index files were created
      const expectedLanguages = Object.keys(this.langDefaults)
      const missingLanguages: string[] = []
      for (const lang of expectedLanguages) {
        const langIndexPath = path.join(this.__root, 'website', 'source', lang, 'index.html')
        if (!fs.existsSync(langIndexPath)) {
          missingLanguages.push(lang)
        }
      }

      if (missingLanguages.length > 0) {
        throw new Error(
          `injectweb verification failed: missing language index files for: ${missingLanguages.join(', ')}`,
        )
      }

      // Verify minimum expected index files (5 languages + ~30 categories = ~35)
      const minExpectedIndexFiles = 30
      if (filesWritten < minExpectedIndexFiles) {
        throw new Error(
          `injectweb verification failed: only ${filesWritten} index files written, expected at least ${minExpectedIndexFiles}`,
        )
      }

      debug(`injectweb complete: ${filesWritten} index files written`)
      cb(null)
    } catch (err) {
      cb(err instanceof Error ? err : new Error(String(err)))
    }
  }

  async reindex(cb: Callback): Promise<void> {
    try {
      this._reindexBuffer = {}
      await this._runFunctionOnAll(this._reindexOne.bind(this))

      for (const indexJs in this._reindexBuffer) {
        const requires = this._reindexBuffer[indexJs]
        if (!requires) {
          continue
        }
        requires.sort()
        debug('writing: ' + indexJs)
        fs.writeFileSync(indexJs, requires.join('\n') + '\n', 'utf-8')
      }
      cb(null)
    } catch (err) {
      cb(err instanceof Error ? err : new Error(String(err)))
    }
  }

  async writetests(cb: Callback): Promise<void> {
    try {
      await this._runFunctionOnAll(this._writetestOne.bind(this))
      cb(null)
    } catch (err) {
      cb(err instanceof Error ? err : new Error(String(err)))
    }
  }

  async _runFunctionOnAll(runFunc: (params: ParsedParams) => Promise<void>): Promise<void> {
    debug({ pattern: this.pattern })
    const files = globby.sync(this.pattern)

    if (files.length === 0) {
      throw new Error(`No files found matching pattern: ${this.pattern.join(', ')}`)
    }

    debug(`Processing ${files.length} files with concurrency ${this.concurrency}`)

    await pMap(
      files,
      async (fullpath: string) => {
        const params = await this._load(fullpath, {})
        if (params) {
          await runFunc(params)
        }
      },
      { concurrency: this.concurrency },
    )
  }

  _reindexOne(params: ParsedParams): Promise<void> {
    const fullpath = this.__src + '/' + params.filepath
    const dir = path.dirname(fullpath)
    const ext = path.extname(fullpath)
    const basefile = path.basename(fullpath, ext)
    const indexTs = dir + '/index.ts'

    if (!this._reindexBuffer[indexTs]) {
      this._reindexBuffer[indexTs] = []
    }

    const scriptKind = params.filepath.endsWith('.ts') ? ts.ScriptKind.TS : ts.ScriptKind.JS
    const sourceFile = ts.createSourceFile(params.filepath, params.code, ts.ScriptTarget.ES2022, true, scriptKind)
    const exportNames = new Set<string>()

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isFunctionDeclaration(node) && node.name) {
        const modifiers = ts.getModifiers(node)
        const hasExport = modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
        if (hasExport) {
          exportNames.add(node.name.text)
        }
        return
      }

      if (ts.isVariableStatement(node)) {
        const modifiers = ts.getModifiers(node)
        const hasExport = modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
        if (!hasExport) {
          return
        }

        for (const declaration of node.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name)) {
            exportNames.add(declaration.name.text)
          }
        }
      }
    })

    if (exportNames.size === 0) {
      exportNames.add(params.func_name)
    }

    for (const exportName of exportNames) {
      const line = `export { ${exportName} } from './${basefile}.ts'`
      if (!this._reindexBuffer[indexTs]?.includes(line)) {
        this._reindexBuffer[indexTs]?.push(line)
      }
    }
    return Promise.resolve()
  }

  async _injectwebOne(params: ParsedParams): Promise<void> {
    const authors: Record<string, string[]> = {}
    this.authorKeys.forEach((key) => {
      if (params.headKeys[key]) {
        authors[key] = _.flattenDeep(params.headKeys[key])
      }
    })

    const langPath = [this.__root, '/website/source/', params.language].join('')

    const langIndexPath = langPath + '/index.html'
    const catPath = langPath + '/' + params.category
    const catIndexPath = catPath + '/' + 'index.html'
    const funcPath = catPath + '/' + params.func_name + '.html'
    const langDefaults = this.langDefaults[params.language]
    if (!langDefaults) {
      throw new Error(`Unknown language defaults for: ${params.language}`)
    }

    if (!this._injectwebBuffer[langIndexPath]) {
      let langTitle = ''
      langTitle += langDefaults.human + ' '
      langTitle += langDefaults.packageType + 's '
      langTitle += ' in JavaScript'

      const langData = Object.assign({}, langDefaults, {
        warning: 'This file is auto generated by `yarn web:inject`, do not edit by hand',
        type: 'language',
        layout: 'language',
        language: params.language,
        title: langTitle,
      })
      this._injectwebBuffer[langIndexPath] = '---' + '\n' + YAML.dump(langData).trim() + '\n' + '---' + '\n'
    }

    if (!this._injectwebBuffer[catIndexPath]) {
      let catTitle = ''
      catTitle += langDefaults.human + "'s "
      catTitle += params.category + ' '
      catTitle += langDefaults.packageType + ' '
      catTitle += ' in JavaScript'

      const catData = {
        warning: 'This file is auto generated by `yarn web:inject`, do not edit by hand',
        type: 'category',
        layout: 'category',
        language: params.language,
        category: params.category,
        title: catTitle,
      }
      this._injectwebBuffer[catIndexPath] = '---' + '\n' + YAML.dump(catData).trim() + '\n' + '---' + '\n'
    }

    const functionTitle = langDefaults.function_title_template
      .replace(/\[language]/g, langDefaults.human)
      .replace(/\[category]/g, params.category)
      .replace(/\[function]/g, params.func_name)
      .replace(/\[functiondashed]/g, params.func_name.replace(/_/g, '-'))

    const functionDescription = langDefaults.function_description_template
      .replace(/\[language]/g, langDefaults.human)
      .replace(/\[category]/g, params.category)
      .replace(/\[function]/g, params.func_name)
      .replace(/\[functiondashed]/g, params.func_name.replace(/_/g, '-'))

    // Extract parity verified values (e.g., "PHP 8.3", "Python 3.12")
    const parityVerified = (params.headKeys['parity verified'] || []).map((lines) => lines.join('\n'))

    const isTS = params.filepath.endsWith('.ts')

    const funcData: UnknownMap = {
      warning: 'This file is auto generated by `yarn web:inject`, do not edit by hand',
      examples: (params.headKeys.example || []).map((lines) => lines.join('\n')),
      returns: (params.headKeys.returns || []).map((lines) => lines.join('\n')),
      dependencies: params.codeDependencies || [],
      authors: authors || {},
      notes: (params.headKeys.note || []).map((lines) => lines.join('\n')),
      parityVerified: parityVerified.length > 0 ? parityVerified : null,
      isTypescript: isTS,
      type: 'function',
      layout: 'function',
      title: functionTitle,
      description: functionDescription,
      function: params.func_name,
      category: params.category,
      language: params.language,
      permalink: params.language + '/' + params.category + '/' + params.func_name + '/',
      alias: [
        '/functions/' + params.language + '/' + params.func_name + '/',
        '/functions/' + params.category + '/' + params.func_name + '/',
        '/' + params.language + '/' + params.func_name + '/',
      ],
    }

    if (params.language === 'php') {
      ;(funcData.alias as string[]).push('/functions/' + params.func_name + '/')
    }

    let buf = '---' + '\n' + YAML.dump(funcData).trim() + '\n' + '---' + '\n'

    if (isTS) {
      const hasStandaloneDependencies = (params.codeDependencies || []).length > 0
      const jsCode = this._formatWebsiteJavascript(
        this._toWebsiteJs(params.code, { preserveBlankLines: true }),
        params.filepath.replace(/\.ts$/, '.js'),
        { restorePreservedBlankLines: true },
      )
      const standaloneCode = hasStandaloneDependencies ? await this._buildStandaloneJs(params) : ''
      const standaloneTsCode = hasStandaloneDependencies ? await this._buildStandaloneTs(params) : null

      buf += `<div class="code-tab-panel" data-lang="ts">\n{% codeblock lang:typescript %}${params.code}{% endcodeblock %}\n</div>\n`
      buf += `<div class="code-tab-panel" data-lang="js" style="display:none">\n{% codeblock lang:javascript %}${jsCode}{% endcodeblock %}\n</div>\n`
      if (hasStandaloneDependencies && standaloneTsCode) {
        buf += `<div class="code-tab-panel" data-lang="standalone-ts" style="display:none">\n{% codeblock lang:typescript %}${standaloneTsCode}{% endcodeblock %}\n</div>\n`
      }
      if (hasStandaloneDependencies && standaloneCode.trim().length > 0) {
        buf += `<div class="code-tab-panel" data-lang="standalone-js" style="display:none">\n{% codeblock lang:javascript %}${standaloneCode}{% endcodeblock %}\n</div>`
      }
    } else {
      buf += `{% codeblock lang:javascript %}${params.code}{% endcodeblock %}`
    }

    await fs.promises.mkdir(path.dirname(funcPath), { recursive: true })
    await fs.promises.writeFile(funcPath, buf, 'utf-8')
  }

  _addRequire(name: string, relativeSrcForTest: string): string {
    const isTs = relativeSrcForTest.endsWith('.ts')
    const suffix = isTs ? '.' + name : ''
    return ['const ', name, " = require('", relativeSrcForTest, "')", suffix].join('')
  }

  _addRequireExport(localName: string, exportName: string, relativeSrcForTest: string): string {
    const isTs = relativeSrcForTest.endsWith('.ts')
    if (isTs) {
      return ['const ', localName, " = require('", relativeSrcForTest, "').", exportName].join('')
    }
    return ['const ', localName, " = require('", relativeSrcForTest, "')"].join('')
  }

  _resolveSourceExt(subpath: string): string {
    if (fs.existsSync(path.join(this.__src, subpath + '.ts'))) {
      return subpath + '.ts'
    }
    return subpath + '.js'
  }

  _markWebsiteBlankLines(code: string): string {
    return code
      .split('\n')
      .map((line) => {
        if (line.trim().length === 0) {
          return WEBSITE_BLANK_LINE_MARKER_COMMENT
        }
        return line
      })
      .join('\n')
  }

  _restoreWebsiteBlankLines(code: string): string {
    return code.replace(/^\s*\/\*__LOCUTUS_PRESERVE_BLANK_LINE__\*\/;?\s*$/gm, '')
  }

  _toWebsiteJs(code: string, options: WebsiteJsOptions = {}): string {
    // website/source snippets are generated snapshots; refresh with `yarn injectweb` after signature changes.
    const sourceCode = options.preserveBlankLines ? this._markWebsiteBlankLines(code) : code
    const jsResult = ts.transpileModule(sourceCode, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        removeComments: false,
        newLine: ts.NewLineKind.LineFeed,
      },
    })

    // Halve indentation (tsc emits 4 spaces, we use 2) and trim trailing whitespace
    return jsResult.outputText
      .split('\n')
      .map((line) => {
        const match = line.match(/^( +)/)
        if (!match) {
          return line
        }
        const prefix = match[1]
        if (!prefix) {
          return line
        }
        const spaces = prefix.length
        return ' '.repeat(Math.floor(spaces / 2)) + line.slice(spaces)
      })
      .join('\n')
      .trimEnd()
  }

  _resolveBiomeBinPath(): string | null {
    const biomeBinName = process.platform === 'win32' ? 'biome.cmd' : 'biome'
    const localBiomeBin = path.join(this.__root, 'node_modules', '.bin', biomeBinName)
    if (fs.existsSync(localBiomeBin)) {
      return localBiomeBin
    }
    return null
  }

  _formatWebsiteJavascript(code: string, sourcePath: string, options: WebsiteJsFormatOptions = {}): string {
    const finalize = (text: string): string => {
      const formatted = options.restorePreservedBlankLines ? this._restoreWebsiteBlankLines(text) : text
      return formatted.trimEnd()
    }

    const input = code.trimEnd()
    if (!input) {
      return ''
    }

    const biomeBin = this._resolveBiomeBinPath()
    if (!biomeBin) {
      return finalize(input)
    }

    const result = spawnSync(biomeBin, ['format', '--stdin-file-path', sourcePath], {
      encoding: 'utf8',
      input,
      maxBuffer: 16 * 1024 * 1024,
    })

    if (result.error || result.status !== 0 || typeof result.stdout !== 'string') {
      const stderr = typeof result.stderr === 'string' ? result.stderr.trim() : ''
      if (stderr) {
        debug(`biome format failed for ${sourcePath}: ${stderr}`)
      }
      return finalize(input)
    }

    const output = result.stdout.trimEnd()
    return finalize(output || input)
  }

  _toCommonJsRuntimeCode(code: string, options: { sourcePath: string }): string {
    return ts
      .transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.CommonJS,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          removeComments: false,
          newLine: ts.NewLineKind.LineFeed,
        },
        fileName: options.sourcePath,
      })
      .outputText.trimEnd()
  }

  _extractRelativeImportAliases(sourceFile: ts.SourceFile): string[] {
    const aliases = new Set<string>()

    const addAlias = (localName: string, importedName: string): void => {
      if (localName === importedName) {
        return
      }
      aliases.add(`const ${localName} = ${importedName};`)
    }

    ts.forEachChild(sourceFile, (node) => {
      if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) {
        return
      }

      const importPath = node.moduleSpecifier.text
      if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
        return
      }

      const importClause = node.importClause
      if (!importClause || importClause.isTypeOnly) {
        return
      }

      if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
        for (const importElement of importClause.namedBindings.elements) {
          if (importElement.isTypeOnly) {
            continue
          }
          const localName = importElement.name.text
          const importedName = importElement.propertyName?.text || localName
          addAlias(localName, importedName)
        }
      }
    })

    return Array.from(aliases)
  }

  _stripLocutusModuleSyntax(jsCode: string): string {
    return jsCode
      .replace(/^\s*import[\s\S]*?from\s+['"](?:\.\.?\/)[^'"]+['"];\s*$/gm, '')
      .replace(/^\s*export\s+\{[^}]+\};?\s*$/gm, '')
      .replace(
        /^(\s*)export\s+(?=(?:async\s+)?function\b|const\b|let\b|var\b|class\b|type\b|interface\b|enum\b)/gm,
        '$1',
      )
      .replace(/^(\s*)export\s+default\s+/gm, '$1')
      .trim()
  }

  async _collectStandaloneDependencyParams(
    params: ParsedParams,
    options: StandaloneDependencyOptions = {},
    seen = new Set<string>(),
    visiting = new Set<string>(),
  ): Promise<ParsedParams[]> {
    const ordered: ParsedParams[] = []
    const includeTypeOnlyImports = options.includeTypeOnlyImports === true

    const nestedDepsFor = (moduleParams: ParsedParams): string[] => {
      const deps = [...(moduleParams.codeDependencies || [])]
      if (!includeTypeOnlyImports) {
        return deps
      }

      const moduleIsTs = moduleParams.filepath.endsWith('.ts')
      const scriptKind = moduleIsTs ? ts.ScriptKind.TS : ts.ScriptKind.JS
      const sourceFile = ts.createSourceFile(
        moduleParams.filepath,
        moduleParams.code,
        ts.ScriptTarget.ES2022,
        true,
        scriptKind,
      )
      const importDeps = this._extractDependencies(sourceFile, moduleParams.filepath, {
        includeTypeOnlyImports: true,
      })
      for (const importDep of importDeps) {
        if (deps.indexOf(importDep) === -1) {
          deps.push(importDep)
        }
      }
      return deps
    }

    const visit = async (depCodePath: string): Promise<void> => {
      const depKey = depCodePath.replace(/\.(js|ts)$/, '')
      if (seen.has(depKey) || visiting.has(depKey)) {
        return
      }
      visiting.add(depKey)

      const depLoadPath =
        depCodePath.endsWith('.js') || depCodePath.endsWith('.ts') ? depCodePath : this._resolveSourceExt(depCodePath)
      const depParams = await this._load(depLoadPath, params)
      if (depParams) {
        for (const nestedDep of nestedDepsFor(depParams)) {
          await visit(nestedDep)
        }
        ordered.push(depParams)
        seen.add(depKey)
      }
      visiting.delete(depKey)
    }

    for (const depCodePath of nestedDepsFor(params)) {
      await visit(depCodePath)
    }

    return ordered
  }

  async _buildStandaloneJs(params: ParsedParams): Promise<string> {
    return (await this._buildStandalone(params, 'js')) || ''
  }

  _buildStandaloneTs(params: ParsedParams): Promise<string | null> {
    return this._buildStandalone(params, 'ts')
  }

  async _buildStandalone(params: ParsedParams, mode: StandaloneMode): Promise<string | null> {
    const includeTypeOnlyImports = mode === 'ts'
    const dependencies = await this._collectStandaloneDependencyParams(params, {
      includeTypeOnlyImports,
    })
    const modules = [...dependencies, params]
    const moduleInfoByKey = new Map<string, StandaloneModuleInfo>()
    const moduleOrder: string[] = []

    for (const moduleParams of modules) {
      const info = this._createStandaloneModuleInfo(moduleParams)
      if (mode === 'ts' && info.hasExternalImports) {
        return null
      }
      moduleInfoByKey.set(info.moduleKey, info)
      moduleOrder.push(info.moduleKey)
    }

    const rootKey = params.filepath.replace(/\.(js|ts)$/, '')
    const runtimeRequiredByModule = new Map<string, Set<string>>()
    const typeRequiredByModule = new Map<string, Set<string>>()
    this._addRequiredName(runtimeRequiredByModule, rootKey, params.func_name)

    const selectionByModule = new Map<string, StandaloneModuleSelection>()
    let changed = true
    while (changed) {
      changed = false

      for (const moduleKey of moduleOrder) {
        const info = moduleInfoByKey.get(moduleKey)
        if (!info) {
          continue
        }

        const runtimeRequired = runtimeRequiredByModule.get(moduleKey) || new Set<string>()
        const typeRequired = typeRequiredByModule.get(moduleKey) || new Set<string>()
        if (moduleKey !== rootKey && runtimeRequired.size === 0 && typeRequired.size === 0) {
          continue
        }

        const selection = this._selectStandaloneModuleSymbols(info, runtimeRequired, typeRequired, mode)
        selectionByModule.set(moduleKey, selection)

        for (const [depKey, names] of selection.depRuntimeNames.entries()) {
          for (const name of names) {
            if (this._addRequiredName(runtimeRequiredByModule, depKey, name)) {
              changed = true
            }
          }
        }

        for (const [depKey, names] of selection.depTypeNames.entries()) {
          for (const name of names) {
            if (this._addRequiredName(typeRequiredByModule, depKey, name)) {
              changed = true
            }
          }
        }
      }
    }

    const chunks: string[] = []
    for (const moduleKey of moduleOrder) {
      const info = moduleInfoByKey.get(moduleKey)
      if (!info) {
        continue
      }

      const runtimeRequired = runtimeRequiredByModule.get(moduleKey) || new Set<string>()
      const typeRequired = typeRequiredByModule.get(moduleKey) || new Set<string>()
      if (moduleKey !== rootKey && runtimeRequired.size === 0 && typeRequired.size === 0) {
        continue
      }

      const selection =
        selectionByModule.get(moduleKey) ||
        this._selectStandaloneModuleSymbols(info, runtimeRequired, typeRequired, mode)

      const selectedModuleCode = this._renderStandaloneModule(
        info,
        selection.includedStatementIndexes,
        selection.wrapperRenameByStatementIndex,
      )
      if (!selectedModuleCode.trim()) {
        continue
      }

      let renderedModuleCode = selectedModuleCode
      if (mode === 'js') {
        renderedModuleCode = this._stripLocutusModuleSyntax(
          this._toWebsiteJs(renderedModuleCode, { preserveBlankLines: true }),
        )
      } else {
        renderedModuleCode = this._stripLocutusModuleSyntax(renderedModuleCode)
      }

      const aliasLines = [...selection.runtimeAliases, ...selection.typeAliases]
      const wrapperAliasLines = [...selection.wrapperAliases]
      const moduleLabel =
        moduleKey === rootKey ? 'target function module' : this._describeStandaloneDependencyRole(info.modulePath)
      let chunk = `// ${info.modulePath} (${moduleLabel})\n`
      if (aliasLines.length > 0) {
        chunk += aliasLines.join('\n') + '\n\n'
      }
      chunk += renderedModuleCode
      if (wrapperAliasLines.length > 0) {
        chunk += `\n\n${wrapperAliasLines.join('\n')}`
      }
      chunks.push(chunk.trim())
    }

    const output = chunks.join('\n\n').trimEnd()
    if (mode === 'js') {
      return this._formatWebsiteJavascript(output, `${params.filepath}.standalone.js`, {
        restorePreservedBlankLines: true,
      })
    }
    return output
  }

  _createStandaloneModuleInfo(moduleParams: ParsedParams): StandaloneModuleInfo {
    const moduleIsTs = moduleParams.filepath.endsWith('.ts')
    const scriptKind = moduleIsTs ? ts.ScriptKind.TS : ts.ScriptKind.JS
    const sourceFile = ts.createSourceFile(
      moduleParams.filepath,
      moduleParams.code,
      ts.ScriptTarget.ES2022,
      true,
      scriptKind,
    )
    const moduleKey = moduleParams.filepath.replace(/\.(js|ts)$/, '')
    const modulePath = moduleKey
    const statements = sourceFile.statements.slice()
    const declarationsByName = new Map<string, Set<number>>()
    const exportToLocalName = new Map<string, string>()
    const importSpecsByLocalName = new Map<string, StandaloneImportSpec[]>()
    const statementDeclaredNames: Array<Set<string>> = []

    for (let index = 0; index < statements.length; index++) {
      const statement = statements[index]
      if (!statement) {
        continue
      }

      const declaredNames = this._collectStatementDeclaredNames(statement)
      statementDeclaredNames.push(declaredNames)

      for (const declaredName of declaredNames) {
        if (!declarationsByName.has(declaredName)) {
          declarationsByName.set(declaredName, new Set<number>())
        }
        declarationsByName.get(declaredName)?.add(index)
      }

      const exportedNames = this._collectStatementExportedNames(statement, declaredNames)
      for (const [exportedName, localName] of exportedNames.entries()) {
        exportToLocalName.set(exportedName, localName)
      }

      if (
        !ts.isImportDeclaration(statement) ||
        !statement.moduleSpecifier ||
        !ts.isStringLiteral(statement.moduleSpecifier)
      ) {
        continue
      }

      const importPath = statement.moduleSpecifier.text
      if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
        continue
      }

      const depKey = path.normalize(path.join(path.dirname(moduleKey), importPath)).replace(/\.(js|ts)$/, '')
      const importClause = statement.importClause
      if (!importClause) {
        continue
      }

      if (importClause.name) {
        this._addStandaloneImportSpec(importSpecsByLocalName, {
          depKey,
          localName: importClause.name.text,
          importedName: 'default',
          isTypeOnly: importClause.isTypeOnly,
        })
      }

      if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
        for (const importElement of importClause.namedBindings.elements) {
          const localName = importElement.name.text
          const importedName = importElement.propertyName?.text || localName
          const isTypeOnly = importClause.isTypeOnly || importElement.isTypeOnly
          this._addStandaloneImportSpec(importSpecsByLocalName, {
            depKey,
            localName,
            importedName,
            isTypeOnly,
          })
        }
      }
    }

    const topLevelNames = new Set<string>(declarationsByName.keys())
    const runtimeImportLocals = new Set<string>()
    const typeImportLocals = new Set<string>()
    for (const [localName, importSpecs] of importSpecsByLocalName.entries()) {
      const hasRuntimeImport = importSpecs.some((importSpec) => !importSpec.isTypeOnly)
      if (hasRuntimeImport) {
        runtimeImportLocals.add(localName)
      }

      const hasTypeImport = importSpecs.some((importSpec) => importSpec.isTypeOnly)
      if (hasTypeImport) {
        typeImportLocals.add(localName)
      }
    }

    const statementInfo: StandaloneStatementInfo[] = []
    for (let index = 0; index < statements.length; index++) {
      const statement = statements[index]
      if (!statement) {
        continue
      }
      const declaredNames = statementDeclaredNames[index] || new Set<string>()

      const runtimeRefs = this._collectReferencedIdentifiers(statement, false)
      const allRefs = this._collectReferencedIdentifiers(statement, true)
      for (const declaredName of declaredNames) {
        runtimeRefs.delete(declaredName)
        allRefs.delete(declaredName)
      }

      const runtimeTopLevelDeps = new Set<string>()
      const allTopLevelDeps = new Set<string>()
      const statementRuntimeImportLocals = new Set<string>()
      const statementTypeImportLocals = new Set<string>()

      for (const ref of runtimeRefs) {
        if (topLevelNames.has(ref)) {
          runtimeTopLevelDeps.add(ref)
        }
        if (runtimeImportLocals.has(ref)) {
          statementRuntimeImportLocals.add(ref)
        }
      }

      for (const ref of allRefs) {
        if (topLevelNames.has(ref)) {
          allTopLevelDeps.add(ref)
        }
        if (typeImportLocals.has(ref)) {
          statementTypeImportLocals.add(ref)
        }
      }

      statementInfo.push({
        declaredNames,
        runtimeTopLevelDeps,
        allTopLevelDeps,
        runtimeImportLocals: statementRuntimeImportLocals,
        typeImportLocals: statementTypeImportLocals,
      })
    }

    return {
      moduleKey,
      modulePath,
      params: moduleParams,
      sourceFile,
      hasExternalImports: this._hasExternalImports(sourceFile),
      statements,
      statementInfo,
      declarationsByName,
      exportToLocalName,
      importSpecsByLocalName,
    }
  }

  _selectStandaloneModuleSymbols(
    info: StandaloneModuleInfo,
    runtimeRequiredNames: Set<string>,
    typeRequiredNames: Set<string>,
    mode: StandaloneMode,
  ): StandaloneModuleSelection {
    const includeTypeDeps = mode === 'ts'
    const pendingLocalNames: string[] = []
    const visitedLocalNames = new Set<string>()

    const seedLocalName = (requiredExportName: string): void => {
      const localName = info.exportToLocalName.get(requiredExportName) || requiredExportName
      if (!info.declarationsByName.has(localName) || visitedLocalNames.has(localName)) {
        return
      }
      pendingLocalNames.push(localName)
    }

    for (const runtimeRequiredName of runtimeRequiredNames) {
      seedLocalName(runtimeRequiredName)
    }
    for (const typeRequiredName of typeRequiredNames) {
      seedLocalName(typeRequiredName)
    }

    const includedStatementIndexes = new Set<number>()
    while (pendingLocalNames.length > 0) {
      const localName = pendingLocalNames.pop()
      if (!localName || visitedLocalNames.has(localName)) {
        continue
      }
      visitedLocalNames.add(localName)

      const statementIndexes = info.declarationsByName.get(localName)
      if (!statementIndexes) {
        continue
      }

      for (const statementIndex of statementIndexes) {
        if (includedStatementIndexes.has(statementIndex)) {
          continue
        }
        includedStatementIndexes.add(statementIndex)

        const statementMeta = info.statementInfo[statementIndex]
        if (!statementMeta) {
          continue
        }
        const deps = includeTypeDeps ? statementMeta.allTopLevelDeps : statementMeta.runtimeTopLevelDeps
        for (const depName of deps) {
          if (!visitedLocalNames.has(depName)) {
            pendingLocalNames.push(depName)
          }
        }
      }
    }

    const depRuntimeNames = new Map<string, Set<string>>()
    const depTypeNames = new Map<string, Set<string>>()
    const runtimeAliases = new Set<string>()
    const wrapperAliases = new Set<string>()
    const wrapperRenameByStatementIndex = new Map<number, string>()
    const typeAliases = new Set<string>()

    for (const statementIndex of includedStatementIndexes) {
      const statementMeta = info.statementInfo[statementIndex]
      if (!statementMeta) {
        continue
      }

      for (const runtimeImportLocal of statementMeta.runtimeImportLocals) {
        const importSpecs = info.importSpecsByLocalName.get(runtimeImportLocal) || []
        for (const importSpec of importSpecs) {
          if (importSpec.isTypeOnly) {
            continue
          }
          this._addRequiredName(depRuntimeNames, importSpec.depKey, importSpec.importedName)
          if (importSpec.localName !== importSpec.importedName) {
            runtimeAliases.add(`const ${importSpec.localName} = ${importSpec.importedName};`)
          }
        }
      }

      if (!includeTypeDeps) {
        continue
      }

      for (const typeImportLocal of statementMeta.typeImportLocals) {
        const importSpecs = info.importSpecsByLocalName.get(typeImportLocal) || []
        for (const importSpec of importSpecs) {
          this._addRequiredName(depTypeNames, importSpec.depKey, importSpec.importedName)
          if (importSpec.localName !== importSpec.importedName) {
            typeAliases.add(`type ${importSpec.localName} = ${importSpec.importedName}`)
          }
        }
      }
    }

    this._collapseStandaloneForwardingWrappers(
      info,
      includedStatementIndexes,
      wrapperAliases,
      wrapperRenameByStatementIndex,
      mode,
    )

    return {
      includedStatementIndexes,
      depRuntimeNames,
      depTypeNames,
      runtimeAliases,
      wrapperAliases,
      wrapperRenameByStatementIndex,
      typeAliases,
    }
  }

  _collapseStandaloneForwardingWrappers(
    info: StandaloneModuleInfo,
    includedStatementIndexes: Set<number>,
    wrapperAliases: Set<string>,
    wrapperRenameByStatementIndex: Map<number, string>,
    mode: StandaloneMode,
  ): void {
    if (mode !== 'js') {
      return
    }

    const sortedIndexes = [...includedStatementIndexes].sort((a, b) => b - a)
    for (const statementIndex of sortedIndexes) {
      const aliasSpec = this._getStandaloneForwardingWrapperAlias(info, statementIndex, includedStatementIndexes)
      if (!aliasSpec) {
        continue
      }

      includedStatementIndexes.delete(statementIndex)
      if (this._canRenameStandaloneWrapperTarget(info, aliasSpec, includedStatementIndexes, statementIndex)) {
        wrapperRenameByStatementIndex.set(aliasSpec.targetDeclarationIndex, aliasSpec.wrapperName)
        continue
      }
      wrapperAliases.add(`const ${aliasSpec.wrapperName} = ${aliasSpec.targetName};`)
    }
  }

  _getStandaloneForwardingWrapperAlias(
    info: StandaloneModuleInfo,
    statementIndex: number,
    includedStatementIndexes: Set<number>,
  ): { wrapperName: string; targetName: string; targetDeclarationIndex: number } | null {
    const statement = info.statements[statementIndex]
    if (!statement || !ts.isFunctionDeclaration(statement) || !statement.name || !statement.body) {
      return null
    }

    const wrapperName = statement.name.text
    if (wrapperName === info.params.func_name) {
      // Keep the root function declaration visible in standalone output.
      return null
    }

    if (statement.body.statements.length !== 1) {
      return null
    }

    const onlyBodyStatement = statement.body.statements[0]
    if (!onlyBodyStatement || !ts.isReturnStatement(onlyBodyStatement) || !onlyBodyStatement.expression) {
      return null
    }

    const returnExpression = onlyBodyStatement.expression
    if (!ts.isCallExpression(returnExpression) || !ts.isIdentifier(returnExpression.expression)) {
      return null
    }

    const targetName = returnExpression.expression.text
    if (targetName === wrapperName) {
      return null
    }

    if (statement.parameters.length !== returnExpression.arguments.length) {
      return null
    }

    for (let index = 0; index < statement.parameters.length; index++) {
      const parameter = statement.parameters[index]
      const argument = returnExpression.arguments[index]
      if (
        !parameter ||
        !argument ||
        !ts.isIdentifier(parameter.name) ||
        !ts.isIdentifier(argument) ||
        parameter.dotDotDotToken ||
        parameter.initializer ||
        parameter.questionToken ||
        parameter.name.text !== argument.text
      ) {
        return null
      }
    }

    const targetDeclarationIndexes = info.declarationsByName.get(targetName)
    if (!targetDeclarationIndexes) {
      return null
    }

    for (const targetDeclarationIndex of targetDeclarationIndexes) {
      if (!includedStatementIndexes.has(targetDeclarationIndex)) {
        continue
      }
      const targetStatement = info.statements[targetDeclarationIndex]
      if (
        targetStatement &&
        ts.isFunctionDeclaration(targetStatement) &&
        targetStatement.name &&
        targetStatement.name.text === targetName
      ) {
        return { wrapperName, targetName, targetDeclarationIndex }
      }
    }

    return null
  }

  _canRenameStandaloneWrapperTarget(
    info: StandaloneModuleInfo,
    aliasSpec: { wrapperName: string; targetName: string; targetDeclarationIndex: number },
    includedStatementIndexes: Set<number>,
    wrapperStatementIndex: number,
  ): boolean {
    const otherWrapperDeclarations = info.declarationsByName.get(aliasSpec.wrapperName)
    if (otherWrapperDeclarations) {
      for (const declarationIndex of otherWrapperDeclarations) {
        if (declarationIndex !== wrapperStatementIndex) {
          return false
        }
      }
    }

    for (const statementIndex of includedStatementIndexes) {
      const statement = info.statements[statementIndex]
      if (!statement) {
        continue
      }

      if (statementIndex === aliasSpec.targetDeclarationIndex) {
        if (this._statementContainsIdentifierReference(statement, aliasSpec.targetName, true)) {
          return false
        }
        continue
      }

      if (this._statementContainsIdentifierReference(statement, aliasSpec.targetName, false)) {
        return false
      }
    }

    return true
  }

  _statementContainsIdentifierReference(
    statement: ts.Statement,
    identifierName: string,
    ignoreFunctionDeclarationName: boolean,
  ): boolean {
    let found = false

    const visit = (node: ts.Node): void => {
      if (found) {
        return
      }

      if (ts.isIdentifier(node) && node.text === identifierName) {
        if (
          ignoreFunctionDeclarationName &&
          ts.isFunctionDeclaration(node.parent) &&
          node.parent.name === node
        ) {
          // Declaration name can be renamed safely.
        } else {
          found = true
          return
        }
      }

      ts.forEachChild(node, visit)
    }

    ts.forEachChild(statement, visit)
    return found
  }

  _renderStandaloneModule(
    info: StandaloneModuleInfo,
    includedStatementIndexes: Set<number>,
    wrapperRenameByStatementIndex: Map<number, string>,
  ): string {
    const statementTexts: string[] = []
    const sortedIndexes = [...includedStatementIndexes].sort((a, b) => a - b)

    for (const statementIndex of sortedIndexes) {
      const statement = info.statements[statementIndex]
      if (!statement) {
        continue
      }
      let statementText = info.params.code.slice(statement.getFullStart(), statement.getEnd()).trim()
      if (!statementText) {
        continue
      }

      const renamedName = wrapperRenameByStatementIndex.get(statementIndex)
      if (renamedName && ts.isFunctionDeclaration(statement) && statement.name) {
        const originalName = statement.name.text
        statementText = statementText.replace(
          new RegExp(`\\bfunction\\s+${originalName}\\b`),
          `function ${renamedName}`,
        )
      }

      statementTexts.push(statementText)
    }

    return statementTexts.join('\n\n')
  }

  _addStandaloneImportSpec(
    importSpecsByLocalName: Map<string, StandaloneImportSpec[]>,
    importSpec: StandaloneImportSpec,
  ): void {
    if (!importSpecsByLocalName.has(importSpec.localName)) {
      importSpecsByLocalName.set(importSpec.localName, [])
    }
    importSpecsByLocalName.get(importSpec.localName)?.push(importSpec)
  }

  _addRequiredName(requiredByModule: Map<string, Set<string>>, moduleKey: string, name: string): boolean {
    if (!requiredByModule.has(moduleKey)) {
      requiredByModule.set(moduleKey, new Set<string>())
    }

    const names = requiredByModule.get(moduleKey)
    if (!names || names.has(name)) {
      return false
    }
    names.add(name)
    return true
  }

  _collectStatementDeclaredNames(statement: ts.Statement): Set<string> {
    const names = new Set<string>()

    if (
      (ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isInterfaceDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      statement.name
    ) {
      names.add(statement.name.text)
      return names
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        this._collectBindingNames(declaration.name, names)
      }
    }

    return names
  }

  _collectBindingNames(bindingName: ts.BindingName, names: Set<string>): void {
    if (ts.isIdentifier(bindingName)) {
      names.add(bindingName.text)
      return
    }

    if (ts.isObjectBindingPattern(bindingName) || ts.isArrayBindingPattern(bindingName)) {
      for (const element of bindingName.elements) {
        if (ts.isBindingElement(element)) {
          this._collectBindingNames(element.name, names)
        }
      }
    }
  }

  _describeStandaloneDependencyRole(modulePath: string): string {
    if (modulePath.includes('/_helpers/')) {
      return 'Locutus helper dependency'
    }
    return 'Locutus dependency module'
  }

  _collectStatementExportedNames(statement: ts.Statement, declaredNames: Set<string>): Map<string, string> {
    const exportToLocalName = new Map<string, string>()
    const modifiers = ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined
    const hasExport = modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) || false
    const hasDefault = modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword) || false

    if (hasExport) {
      for (const declaredName of declaredNames) {
        exportToLocalName.set(declaredName, declaredName)
      }
    }

    if (hasDefault && declaredNames.size > 0) {
      const firstDeclared = [...declaredNames][0]
      if (firstDeclared) {
        exportToLocalName.set('default', firstDeclared)
      }
    }

    if (
      ts.isExportDeclaration(statement) &&
      !statement.moduleSpecifier &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      for (const exportSpecifier of statement.exportClause.elements) {
        const exportedName = exportSpecifier.name.text
        const localName = exportSpecifier.propertyName?.text || exportedName
        exportToLocalName.set(exportedName, localName)
      }
    }

    return exportToLocalName
  }

  _collectReferencedIdentifiers(node: ts.Node, includeTypeNodes: boolean): Set<string> {
    const names = new Set<string>()

    const walk = (current: ts.Node): void => {
      if (!includeTypeNodes && ts.isTypeNode(current)) {
        return
      }

      if (
        ts.isImportDeclaration(current) ||
        ts.isImportClause(current) ||
        ts.isImportSpecifier(current) ||
        ts.isExportDeclaration(current)
      ) {
        return
      }

      if (ts.isIdentifier(current)) {
        names.add(current.text)
      }

      ts.forEachChild(current, walk)
    }

    walk(node)
    return names
  }

  async _writetestOne(params: ParsedParams): Promise<void> {
    if (!params.func_name) {
      throw new Error('No func_name in ' + JSON.stringify(params))
    }
    if (!params.headKeys) {
      throw new Error('No headKeys in ' + params.func_name)
    }
    const isHelperModule = /(?:^|\/)_helpers\//.test(params.filepath)
    if (!params.headKeys.example) {
      if (isHelperModule) {
        return
      }
      throw new Error('No example in ' + params.func_name)
    }

    const srcExt = path.extname(params.filepath)
    const basename = path.basename(params.filepath, srcExt) + '.vitest.ts'
    const subdir = path.dirname(params.filepath)
    const testpath = this.__test + '/generated/' + subdir + '/' + basename
    const testdir = path.dirname(testpath)
    const relativeSrcForTestDir = path.relative(testdir, this.__src)
    const relativeTestFileForRoot = path.relative(this.__root, testpath)

    let testProps = ''
    const firstTestProp = params.headKeys.test?.[0]?.[0]
    if (typeof firstTestProp === 'string') {
      testProps = firstTestProp
    }

    let describeSkip = ''
    if (this.allowSkip && testProps.indexOf('skip-all') !== -1) {
      describeSkip = '.skip'
    }

    const sourceModuleRelativePath = relativeSrcForTestDir + '/' + params.filepath
    const sourceFuncBindingName = '__locutus_source_fn'
    const websiteJsCode = srcExt === '.ts' ? this._toWebsiteJs(params.code) : params.code
    const moduleJsRuntimeCode =
      srcExt === '.ts'
        ? this._toCommonJsRuntimeCode(websiteJsCode, {
            sourcePath: params.filepath.replace(/\.ts$/, '.js'),
          })
        : null
    const standaloneTsCode = await this._buildStandaloneTs(params)
    const standaloneJsCode = await this._buildStandaloneJs(params)
    const standaloneJsRuntimeCode = standaloneTsCode
      ? this._toCommonJsRuntimeCode(standaloneJsCode, {
          sourcePath: params.filepath.replace(/\.ts$/, '.js'),
        })
      : null
    const standaloneTsRuntimeCode = standaloneTsCode
      ? this._toCommonJsRuntimeCode(standaloneTsCode, {
          sourcePath: params.filepath,
        })
      : null

    const variantDefs: Array<{ name: string; binding: string }> = [{ name: 'source', binding: sourceFuncBindingName }]
    if (moduleJsRuntimeCode) {
      variantDefs.push({ name: 'module-js', binding: '__locutus_module_js_fn' })
    }
    if (standaloneTsRuntimeCode) {
      variantDefs.push({ name: 'standalone-ts', binding: '__locutus_standalone_ts_fn' })
    }
    if (standaloneJsRuntimeCode && standaloneJsRuntimeCode.trim().length > 0) {
      variantDefs.push({ name: 'standalone-js', binding: '__locutus_standalone_js_fn' })
    }

    const codez: string[] = []

    codez.push('// warning: This file is auto generated by `yarn build:tests`')
    codez.push('// Do not edit by hand!')
    codez.push('')
    codez.push("import { createRequire } from 'node:module'")
    codez.push("import { describe, it, expect } from 'vitest'")
    codez.push('')

    for (const global in this.globals) {
      codez.push('const ' + global + ' = ' + this.globals[global])
    }

    codez.push("process.env.TZ = 'UTC'")

    if (params.language === 'php') {
      // Add PHP helpers, but skip if we're testing that helper itself
      if (params.func_name !== 'ini_set') {
        codez.push(
          this._addRequire('ini_set', relativeSrcForTestDir + '/' + this._resolveSourceExt('php/info/ini_set')),
        )
      }
      if (params.func_name !== 'ini_get') {
        codez.push(
          this._addRequire('ini_get', relativeSrcForTestDir + '/' + this._resolveSourceExt('php/info/ini_get')),
        )
      }
      if (params.func_name === 'localeconv') {
        codez.push(
          this._addRequire('setlocale', relativeSrcForTestDir + '/' + this._resolveSourceExt('php/strings/setlocale')),
        )
      }
      if (params.func_name === 'i18n_loc_get_default') {
        codez.push(
          this._addRequire(
            'i18n_loc_set_default',
            relativeSrcForTestDir + '/' + this._resolveSourceExt('php/i18n/i18n_loc_set_default'),
          ),
        )
      }
    }

    codez.push(this._addRequireExport(sourceFuncBindingName, params.func_name, sourceModuleRelativePath))
    codez.push(
      `const __locutus_source_module_url = new URL(${JSON.stringify(sourceModuleRelativePath)}, import.meta.url)`,
    )
    codez.push('const __locutus_source_require = createRequire(__locutus_source_module_url)')
    codez.push(`const __locutus_func_name = ${JSON.stringify(params.func_name)}`)
    if (moduleJsRuntimeCode) {
      codez.push(`const __locutus_module_js_code = ${JSON.stringify(moduleJsRuntimeCode)}`)
    }
    if (standaloneTsRuntimeCode) {
      codez.push(`const __locutus_standalone_ts_code = ${JSON.stringify(standaloneTsRuntimeCode)}`)
    }
    if (standaloneJsRuntimeCode && standaloneJsRuntimeCode.trim().length > 0) {
      codez.push(`const __locutus_standalone_js_code = ${JSON.stringify(standaloneJsRuntimeCode)}`)
    }
    codez.push('')
    codez.push('const __locutus_eval_function = (compiledCode: string): ((...args: unknown[]) => unknown) => {')
    codez.push("  const evaluator = new Function('require', compiledCode + '\\nreturn ' + __locutus_func_name + ';')")
    codez.push('  return evaluator(__locutus_source_require) as (...args: unknown[]) => unknown')
    codez.push('}')
    codez.push(
      'const __locutus_eval_module_export = (compiledCode: string, exportName: string): ((...args: unknown[]) => unknown) => {',
    )
    codez.push('  const module = { exports: {} as { [key: string]: unknown } }')
    codez.push('  const exports = module.exports')
    codez.push("  const evaluator = new Function('exports', 'module', 'require', compiledCode)")
    codez.push('  evaluator(exports, module, __locutus_source_require)')
    codez.push('  return module.exports[exportName] as (...args: unknown[]) => unknown')
    codez.push('}')
    if (moduleJsRuntimeCode) {
      codez.push(
        'const __locutus_module_js_fn = __locutus_eval_module_export(__locutus_module_js_code, __locutus_func_name)',
      )
    }
    if (standaloneTsRuntimeCode) {
      codez.push('const __locutus_standalone_ts_fn = __locutus_eval_function(__locutus_standalone_ts_code)')
    }
    if (standaloneJsRuntimeCode && standaloneJsRuntimeCode.trim().length > 0) {
      codez.push('const __locutus_standalone_js_fn = __locutus_eval_function(__locutus_standalone_js_code)')
    }
    codez.push('')

    codez.push(
      [
        'describe',
        describeSkip,
        "('src/",
        params.filepath,
        ' (tested in ',
        relativeTestFileForRoot,
        ")', function () {",
      ].join(''),
    )

    const examples = params.headKeys.example
    const returns = params.headKeys.returns || []

    for (let i = 0; i < examples.length; i++) {
      const exampleLines = examples[i]
      if (!exampleLines) {
        continue
      }

      const returnLines = returns[i]
      if (!returnLines || returnLines.length === 0) {
        throw new Error(`There is no return for example ${i} in ${params.filepath}`)
      }

      const humanIndex = i + 1
      let itSkip = ''
      if (this.allowSkip && testProps.indexOf('skip-' + humanIndex) !== -1) {
        itSkip = '.skip'
      }

      codez.push(['  it', itSkip, "('should pass example ", humanIndex, "', function () {"].join(''))

      const body: string[] = []
      const testExpected = returnLines.join('\n')

      body.push('const expected = ' + testExpected)
      body.push('const __locutus_variants: Array<{ name: string; fn: (...args: unknown[]) => unknown }> = [')
      for (const variantDef of variantDefs) {
        body.push(`  { name: ${JSON.stringify(variantDef.name)}, fn: ${variantDef.binding} },`)
      }
      body.push(']')
      body.push(`const __locutus_run_example = (${params.func_name}: typeof ${sourceFuncBindingName}) => {`)

      for (let j = 0; j < exampleLines.length; j++) {
        const exampleLine = exampleLines[j]
        if (typeof exampleLine === 'undefined') {
          continue
        }

        if (j === exampleLines.length - 1) {
          body.push('  return ' + exampleLine.replace('var $result = ', ''))
        } else {
          body.push('  ' + exampleLine)
        }
      }

      body.push('}')
      body.push('for (const __locutus_variant of __locutus_variants) {')
      if (params.language === 'php') {
        body.push('  ;(globalThis as { $locutus?: unknown }).$locutus = undefined')
      }
      body.push(`  const result = __locutus_run_example(__locutus_variant.fn as typeof ${sourceFuncBindingName})`)
      body.push('  expect(result).toEqual(expected)')
      body.push('}')

      codez.push(indentString(body.join('\n'), ' ', 4))
      codez.push('  })')
    }

    codez.push('})')
    codez.push('')

    const code = codez.join('\n')

    await fs.promises.mkdir(testdir, { recursive: true })
    debug('writing: ' + testpath)
    await fs.promises.writeFile(testpath, code, 'utf-8')
  }

  async _opener(
    fileOrName: string,
    requesterParams: Partial<ParsedParams>,
  ): Promise<{ fullpath: string; code: string } | null> {
    let pattern: string

    const language = requesterParams.language || '*'

    // Check for absolute path first (before checking for dots in basename)
    if (fileOrName.startsWith('/')) {
      pattern = fileOrName
    } else if (
      path
        .basename(fileOrName)
        .replace(/\.(js|ts)$/, '')
        .indexOf('.') !== -1
    ) {
      pattern = this.__src + '/' + language + '/' + fileOrName.replace(/\./g, '/') + '.{js,ts}'
    } else if (fileOrName.indexOf('/') === -1) {
      pattern = this.__src + '/' + language + '/*/' + fileOrName + '.{js,ts}'
    } else {
      pattern = this.__src + '/' + fileOrName
    }

    pattern = pattern.replace(/golang\/strings\/Index\.(js|ts|\{js,ts\})/, 'golang/strings/Index2.$1')
    debug('loading: ' + pattern)
    let files = globby.sync(pattern, {})

    // If both .js and .ts exist for the same function, prefer .ts
    if (files.length === 2) {
      const tsFile = files.find((f: string) => f.endsWith('.ts'))
      if (tsFile) {
        files = [tsFile]
      }
    }

    if (files.length !== 1) {
      const msg = `Found ${files.length} occurances of ${fileOrName} via pattern: ${pattern}`
      throw new Error(msg)
    }

    const filepath = files[0]
    if (!filepath) {
      throw new Error('Could not find ' + pattern)
    }
    if (path.basename(filepath) === 'index.js' || path.basename(filepath) === 'index.ts') {
      return null
    }

    const code = await fs.promises.readFile(filepath, 'utf-8')
    return { fullpath: filepath, code }
  }

  async _load(fileOrName: string, requesterParams: Partial<ParsedParams>): Promise<ParsedParams | null> {
    const result = await this._opener(fileOrName, requesterParams)
    if (!result) {
      return null
    }

    const filepath = path.relative(this.__src, result.fullpath)
    return this._parse(filepath, result.code)
  }

  async _findDependencies(
    _fileOrName: string,
    requesterParams: ParsedParams,
    dependencies: Record<string, ParsedParams>,
  ): Promise<Record<string, ParsedParams>> {
    if (!requesterParams.headKeys['depends on'] || !requesterParams.headKeys['depends on'].length) {
      return {}
    }

    const dependsOn = requesterParams.headKeys['depends on'] || []
    for (const dep of dependsOn) {
      const depCodePath = dep?.[0]
      if (!depCodePath) {
        continue
      }

      const params = await this._load(depCodePath, requesterParams)
      if (params) {
        dependencies[depCodePath] = params
        await this._findDependencies(depCodePath, params, dependencies)
      }
    }

    return dependencies
  }

  /**
   * Extract require() calls and import declarations from AST that reference other locutus functions
   * Returns array of resolved function paths (e.g., "php/strings/echo")
   */
  _extractDependencies(
    sourceFile: ts.SourceFile,
    filepath: string,
    options: StandaloneDependencyOptions = {},
  ): string[] {
    const requires: string[] = []
    const seen = new Set<string>()
    const includeTypeOnlyImports = options.includeTypeOnlyImports === true

    const addDep = (depPath: string): void => {
      if (depPath.startsWith('../') || depPath.startsWith('./')) {
        const dir = path.dirname(filepath)
        const resolved = path.normalize(path.join(dir, depPath))
        const locutusPath = resolved.replace(/^\/+/, '').replace(/\.(js|ts)$/, '')
        if (!seen.has(locutusPath)) {
          seen.add(locutusPath)
          requires.push(locutusPath)
        }
      }
    }

    const walk = (node: ts.Node): void => {
      // ESM: import foo from '../path/to/func.js'
      if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        if (!includeTypeOnlyImports && this._isTypeOnlyImportDeclaration(node)) {
          return
        }
        addDep(node.moduleSpecifier.text)
      }

      // CJS: require('../path/to/func')
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === 'require' &&
        node.arguments.length > 0 &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        addDep(node.arguments[0].text)
      }

      ts.forEachChild(node, walk)
    }

    walk(sourceFile)
    return requires
  }

  _isTypeOnlyImportDeclaration(node: ts.ImportDeclaration): boolean {
    const importClause = node.importClause
    if (!importClause) {
      return false
    }

    if (importClause.isTypeOnly) {
      return true
    }

    if (!importClause.namedBindings || !ts.isNamedImports(importClause.namedBindings)) {
      return false
    }

    if (importClause.namedBindings.elements.length === 0) {
      return false
    }

    return importClause.namedBindings.elements.every((importElement) => importElement.isTypeOnly)
  }

  _hasExternalImports(sourceFile: ts.SourceFile): boolean {
    let hasExternalImports = false

    ts.forEachChild(sourceFile, (node) => {
      if (hasExternalImports) {
        return
      }
      if (!ts.isImportDeclaration(node) || !node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) {
        return
      }

      const importPath = node.moduleSpecifier.text
      if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
        hasExternalImports = true
      }
    })

    return hasExternalImports
  }

  async _parse(filepath: string, code: string): Promise<ParsedParams> {
    if (!code) {
      throw new Error('Unable to parse ' + filepath + '. Received no code')
    }

    if (filepath.indexOf('/') === -1) {
      throw new Error("Parse only accepts relative filepaths. Received: '" + filepath + "'")
    }

    const parts = filepath.split('/')
    const language = parts.shift() as string
    // Strip file extension from the last part
    const lastPart = parts[parts.length - 1]
    if (!lastPart) {
      throw new Error(`Unable to parse ${filepath}. Invalid path segments`)
    }
    parts[parts.length - 1] = lastPart.replace(/\.(js|ts)$/, '')
    const codepath = parts.join('.')
    const name = parts.pop() as string
    const category = parts.join('.')

    const isTS = filepath.endsWith('.ts')
    const scriptKind = isTS ? ts.ScriptKind.TS : ts.ScriptKind.JS
    const sourceFile = ts.createSourceFile(filepath, code, ts.ScriptTarget.ES2022, true, scriptKind)

    // Find the exported function: `module.exports = function name(`, `export function name(`, or `export default function name(`
    let funcNode: ts.FunctionExpression | ts.FunctionDeclaration | undefined

    ts.forEachChild(sourceFile, (node) => {
      if (funcNode) {
        return
      }

      // CJS: module.exports = function name(...) { ... }
      if (ts.isExpressionStatement(node) && ts.isBinaryExpression(node.expression)) {
        const expr = node.expression
        if (
          expr.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          ts.isPropertyAccessExpression(expr.left) &&
          ts.isIdentifier(expr.left.expression) &&
          expr.left.expression.text === 'module' &&
          ts.isIdentifier(expr.left.name) &&
          expr.left.name.text === 'exports' &&
          ts.isFunctionExpression(expr.right) &&
          expr.right.name
        ) {
          funcNode = expr.right
        }
      }

      // ESM: export function name(...) { ... } or export default function name(...) { ... }
      if (ts.isFunctionDeclaration(node) && node.name && node.body) {
        const modifiers = ts.getModifiers(node)
        const hasExport = modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
        if (hasExport) {
          funcNode = node
        }
      }
    })

    if (!funcNode) {
      throw new Error(`File ${filepath} must contain exactly one module.exports or export function`)
    }

    if (!funcNode.name) {
      throw new Error(`File ${filepath} must export a named function`)
    }
    const funcName = funcNode.name.text
    const funcParams = funcNode.parameters.map((p) => {
      if (ts.isIdentifier(p.name)) {
        return p.name.text
      }
      return p.name.getText(sourceFile)
    })

    // Extract head comments: // lines between function start and first body statement
    const funcStartLine = sourceFile.getLineAndCharacterOfPosition(funcNode.getStart(sourceFile)).line
    const bodyStatements = funcNode.body ? (funcNode.body as ts.Block).statements : undefined
    const firstStatement = bodyStatements && bodyStatements.length > 0 ? bodyStatements[0] : undefined
    const firstStmtLine = firstStatement
      ? sourceFile.getLineAndCharacterOfPosition(firstStatement.getStart(sourceFile)).line
      : funcStartLine + 1

    const lines = code.split('\n')
    const headComments: string[] = []
    const isHelperModule = /(?:^|\/)_helpers\//.test(filepath)
    for (let lineIdx = funcStartLine; lineIdx < firstStmtLine; lineIdx++) {
      const line = lines[lineIdx]
      if (!line) {
        continue
      }
      const trimmed = line.trim()
      if (trimmed.startsWith('//')) {
        headComments.push(trimmed.slice(2).trim())
      }
    }

    if (headComments.length === 0 && !isHelperModule) {
      const msg = `Unable to parse ${filepath}. Did not find any comments in function definition`
      throw new Error(msg)
    }

    const headKeys = this._headKeys(headComments)

    validateHeaderKeys(headKeys, filepath)

    // Extract require() calls and import declarations that reference other locutus functions
    const codeDependencies = this._extractDependencies(sourceFile, filepath)

    const params: ParsedParams = {
      headKeys,
      name,
      filepath,
      codepath,
      code,
      language,
      category,
      func_name: funcName,
      func_arguments: funcParams,
      codeDependencies,
    }

    const dependencies = await this._findDependencies(filepath, params, {})
    params.dependencies = dependencies
    return params
  }

  _headKeys(headLines: string[]): HeadKeys {
    const keys: HeadKeys = {}
    let match: RegExpMatchArray | null = null
    let dmatch: RegExpMatchArray | null = null
    let key = ''
    let val = ''
    let num = 0

    for (const headLine of headLines) {
      match = headLine.match(/^\s*\W?\s*([a-z 0-9]+)\s*:\s*(.*)\s*$/)
      if (!match) {
        continue
      }
      key = match[1] || ''
      val = match[2] || ''

      dmatch = key.match(/^(\w+)\s+(\d+)$/)
      if (dmatch) {
        key = dmatch[1] || ''
        num = parseInt(dmatch[2] || '0', 10) - 1
      } else {
        num = 0
      }

      if (!isValidHeaderKey(key)) {
        continue
      }

      const keyEntries = keys[key] || []
      keys[key] = keyEntries
      const numberEntries = keyEntries[num] || []
      keyEntries[num] = numberEntries
      numberEntries.push(val)
    }

    return keys
  }
}

export { Util }
