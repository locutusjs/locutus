import fs from 'node:fs'
import path from 'node:path'
import async from 'async'
import Debug from 'debug'
import esprima from 'esprima'
import globby from 'globby'
import indentStringModule from 'indent-string'
import YAML from 'js-yaml'
import _ from 'lodash'
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

    this.pattern = [this.__src + '/**/**/*.js', '!**/index.js', '!**/_util/**']
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
    }

    this.allowSkip = argv.indexOf('--noskip') === -1

    this._reindexBuffer = {}
    this._injectwebBuffer = {}
  }

  injectweb(cb: Callback): void {
    const self = this
    this._runFunctionOnAll(this._injectwebOne.bind(this), function (err) {
      if (err) {
        return cb(err)
      }
      for (const indexHtml in self._injectwebBuffer) {
        debug('writing: ' + indexHtml)
        fs.writeFileSync(indexHtml, self._injectwebBuffer[indexHtml], 'utf-8')
      }
      cb(null)
    })
  }

  reindex(cb: Callback): void {
    const self = this
    self._reindexBuffer = {}
    self._runFunctionOnAll(self._reindexOne.bind(this), function (err) {
      if (err) {
        return cb(err)
      }
      for (const indexJs in self._reindexBuffer) {
        const requires = self._reindexBuffer[indexJs]
        requires.sort()
        debug('writing: ' + indexJs)
        fs.writeFileSync(indexJs, requires.join('\n') + '\n', 'utf-8')
      }
      cb(null)
    })
  }

  writetests(cb: Callback): void {
    this._runFunctionOnAll(this._writetestOne.bind(this), cb)
  }

  _runFunctionOnAll(runFunc: (params: ParsedParams, cb: Callback) => void, cb: Callback): void {
    const self = this

    const q = async.queue(function (fullpath: string, callback: Callback) {
      self._load(fullpath, {} as ParsedParams, function (err, params) {
        if (err) {
          return callback(err)
        }
        if (!params) {
          return callback(null)
        }
        runFunc(params, callback)
      })
    }, self.concurrency)

    debug({ pattern: self.pattern })
    const files = globby.sync(self.pattern)

    q.push(files)
    q.drain(cb)
  }

  _reindexOne(params: ParsedParams, cb: Callback): void {
    const fullpath = this.__src + '/' + params.filepath
    const dir = path.dirname(fullpath)
    const basefile = path.basename(fullpath, '.js')
    const indexJs = dir + '/index.js'

    let module = basefile
    if (basefile === 'Index2') {
      module = 'Index'
    }

    if (!this._reindexBuffer[indexJs]) {
      this._reindexBuffer[indexJs] = []
    }

    const line = 'module.exports.' + module + " = require('./" + basefile + "')"
    this._reindexBuffer[indexJs].push(line)
    return cb(null)
  }

  _injectwebOne(params: ParsedParams, cb: Callback): void {
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

    if (!this._injectwebBuffer[langIndexPath]) {
      let langTitle = ''
      langTitle += this.langDefaults[params.language].human + ' '
      langTitle += this.langDefaults[params.language].packageType + 's '
      langTitle += ' in JavaScript'

      const langData = Object.assign({}, this.langDefaults[params.language], {
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
      catTitle += this.langDefaults[params.language].human + "'s "
      catTitle += params.category + ' '
      catTitle += this.langDefaults[params.language].packageType + ' '
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

    const functionTitle = this.langDefaults[params.language].function_title_template
      .replace(/\[language]/g, this.langDefaults[params.language].human)
      .replace(/\[category]/g, params.category)
      .replace(/\[function]/g, params.func_name)
      .replace(/\[functiondashed]/g, params.func_name.replace(/_/g, '-'))

    const functionDescription = this.langDefaults[params.language].function_description_template
      .replace(/\[language]/g, this.langDefaults[params.language].human)
      .replace(/\[category]/g, params.category)
      .replace(/\[function]/g, params.func_name)
      .replace(/\[functiondashed]/g, params.func_name.replace(/_/g, '-'))

    const funcData: Record<string, unknown> = {
      warning: 'This file is auto generated by `yarn web:inject`, do not edit by hand',
      examples: (params.headKeys.example || []).map((lines) => lines.join('\n')),
      returns: (params.headKeys.returns || []).map((lines) => lines.join('\n')),
      dependencies: [],
      authors: authors || {},
      notes: (params.headKeys.note || []).map((lines) => lines.join('\n')),
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
    buf += `{% codeblock lang:javascript %}${params.code}{% endcodeblock %}`

    fs.promises.mkdir(path.dirname(funcPath), { recursive: true }).then(
      () => {
        fs.writeFile(funcPath, buf, 'utf-8', cb)
      },
      (err) => {
        cb(new Error('Could not mkdir for ' + funcPath + '. ' + err))
      },
    )
  }

  _addRequire(name: string, relativeSrcForTest: string): string {
    return ['var ', name, " = require('", relativeSrcForTest, "')"].join('')
  }

  _writetestOne(params: ParsedParams, cb: Callback): void {
    const self = this

    if (!params.func_name) {
      throw new Error('No func_name in ' + JSON.stringify(params))
    }
    if (!params.headKeys) {
      throw new Error('No headKeys in ' + params.func_name)
    }
    if (!params.headKeys.example) {
      throw new Error('No example in ' + params.func_name)
    }

    const basename = path.basename(params.filepath)
    const subdir = path.dirname(params.filepath)
    const testpath = this.__test + '/generated/' + subdir + '/test-' + basename
    const testdir = path.dirname(testpath)
    const relativeSrcForTestDir = path.relative(testdir, self.__src)
    const relativeTestFileForRoot = path.relative(self.__root, testpath)

    let testProps = ''
    if (params.headKeys.test) {
      testProps = params.headKeys.test[0][0]
    }

    let describeSkip = ''
    if (self.allowSkip && testProps.indexOf('skip-all') !== -1) {
      describeSkip = '.skip'
    }

    const codez: string[] = []

    codez.push('// warning: This file is auto generated by `yarn build:tests`')
    codez.push('// Do not edit by hand!')
    codez.push('')
    codez.push(`'use strict'`)
    codez.push('')

    for (const global in self.globals) {
      codez.push('var ' + global + ' = ' + self.globals[global])
    }

    codez.push("process.env.TZ = 'UTC'")
    codez.push('var ' + 'expect' + " = require('chai').expect")

    if (params.language === 'php') {
      codez.push(self._addRequire('ini_set', relativeSrcForTestDir + '/' + 'php/info/ini_set'))
      codez.push(self._addRequire('ini_get', relativeSrcForTestDir + '/' + 'php/info/ini_get'))
      if (params.func_name === 'localeconv') {
        codez.push(self._addRequire('setlocale', relativeSrcForTestDir + '/' + 'php/strings/setlocale'))
      }
      if (params.func_name === 'i18n_loc_get_default') {
        codez.push(
          self._addRequire('i18n_loc_set_default', relativeSrcForTestDir + '/' + 'php/i18n/i18n_loc_set_default'),
        )
      }
    }

    codez.push(self._addRequire(params.func_name, relativeSrcForTestDir + '/' + params.filepath))
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

    for (const i in params.headKeys.example) {
      if (!params.headKeys.returns[i] || !params.headKeys.returns[i].length) {
        throw new Error(`There is no return for example ${i} in ${params.filepath}`)
      }

      const humanIndex = parseInt(i, 10) + 1
      let itSkip = ''
      if (self.allowSkip && testProps.indexOf('skip-' + humanIndex) !== -1) {
        itSkip = '.skip'
      }

      codez.push(['  it', itSkip, "('should pass example ", humanIndex, "', function (done) {"].join(''))

      const body: string[] = []
      const testExpected = params.headKeys.returns[i].join('\n')

      body.push('var expected = ' + testExpected)

      for (const j in params.headKeys.example[i]) {
        if (parseInt(j, 10) === params.headKeys.example[i].length - 1) {
          body.push('var result = ' + params.headKeys.example[i][j].replace('var $result = ', ''))
        } else {
          body.push(params.headKeys.example[i][j])
        }
      }

      body.push('expect(result).to.deep.equal(expected)')
      body.push('done()')

      codez.push(indentString(body.join('\n'), ' ', 4))
      codez.push('  })')
    }

    codez.push('})')
    codez.push('')

    const code = codez.join('\n')

    fs.promises.mkdir(testdir, { recursive: true }).then(
      () => {
        debug('writing: ' + testpath)
        fs.writeFile(testpath, code, 'utf-8', cb)
      },
      (err) => {
        cb(new Error(String(err)))
      },
    )
  }

  _opener(
    fileOrName: string,
    requesterParams: Partial<ParsedParams>,
    cb: (err: Error | null, fullpath?: string, code?: string) => void,
  ): void {
    const self = this
    let pattern: string

    const language = requesterParams.language || '*'

    if (path.basename(fileOrName, '.js').indexOf('.') !== -1) {
      pattern = self.__src + '/' + language + '/' + fileOrName.replace(/\./g, '/') + '.js'
    } else if (fileOrName.indexOf('/') === -1) {
      pattern = self.__src + '/' + language + '/*/' + fileOrName + '.js'
    } else if (fileOrName.substr(0, 1) === '/') {
      pattern = fileOrName
    } else {
      pattern = self.__src + '/' + fileOrName
    }

    pattern = pattern.replace('golang/strings/Index.js', 'golang/strings/Index2.js')
    debug('loading: ' + pattern)
    const files = globby.sync(pattern, {})

    if (files.length !== 1) {
      const msg = `Found ${files.length} occurances of ${fileOrName} via pattern: ${pattern}`
      return cb(new Error(msg))
    }

    const filepath = files[0]

    if (path.basename(filepath) === 'index.js') {
      return cb(null)
    }

    if (!filepath) {
      return cb(new Error('Could not find ' + pattern))
    }

    fs.readFile(filepath, 'utf-8', function (err, code) {
      if (err) {
        return cb(new Error('Error while opening ' + filepath + '. ' + err))
      }
      return cb(null, filepath, code)
    })
  }

  _load(fileOrName: string, requesterParams: Partial<ParsedParams>, cb: Callback<ParsedParams>): void {
    const self = this
    self._opener(fileOrName, requesterParams, function (err, fullpath, code) {
      if (err) {
        return cb(err)
      }
      if (!fullpath || !code) {
        return cb(null)
      }

      const filepath = path.relative(self.__src, fullpath)
      self._parse(filepath, code, cb)
    })
  }

  _findDependencies(
    _fileOrName: string,
    requesterParams: ParsedParams,
    dependencies: Record<string, ParsedParams>,
    cb?: Callback<Record<string, ParsedParams>>,
  ): void {
    const self = this

    if (!requesterParams.headKeys['depends on'] || !requesterParams.headKeys['depends on'].length) {
      if (cb) {
        cb(null, {})
      }
      return
    }

    let loaded = 0
    for (const i in requesterParams.headKeys['depends on']) {
      const depCodePath = requesterParams.headKeys['depends on'][i][0]

      self._load(depCodePath, requesterParams, function (err, params) {
        if (err) {
          return cb?.(err)
        }
        if (!params) {
          return
        }

        dependencies[depCodePath] = params
        self._findDependencies(depCodePath, params, dependencies)

        if (cb && ++loaded === requesterParams.headKeys['depends on'].length) {
          cb(null, dependencies)
        }
      })
    }
  }

  _parse(filepath: string, code: string, cb: Callback<ParsedParams>): void {
    if (!code) {
      return cb(new Error('Unable to parse ' + filepath + '. Received no code'))
    }

    if (filepath.indexOf('/') === -1) {
      return cb(new Error("Parse only accepts relative filepaths. Received: '" + filepath + "'"))
    }

    const parts = filepath.split('/')
    const language = parts.shift() as string
    const codepath = parts.join('.')
    const name = parts.pop() as string
    const category = parts.join('.')

    const ast = esprima.parseScript(code, { comment: true, loc: true, range: true })

    const moduleExports = ast.body.filter((node: unknown) => {
      try {
        const n = node as {
          expression: {
            left: { object: { name: string }; property: { name: string } }
            right: { type: string; id: { type: string; name: string } }
          }
        }
        const leftArg = n.expression.left
        const rightArg = n.expression.right

        return (
          leftArg.object.name === 'module' &&
          leftArg.property.name === 'exports' &&
          rightArg.type === 'FunctionExpression' &&
          rightArg.id.type === 'Identifier' &&
          !!rightArg.id.name
        )
      } catch (_err) {
        return false
      }
    })

    if (moduleExports.length !== 1) {
      return cb(new Error(`File ${filepath} is allowed to contain exactly one module.exports`))
    }

    const exp = moduleExports[0] as {
      expression: {
        right: {
          id: { name: string }
          params: Array<{ name: string }>
          loc: { start: { line: number }; end: { line: number } }
          body: { body: Array<{ loc: { start: { line: number } } }> }
        }
      }
    }

    const funcName = exp.expression.right.id.name
    const funcParams = exp.expression.right.params.map((p) => p.name)
    const funcLoc = exp.expression.right.loc
    const firstFuncBodyElementLoc = exp.expression.right.body.body[0].loc

    const headComments = (
      ast.comments as Array<{ type: string; loc: { start: { line: number }; end: { line: number } }; value: string }>
    )
      .filter(
        (c) =>
          c.type === 'Line' &&
          c.loc.start.line >= funcLoc.start.line &&
          c.loc.end.line <= firstFuncBodyElementLoc.start.line,
      )
      .map((c) => c.value.trim())

    if (headComments.length === 0) {
      const msg = `Unable to parse ${filepath}. Did not find any comments in function definition`
      return cb(new Error(msg))
    }

    const headKeys = this._headKeys(headComments)

    validateHeaderKeys(headKeys, filepath)

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
    }

    this._findDependencies(filepath, params, {}, function (err, dependencies) {
      if (err) {
        return cb(err)
      }

      params.dependencies = dependencies
      return cb(null, params)
    })
  }

  _headKeys(headLines: string[]): HeadKeys {
    const keys: HeadKeys = {}
    let match: RegExpMatchArray | null = null
    let dmatch: RegExpMatchArray | null = null
    let key = ''
    let val = ''
    let num = 0

    for (const i in headLines) {
      match = headLines[i].match(/^\s*\W?\s*([a-z 0-9]+)\s*:\s*(.*)\s*$/)
      if (!match) {
        continue
      }
      key = match[1]
      val = match[2]

      dmatch = key.match(/^(\w+)\s+(\d+)$/)
      if (dmatch) {
        key = dmatch[1]
        num = parseInt(dmatch[2], 10) - 1
      } else {
        num = 0
      }

      if (!isValidHeaderKey(key)) {
        continue
      }

      if (!keys[key]) {
        keys[key] = []
      }
      if (!keys[key][num]) {
        keys[key][num] = []
      }
      keys[key][num].push(val)
    }

    return keys
  }
}

export { Util }
