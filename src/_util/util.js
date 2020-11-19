const globby = require('globby')
const path = require('path')
const fs = require('fs')
const async = require('async')
const YAML = require('js-yaml')
const mkdirp = require('mkdirp')
const debug = require('depurar')('locutus')
const indentString = require('indent-string')
const _ = require('lodash')
const esprima = require('esprima')

class Util {
  constructor (argv) {
    if (!argv) {
      argv = []
    }
    this.__src = path.dirname(__dirname)
    this.__root = path.dirname(path.dirname(__dirname))
    this.__test = path.dirname(path.dirname(__dirname)) + '/test'

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
      'input by'
    ]

    this.langDefaults = {
      c: {
        order: 1,
        function_title_template: '[language]\'s [category].[function] in JavaScript',
        human: 'C',
        packageType: 'header file',
        inspiration_urls: [
          '<a href="https://en.cppreference.com/w/c/numeric/math">the C math.h documentation</a>',
          '<a href="https://sourceware.org/git/?p=glibc.git;a=tree;f=math;hb=HEAD">the C math.h source</a>'
        ],
        function_description_template: 'Here’s what our current JavaScript equivalent to <a href="https://en.cppreference.com/w/c/numeric/[category]/[function]">[language]\'s [function] found in the [category].h header file</a> looks like.'
      },
      golang: {
        order: 2,
        function_title_template: '[language]\'s [category].[function] in JavaScript',
        human: 'Go',
        packageType: 'package',
        inspiration_urls: [
          '<a href="https://golang.org/pkg/strings/">Go strings documentation</a>',
          '<a href="https://golang.org/src/strings/strings.go">Go strings source</a>',
          '<a href="https://golang.org/src/strings/example_test.go">Go strings examples source</a>',
          '<a href="https://gophersjs.com">GopherJS</a>'
        ],
        function_description_template: 'Here’s what our current JavaScript equivalent to <a href="https://golang.org/pkg/[category]/#[function]">[language]\'s [category].[function]</a> looks like.'
      },
      python: {
        order: 3,
        function_title_template: '[language]\'s [category].[function] in JavaScript',
        human: 'Python',
        packageType: 'module',
        inspiration_urls: [
          '<a href="https://docs.python.org/3/library/string.html">the Python 3 standard library string page</a>'
        ],
        function_description_template: 'Here’s what our current JavaScript equivalent to <a href="https://docs.python.org/3/library/[category].html#[category].[function]">[language]\'s [category].[function]</a> looks like.'
      },
      ruby: {
        order: 4,
        function_title_template: '[language]\'s [category].[function] in JavaScript',
        human: 'Ruby',
        packageType: 'module',
        inspiration_urls: [
          '<a href="https://ruby-doc.org/core-2.2.2/Math.html">the Ruby core documentation</a>'
        ],
        function_description_template: 'Here’s what our current JavaScript equivalent to <a href="https://ruby-doc.org/core-2.2.2/[category].html#method-c-[function]">[language]\'s [category].[function]</a> looks like.'
      },
      php: {
        order: 5,
        function_title_template: '[language]\'s [function] in JavaScript',
        human: 'PHP',
        packageType: 'extension',
        inspiration_urls: [
          '<a href="https://php.net/manual/en/book.strings.php">the PHP string documentation</a>',
          '<a href="https://github.com/php/php-src/blob/master/ext/standard/string.c#L5338">the PHP string source</a>',
          '<a href="https://github.com/php/php-src/blob/master/ext/standard/tests/strings/str_pad_variation1.phpt">a PHP str_pad test</a>'
        ],
        function_description_template: 'Here’s what our current JavaScript equivalent to <a href="https://php.net/manual/en/function.[functiondashed].php">[language]\'s [function]</a> looks like.',
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
          '/packages/index/'
        ]
      }
    }

    this.allowSkip = (argv.indexOf('--noskip') === -1)

    this._reindexBuffer = {}
    this._injectwebBuffer = {}
  }

  injectweb (cb) {
    const self = this
    this._runFunctionOnAll(this._injectwebOne, function (err) {
      if (err) {
        return cb(err)
      }
      for (const indexHtml in self._injectwebBuffer) {
        debug('writing: ' + indexHtml)
        fs.writeFileSync(indexHtml, self._injectwebBuffer[indexHtml], 'utf-8')
      }
    })
  }

  reindex (cb) {
    const self = this
    self._reindexBuffer = {}
    self._runFunctionOnAll(self._reindexOne, function (err) {
      if (err) {
        return cb(err)
      }
      for (const indexJs in self._reindexBuffer) {
        const requires = self._reindexBuffer[indexJs]
        requires.sort()
        debug('writing: ' + indexJs)
        fs.writeFileSync(indexJs, requires.join('\n') + '\n', 'utf-8')
      }
    })
  }

  writetests (cb) {
    this._runFunctionOnAll(this._writetestOne, cb)
  }

  _runFunctionOnAll (runFunc, cb) {
    const self = this

    const q = async.queue(function (fullpath, callback) {
      self._load.bind(self, fullpath, {}, function (err, params) {
        if (err) {
          return callback(err)
        }

        runFunc.bind(self, params, callback)()
      })()
    }, self.concurrency)

    debug({
      pattern: self.pattern
    })
    const files = globby.sync(self.pattern)

    q.push(files)

    q.drain = cb
  }

  _reindexOne (params, cb) {
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

    const line = 'module.exports.' + module + ' = require(\'./' + basefile + '\')'
    this._reindexBuffer[indexJs].push(line)
    return cb(null)
  }

  _injectwebOne (params, cb) {
    const authors = {}
    this.authorKeys.forEach(function (key) {
      if (params.headKeys[key]) {
        authors[key] = _.flattenDeep(params.headKeys[key])
      }
    })

    const langPath = [
      this.__root,
      '/website/source/',
      params.language
    ].join('')

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
        warning: 'This file is auto generated by `npm run web:inject`, do not edit by hand',
        type: 'language',
        layout: 'language',
        language: params.language,
        title: langTitle
      })
      this._injectwebBuffer[langIndexPath] = '---' + '\n' + YAML.safeDump(langData).trim() + '\n' + '---' + '\n'
    }

    if (!this._injectwebBuffer[catIndexPath]) {
      let catTitle = ''
      catTitle += this.langDefaults[params.language].human + '\'s '
      catTitle += params.category + ' '
      catTitle += this.langDefaults[params.language].packageType + ' '
      catTitle += ' in JavaScript'

      const catData = {
        warning: 'This file is auto generated by `npm run web:inject`, do not edit by hand',
        type: 'category',
        layout: 'category',
        language: params.language,
        category: params.category,
        title: catTitle
      }
      this._injectwebBuffer[catIndexPath] = '---' + '\n' + YAML.safeDump(catData).trim() + '\n' + '---' + '\n'
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

    const funcData = {
      warning: 'This file is auto generated by `npm run web:inject`, do not edit by hand',
      examples: (params.headKeys.example || []).map(function (lines, i) {
        return lines.join('\n')
      }),
      estarget: (params.headKeys.estarget || []).map(function (lines, i) {
        return lines.join('\n')
      }).join('\n').trim() || 'es5',
      returns: (params.headKeys.returns || []).map(function (lines, i) {
        return lines.join('\n')
      }),
      dependencies: [],
      authors: authors || {},
      notes: (params.headKeys.note || []).map(function (lines, i) {
        return lines.join('\n')
      }),
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
        '/' + params.language + '/' + params.func_name + '/'
      ]
    }

    if (params.language === 'php') {
      funcData.alias.push('/functions/' + params.func_name + '/')
    }

    let buf = '---' + '\n' + YAML.safeDump(funcData).trim() + '\n' + '---' + '\n'

    buf += `{% codeblock lang:javascript %}${params.code}{% endcodeblock %}`

    mkdirp(path.dirname(funcPath), function (err) {
      if (err) {
        throw new Error('Could not mkdir  for ' + funcPath + '. ' + err)
      }
      fs.writeFile(funcPath, buf, 'utf-8', cb)
    })
  }

  _addRequire (name, relativeSrcForTest) {
    return [
      'var ',
      name,
      ' = require(\'',
      relativeSrcForTest,
      '\') // eslint-disable-line no-unused-vars,camelcase'
    ].join('')
  }

  _writetestOne (params, cb) {
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
    const testpath = this.__test + '/languages/' + subdir + '/test-' + basename
    const testdir = path.dirname(testpath)
    const relativeSrcForTestDir = path.relative(testdir, self.__src)
    const relativeTestFileForRoot = path.relative(self.__root, testpath)

    // console.log(relativeSrcForTestDir)
    // process.exit(1)

    let testProps = ''
    if (params.headKeys.test) {
      testProps = params.headKeys.test[0][0]
    }

    let describeSkip = ''
    if (self.allowSkip && testProps.indexOf('skip-all') !== -1) {
      describeSkip = '.skip'
    }

    const codez = []

    codez.push('// warning: This file is auto generated by `npm run build:tests`')
    codez.push('// Do not edit by hand!')

    // Add globals
    for (const global in self.globals) {
      codez.push('var ' + global + ' = ' + self.globals[global])
    }

    // Set timezone for testing dates
    // Not ideal: https://stackoverflow.com/questions/8083410/how-to-set-default-timezone-in-node-js
    codez.push('process.env.TZ = \'UTC\'')

    codez.push('var ' + 'expect' + ' = require(\'chai\').expect')

    // Add language-wide dependencies
    // @todo: It would be great if we could remove this
    if (params.language === 'php') {
      codez.push(self._addRequire('ini_set', relativeSrcForTestDir + '/' + 'php/info/ini_set'))
      codez.push(self._addRequire('ini_get', relativeSrcForTestDir + '/' + 'php/info/ini_get'))
      if (params.func_name === 'localeconv') {
        codez.push(self._addRequire(
          'setlocale',
          relativeSrcForTestDir + '/' + 'php/strings/setlocale'
        ))
      }
      if (params.func_name === 'i18n_loc_get_default') {
        codez.push(self._addRequire(
          'i18n_loc_set_default',
          relativeSrcForTestDir + '/' + 'php/i18n/i18n_loc_set_default'
        ))
      }
    }

    // Add the main function to test
    codez.push(self._addRequire(
      params.func_name,
      relativeSrcForTestDir + '/' + params.filepath
    ))

    codez.push('')

    codez.push([
      'describe',
      describeSkip,
      '(\'src/',
      params.filepath,
      ' (tested in ',
      relativeTestFileForRoot,
      ')\', function () {'
    ].join(''))

    // Run each example
    for (const i in params.headKeys.example) {
      if (!params.headKeys.returns[i] || !params.headKeys.returns[i].length) {
        throw new Error('There is no return for example ' + i, test, params)
      }

      const humanIndex = parseInt(i, 10) + 1
      let itSkip = ''
      if (self.allowSkip && testProps.indexOf('skip-' + humanIndex) !== -1) {
        itSkip = '.skip'
      }

      codez.push([
        '  it',
        itSkip,
        '(\'should pass example ',
        (humanIndex),
        '\', function (done) {'
      ].join(''))

      const body = []

      const testExpected = params.headKeys.returns[i].join('\n')

      body.push('var expected = ' + testExpected)

      // Execute line by line (see date.js why)
      // We need result be the last result of the example code
      for (const j in params.headKeys.example[i]) {
        if (parseInt(j, 10) === params.headKeys.example[i].length - 1) {
          // last action gets saved
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

    // Write to disk
    mkdirp(testdir, function (err) {
      if (err) {
        throw new Error(err)
      }
      debug('writing: ' + testpath)
      fs.writeFile(testpath, code, 'utf-8', cb)
    })
  }

  // Environment-specific file opener. function name needs to
  // be translated to code. The difficulty is in finding the
  // category.
  _opener (fileOrName, requesterParams, cb) {
    const self = this
    let pattern

    const language = requesterParams.language || '*'

    if (path.basename(fileOrName, '.js').indexOf('.') !== -1) {
      // periods in the basename, like: unicode.utf8.RuneCountInString or strings.sprintf
      pattern = self.__src + '/' + language + '/' + fileOrName.replace(/\./g, '/') + '.js'
    } else if (fileOrName.indexOf('/') === -1) {
      // no slashes, like: sprintf
      pattern = self.__src + '/' + language + '/*/' + fileOrName + '.js'
    } else if (fileOrName.substr(0, 1) === '/') {
      // absolute path, like: /Users/john/code/locutus/php/strings/sprintf.js
      pattern = fileOrName
    } else {
      // relative path, like: php/strings/sprintf.js
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

  _load (fileOrName, requesterParams, cb) {
    const self = this
    self._opener(fileOrName, requesterParams, function (err, fullpath, code) {
      if (err) {
        return cb(err)
      }

      const filepath = path.relative(self.__src, fullpath)
      self._parse(filepath, code, cb)
    })
  }

  _findDependencies (fileOrName, requesterParams, dependencies, cb) {
    const self = this

    if (!requesterParams.headKeys['depends on'] || !requesterParams.headKeys['depends on'].length) {
      if (cb) {
        cb(null, {})
      }
      return
    }

    let i
    let depCodePath
    let loaded = 0
    for (i in requesterParams.headKeys['depends on']) {
      depCodePath = requesterParams.headKeys['depends on'][i][0]

      self._load(depCodePath, requesterParams, function (err, params) {
        if (err) {
          return cb(err)
        }

        dependencies[depCodePath] = params
        self._findDependencies(depCodePath, params, dependencies)

        if (cb && ++loaded === requesterParams.headKeys['depends on'].length) {
          cb(null, dependencies)
        }
      })
    }
  }

  _parse (filepath, code, cb) {
    if (!code) {
      return cb(new Error('Unable to parse ' + filepath + '. Received no code'))
    }

    if (filepath.indexOf('/') === -1) {
      return cb(new Error('Parse only accepts relative filepaths. Received: \'' + filepath + '\''))
    }

    const parts = filepath.split('/')
    const language = parts.shift()
    const codepath = parts.join('.')
    const name = parts.pop()
    const category = parts.join('.')

    const ast = esprima.parseScript(code, { comment: true, loc: true, range: true })

    // find module.exports in the code
    const moduleExports = ast.body.filter(node => {
      try {
        const leftArg = node.expression.left
        const rightArg = node.expression.right

        return leftArg.object.name === 'module' &&
            leftArg.property.name === 'exports' &&
            rightArg.type === 'FunctionExpression' &&
            rightArg.id.type === 'Identifier' &&
            !!rightArg.id.name
      } catch (err) {
        return false
      }
    })

    // if file contains more than one export, fail
    if (moduleExports.length !== 1) {
      return cb(Error(`File ${filepath} is allowed to contain exactly one module.exports`))
    }

    // get the only export
    const exp = moduleExports[0]

    // look for function name and param list
    const funcName = exp.expression.right.id.name
    const funcParams = exp.expression.right.params.map(p => p.name)

    // remember the lines where the function is defined
    const funcLoc = exp.expression.right.loc

    // since comments are not included in the AST
    // but are offered in ast.comments
    // remember the location of first function body statement/expression
    const firstFuncBodyElementLoc = exp.expression.right.body.body[0].loc

    // get all line comments which are located between function signature definition
    // and first function body element
    const headComments = ast.comments.filter(c =>
      c.type === 'Line' &&
      c.loc.start.line >= funcLoc.start.line &&
      c.loc.end.line <= firstFuncBodyElementLoc.start.line).map(c => c.value.trim())

    if (headComments.length === 0) {
      const msg = `Unable to parse ${filepath}. Did not find any comments in function definition`
      return cb(new Error(msg))
    }

    const headKeys = this._headKeys(headComments)

    const params = {
      headKeys: headKeys,
      name: name,
      filepath: filepath,
      codepath: codepath,
      code: code,
      language: language,
      category: category,
      func_name: funcName,
      func_arguments: funcParams
    }

    this._findDependencies(filepath, params, {}, function (err, dependencies) {
      if (err) {
        return cb(err)
      }

      params.dependencies = dependencies
      return cb(null, params)
    })
  }

  _headKeys (headLines) {
    let i
    const keys = {}
    let match = []
    let dmatch = []
    let key = ''
    let val = ''
    let num = 0

    for (i in headLines) {
      if (!(match = headLines[i].match(/^\s*\W?\s*([a-z 0-9]+)\s*:\s*(.*)\s*$/))) {
        continue
      }
      key = match[1]
      val = match[2]

      if ((dmatch = key.match(/^(\w+)\s+(\d+)$/))) {
        // Things like examples and notes can be grouped
        key = dmatch[1]
        num = dmatch[2] - 1
      } else {
        num = 0
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

module.exports = Util
