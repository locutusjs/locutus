var globby = require('globby')
var path = require('path')
var fs = require('fs')
var async = require('async')
var YAML = require('js-yaml')
var mkdirp = require('mkdirp')
var debug = require('depurar')('locutus')
var indentString = require('indent-string')
var _ = require('lodash')

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

    this.allowSkip = (argv.indexOf('--noskip') === -1)

    this._reindexBuffer = {}
    this._injectwebBuffer = {}
  }

  injectweb (cb) {
    var self = this
    this._runFunctionOnAll(this._injectwebOne, function (err) {
      if (err) {
        return cb(err)
      }
      for (var indexHtml in self._injectwebBuffer) {
        debug('writing: ' + indexHtml)
        fs.writeFileSync(indexHtml, self._injectwebBuffer[indexHtml], 'utf-8')
      }
    })
  }

  reindex (cb) {
    var self = this
    self._reindexBuffer = {}
    self._runFunctionOnAll(self._reindexOne, function (err) {
      if (err) {
        return cb(err)
      }
      for (var indexJs in self._reindexBuffer) {
        var requires = self._reindexBuffer[indexJs]
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
    var self = this

    var q = async.queue(function (fullpath, callback) {
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
    var files = globby.sync(self.pattern)

    q.push(files)

    q.drain = cb
  }

  _reindexOne (params, cb) {
    var fullpath = this.__src + '/' + params.filepath
    var dir = path.dirname(fullpath)
    var basefile = path.basename(fullpath, '.js')
    var indexJs = dir + '/index.js'

    var module = basefile
    if (basefile === 'Index2') {
      module = 'Index'
    }

    if (!this._reindexBuffer[indexJs]) {
      this._reindexBuffer[indexJs] = []
    }

    var line = 'module.exports[\'' + module + '\'] = require(\'./' + basefile + '\')'
    this._reindexBuffer[indexJs].push(line)
    return cb(null)
  }

  _injectwebOne (params, cb) {
    var authors = {}
    var keys = ['original by', 'improved by', 'parts by', 'bugfixed by', 'revised by', 'input by']
    keys.forEach(function (key) {
      if (params.headKeys[key]) {
        authors[key] = _.flattenDeep(params.headKeys[key])
      }
    })

    var langPath = [
      this.__root,
      '/website/source/',
      params.language
    ].join('')
    var langIndexPath = langPath + '/index.html'
    var catPath = langPath + '/' + params.category
    var catIndexPath = catPath + '/' + 'index.html'
    var funcPath = catPath + '/' + params.func_name + '.html'

    var langDefaults = {
      c: {
        order: 1,
        human: 'C',
        inspiration_urls: [
          '<a href="http://en.cppreference.com/w/c/numeric/math">the C math.h documentation</a>',
          '<a href="https://sourceware.org/git/?p=glibc.git;a=tree;f=math;hb=HEAD">the C math.h source</a>'
        ],
        origin_template: '<a href="http://en.cppreference.com/w/c/numeric/[category]/[function]">[human]\'s [category].h\'s [function]</a>'
      },
      golang: {
        order: 2,
        human: 'Go',
        inspiration_urls: [
          '<a href="https://golang.org/pkg/strings/">Go strings documentation</a>',
          '<a href="https://golang.org/src/strings/strings.go">Go strings source</a>',
          '<a href="https://golang.org/src/strings/example_test.go">Go strings examples source</a>',
          '<a href=http://gophersjs.com"">GopherJS</a>'
        ],
        origin_template: '<a href="https://golang.org/pkg/[category]/#[function]">[human]\'s [category].[function]</a>'
      },
      php: {
        order: 5,
        human: 'PHP',
        inspiration_urls: [
          '<a href="http://php.net/manual/en/book.strings.php">the PHP string documentation</a>',
          '<a href="https://github.com/php/php-src/blob/master/ext/standard/string.c#L5338">the PHP string source</a>',
          '<a href="https://github.com/php/php-src/blob/master/ext/standard/tests/strings/str_pad_variation1.phpt">a PHP str_pad test</a>'
        ],
        origin_template: '<a href="http://php.net/manual/en/function.[function].php">[human]\'s [function]</a>',
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
      },
      python: {
        order: 3,
        human: 'Python',
        inspiration_urls: [
          '<a href="https://docs.python.org/3/library/string.html">the Python 3 standard library string page</a>'
        ],
        origin_template: '<a href="https://docs.python.org/3/library/[category].html#[category].[function]">[human]\'s [category].[function]</a>'
      },
      ruby: {
        order: 4,
        human: 'Ruby',
        inspiration_urls: [
          '<a href="http://ruby-doc.org/core-2.2.2/Math.html">the Ruby core documentation</a>'
        ],
        origin_template: '<a href="http://ruby-doc.org/core-2.2.2/[category].html#method-c-[function]">[human]\'s [category].[function]</a>'
      }
    }

    if (!this._injectwebBuffer[langIndexPath]) {
      var langTitle = ''
      langTitle += langDefaults[params.language].human

      var langData = Object.assign({}, langDefaults[params.language], {
        type: 'language',
        layout: 'language',
        language: params.language,
        title: langTitle
      })
      this._injectwebBuffer[langIndexPath] = '---' + '\n' + YAML.safeDump(langData).trim() + '\n' + '---' + '\n'
    }

    if (!this._injectwebBuffer[catIndexPath]) {
      var catTitle = ''
      catTitle += langDefaults[params.language].human + '\'s '
      catTitle += params.category + ' '
      if (params.category === 'php') {
        catTitle += 'extension '
      } else {
        catTitle += 'module '
      }
      catTitle += ' in JavaScript'

      var catData = Object.assign({}, {}, {
        type: 'category',
        layout: 'category',
        language: params.language,
        category: params.category,
        title: catTitle
      })
      this._injectwebBuffer[catIndexPath] = '---' + '\n' + YAML.safeDump(catData).trim() + '\n' + '---' + '\n'
    }

    var functionTitle = ''
    functionTitle += langDefaults[params.language].human + '\'s '
    if (params.language !== 'php') {
      functionTitle += params.category + '.'
    }
    functionTitle += params.func_name
    functionTitle += ' in JavaScript'

    var funcData = {
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

    var buf = '---' + '\n' + YAML.safeDump(funcData).trim() + '\n' + '---' + '\n'

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
    var self = this

    if (!params.func_name) {
      throw new Error('No func_name in ' + JSON.stringify(params))
    }
    if (!params.headKeys) {
      throw new Error('No headKeys in ' + params.func_name)
    }
    if (!params.headKeys.example) {
      throw new Error('No example in ' + params.func_name)
    }

    var basename = path.basename(params.filepath)
    var subdir = path.dirname(params.filepath)
    var testpath = this.__test + '/languages/' + subdir + '/test-' + basename
    var testdir = path.dirname(testpath)
    var relativeSrcForTestDir = path.relative(testdir, self.__src)
    var relativeTestFileForRoot = path.relative(self.__root, testpath)

    // console.log(relativeSrcForTestDir)
    // process.exit(1)

    var testProps = ''
    if (params.headKeys.test) {
      testProps = params.headKeys.test[0][0]
    }

    var describeSkip = ''
    if (self.allowSkip && testProps.indexOf('skip-all') !== -1) {
      describeSkip = '.skip'
    }

    var codez = []

    codez.push('// warning: This file is auto generated by `npm run build:tests`')
    codez.push('// Do not edit by hand!')

    // Add globals
    for (var global in self.globals) {
      codez.push('var ' + global + ' = ' + self.globals[global])
    }

    // Set timezone for testing dates
    // Not ideal: http://stackoverflow.com/questions/8083410/how-to-set-default-timezone-in-node-js
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
    for (var i in params.headKeys.example) {
      if (!params.headKeys.returns[i] || !params.headKeys.returns[i].length) {
        throw new Error('There is no return for example ' + i, test, params)
      }

      var humanIndex = parseInt(i, 10) + 1
      var itSkip = ''
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

      var body = []

      var testExpected = params.headKeys.returns[i].join('\n')

      body.push('var expected = ' + testExpected)

      // Execute line by line (see date.js why)
      // We need result be the last result of the example code
      for (var j in params.headKeys.example[i]) {
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

    var code = codez.join('\n')

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
    var self = this
    var pattern

    var language = requesterParams.language || '*'

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
    var files = globby.sync(pattern, {})

    if (files.length !== 1) {
      var msg = `Found ${files.length} occurances of ${fileOrName} via pattern: ${pattern}`
      return cb(new Error(msg))
    }

    var filepath = files[0]

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
    var self = this
    self._opener(fileOrName, requesterParams, function (err, fullpath, code) {
      if (err) {
        return cb(err)
      }

      var filepath = path.relative(self.__src, fullpath)
      self._parse(filepath, code, cb)
    })
  }

  _findDependencies (fileOrName, requesterParams, dependencies, cb) {
    var self = this

    if (!requesterParams.headKeys['depends on'] || !requesterParams.headKeys['depends on'].length) {
      if (cb) {
        cb(null, {})
      }
      return
    }

    var i
    var depCodePath
    var loaded = 0
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

    var parts = filepath.split('/')
    var language = parts.shift()
    var codepath = parts.join('.')
    var name = parts.pop()
    var category = parts.join('.')

    var patFuncStart = /^\s*module\.exports = function\s*([^\s)]+)\s*\(([^\)]*)\)\s*\{\s*/i
    var patFuncEnd = /\s*}\s*$/
    var commentBlocks = this._commentBlocks(code)

    if (!commentBlocks[0]) {
      var msg = `Unable to parse ${filepath}. Did not find any comment blocks in: ${code}`
      return cb(new Error(msg))
    }

    var head = commentBlocks[0].raw.join('\n')
    var body = code.replace(head, '')
    body = body.replace(patFuncStart, '')
    body = body.replace(patFuncEnd, '')
    var headKeys = this._headKeys(commentBlocks[0].clean)

    // Parse fucntion signature
    var funcSigMatch = code.match(patFuncStart)
    if (!funcSigMatch) {
      return cb(new Error('Unable to parse ' + name))
    }

    var params = {
      headKeys: headKeys,
      body: body,
      head: head,
      name: name,
      filepath: filepath,
      codepath: codepath,
      code: code,
      language: language,
      category: category,
      func_signature: funcSigMatch[0],
      func_name: funcSigMatch[1],
      func_arguments: funcSigMatch[2].split(/,\s*/),
      commentBlocks: commentBlocks
    }

    this._findDependencies(filepath, params, {}, function (err, dependencies) {
      if (err) {
        return cb(err)
      }

      params.dependencies = dependencies
      return cb(null, params)
    })
  }

  _commentBlocks (code) {
    var cnt = 0
    var comment = []
    var commentBlocks = []
    var i = 0
    var lines = []
    var raise = false
    for (i in (lines = code.replace('\r', '').split('\n'))) {
      // Detect if line is a comment, and return the actual comment
      if ((comment = lines[i].match(/^\s*(\/\/|\/\*|\*)\s*(.*)$/))) {
        if (raise === true) {
          cnt = commentBlocks.length
          raise = false
        }
        if (!commentBlocks[cnt]) {
          commentBlocks[cnt] = {
            clean: [],
            raw: []
          }
        }

        commentBlocks[cnt].clean.push(comment[2].trim())
        commentBlocks[cnt].raw.push(lines[i])
      } else {
        raise = true
      }
    }

    return commentBlocks
  }

  _headKeys (headLines) {
    var i
    var keys = {}
    var match = []
    var dmatch = []
    var key = ''
    var val = ''
    var num = 0

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
