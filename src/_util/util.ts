import fs from 'node:fs'
import path from 'node:path'
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

type Callback<T = void> = (err: Error | null, result?: T) => void

class Util {
  __src: string
  __root: string
  __test: string
  globals: Record<string, unknown>
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

    // Use the actual function name from the source (may differ from filename, e.g. Index2.ts exports Index)
    const funcName = params.func_name

    if (!this._reindexBuffer[indexTs]) {
      this._reindexBuffer[indexTs] = []
    }

    const line = `export { ${funcName} } from './${basefile}.ts'`
    this._reindexBuffer[indexTs].push(line)
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

    const funcData: Record<string, unknown> = {
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
      // website/source snippets are generated snapshots; refresh with `yarn injectweb` after signature changes.
      // Generate clean JS by stripping type annotations via TypeScript compiler
      const jsResult = ts.transpileModule(params.code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
          removeComments: false,
          newLine: ts.NewLineKind.LineFeed,
        },
      })
      // Halve indentation (tsc emits 4 spaces, we use 2) and trim trailing whitespace
      const jsCode = jsResult.outputText
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

      buf += `<div class="code-tab-panel" data-lang="ts">\n{% codeblock lang:typescript %}${params.code}{% endcodeblock %}\n</div>\n`
      buf += `<div class="code-tab-panel" data-lang="js" style="display:none">\n{% codeblock lang:javascript %}${jsCode}{% endcodeblock %}\n</div>`
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

  _resolveSourceExt(subpath: string): string {
    if (fs.existsSync(path.join(this.__src, subpath + '.ts'))) {
      return subpath + '.ts'
    }
    return subpath + '.js'
  }

  async _writetestOne(params: ParsedParams): Promise<void> {
    if (!params.func_name) {
      throw new Error('No func_name in ' + JSON.stringify(params))
    }
    if (!params.headKeys) {
      throw new Error('No headKeys in ' + params.func_name)
    }
    if (!params.headKeys.example) {
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

    const codez: string[] = []

    codez.push('// warning: This file is auto generated by `yarn build:tests`')
    codez.push('// Do not edit by hand!')
    codez.push('')
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

    codez.push(this._addRequire(params.func_name, relativeSrcForTestDir + '/' + params.filepath))
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

      for (let j = 0; j < exampleLines.length; j++) {
        const exampleLine = exampleLines[j]
        if (typeof exampleLine === 'undefined') {
          continue
        }

        if (j === exampleLines.length - 1) {
          body.push('const result = ' + exampleLine.replace('var $result = ', ''))
        } else {
          body.push(exampleLine)
        }
      }

      body.push('expect(result).toEqual(expected)')

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
  _extractDependencies(sourceFile: ts.SourceFile, filepath: string): string[] {
    const requires: string[] = []
    const seen = new Set<string>()

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
      if (ts.isFunctionDeclaration(node) && node.name) {
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

    const funcName = funcNode.name!.text
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

    if (headComments.length === 0) {
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
