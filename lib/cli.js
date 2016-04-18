#!/usr/bin/env node
var cli = require('cli').enable('status', 'help', 'version', 'glob', 'timeout')
var fs = require('fs')
var glob = require('glob')
var path = require('path')
var mkdirp = require('mkdirp')
var _ = require('underscore')
var PhpjsUtil = require('./phpjsutil')
var equal = require('deep-equal')
var __root = path.join(__dirname, '..')
var beautify = require('js-beautify').js_beautify
var YAML = require('js-yaml')

function flatten () {
  var flat = []
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] instanceof Array) {
      flat.push.apply(flat, flatten.apply(this, arguments[i]))
    } else {
      flat.push(arguments[i])
    }
  }
  return flat
}

// Not ideal: http://stackoverflow.com/questions/8083410/how-to-set-default-timezone-in-node-js
process.env.TZ = 'UTC'

// --debug works out of the box. See -h
cli.parse({
  action  : ['a', 'Test / Build', 'string', 'test'],
  output  : ['o', 'Build output file', 'string', __root + '/build/npm.js'],
  name    : ['n', 'Function name to test', 'path', '*'],
  category: ['c', 'Category to test', 'path', '*'],
  abort   : ['a', 'Abort on first failure']
})

var phpjsUtil = new PhpjsUtil({
  injectDependencies: ['ini_set', 'ini_get'],
  equal             : equal,
  debug             : cli.debug,
  globals           : {
    'XMLHttpRequest': '{}',
    'window': '{' +
      'window: {},' +
      'document: {' +
        'lastModified: 1388954399,' +
        'getElementsByTagName: function(){return [];}' +
      '},' +
      'location: {' +
        'href: ""' +
      '}' +
    '}'
  }
})

// Environment-specific file opener. function name needs to
// be translated to code. The difficulty is in finding the
// category.
phpjsUtil.opener = function (name, cb) {
  var pattern = __root + '/functions/*/' + name + '.js'
  glob(pattern, {}, function (err, files) {
    if (err) {
      return self.error('Could not glob for ' + pattern + '. ' + err)
    }
    var filepath = files[0]

    if (!filepath) {
      return cb('Could not find ' + pattern)
    }

    fs.readFile(filepath, 'utf-8', function (err, code) {
      if (err) {
        return cb('Error while opening ' + filepath + '. ' + err)
      }
      return cb(null, code)
    })
  })
}

cli.lpad = function (str, len, pad) {
  if (!pad) pad = ' '
  if (!len) len = 20
  str = str + ''
  if (str.length > len) {
    return str
  }

  return (new Array(len - str.length).join(pad)) + str
}

cli.cleanup = function (args, options) {
  var self = this
  var pattern = __root + '/functions/' + options.category + '/' + options.name + '.js'
  self.glob(pattern, function (err, params, file) {
    if (err) {
      return self.error('Could not glob for ' + pattern + '. ' + err)
    }

    var buf = ''
    buf += 'module.exports = function (' + params.func_arguments.join(', ') + ') {\n'

    var longestKey = 0
    _.each(params.headKeys, function (items, key) {
      var len = key.length
      if (key === 'example') {
        key += 3
      }
      if (len >= longestKey) {
        longestKey = len
      }
    })

    longestKey += 1
    var key, val, items, vals, i, itemNr

    var headKeys = {
      'discuss at': [['http://phpjs.org/functions/' + params.name]]
    }

    _.extend(headKeys, params.headKeys)

    // If you want to overwrite:
    // headKeys['discuss at'] = [['http://phpjs.org/functions/' + params.name + '/']];

    for (key in headKeys) {
      items = headKeys[key]
      for (itemNr in items) {
        vals = items[itemNr]
        for (i in vals) {
          val = vals[i]
          buf += '  // ' + self.lpad((key === 'example' ? (key + ' ' + ((itemNr * 1) + 1)) : key), longestKey) + ': ' + val + '\n'
        }
        if (key === 'example') {
          vals = headKeys.returns[itemNr]

          for (i in vals) {
            val = vals[i]
            buf += '  // ' + self.lpad('returns' + ' ' + ((itemNr * 1) + 1), longestKey) + ': ' + val + '\n'
          }

          delete headKeys.returns[itemNr]
        }
      }
    }

    var indentation = 2

    var newBody = params.body
    // Place "if (x) { //" comments on next line
    newBody = newBody.replace(/^( +)([^\{\n]+\{)( *)(\/\/.*)$/gm, '$1$2\n$1' + Array(indentation).join(' ') + '$4')
    // Place "xyz(); //" comments on previous line
    newBody = newBody.replace(/^( +)([^\. ][^\;\n]+\;)( *)(\/\/.*)$/gm, '$1$4\n$1$2')

    buf += '\n'
    buf += Array(indentation).join(' ') + newBody
    buf += '\n'
    buf += '}\n'

    buf.replace(/\r/g, '')

    // buf = beautify(buf, {
    //   'indent_size'              : indentation,
    //   'indent_char'              : ' ',
    //   'indent_level'             : 0,
    //   'indent_with_tabs'         : false,
    //   'preserve_newlines'        : true,
    //   'max_preserve_newlines'    : 2,
    //   'jslint_happy'             : true,
    //   'brace_style'              : 'collapse',
    //   'keep_array_indentation'   : false,
    //   'keep_function_indentation': false,
    //   'space_before_conditional' : true,
    //   'break_chained_methods'    : true,
    //   'eval_code'                : false,
    //   'unescape_strings'         : false,
    //   'wrap_line_length'         : 120
    // })

    // console.log(buf);
    fs.writeFileSync(file, buf)
  })
}

cli.buildnpm = function (args, options) {
  var self = this
  var pattern = __root + '/functions/' + options.category + '/' + options.name + '.js'
  fs.writeFileSync(options.output, '// This file is generated by `make build`. \n')
  fs.appendFileSync(options.output, '// Do NOT edit by hand. \n')
  fs.appendFileSync(options.output, '// \n')
  fs.appendFileSync(options.output, '// Make function changes in ./functions and \n')
  fs.appendFileSync(options.output, '// generator changes in ./lib/phpjsutil.js \n')

  for (var global in phpjsUtil.globals) {
    fs.appendFileSync(options.output, 'exports.' + global + ' = ' + phpjsUtil.globals[global] + ';\n')
  }
  fs.appendFileSync(options.output, 'exports.window.window = exports.window;\n')

  self.glob(pattern, function (err, params, file) {
    if (err) {
      return self.error('Could not glob for ' + pattern + '. ' + err)
    }
    var buf = '\n'
    buf += 'exports.' + params.func_name + ' = function (' + params.func_arguments.join(', ') + ') {\n'
    buf += '  ' + params.body.split('\n').join('\n  ').replace(/^ {2}$/g, '') + '\n'
    buf += '};\n'
    fs.appendFileSync(options.output, buf)
  })
}

cli.injectweb = function (args, options) {
  var self = this
  var pattern = __root + '/functions/' + options.category + '/' + options.name + '.js'

  self.glob(pattern, function (err, params, file) {
    if (err) {
      return self.error('Could not glob for ' + pattern + '. ' + err)
    }
    var parts = file.split('/')
    var basefile = parts.pop()
    var cat = parts.pop()

    var authors = {}
    var keys = ['original by', 'improved by', 'bugfixed by', 'revised by', 'input by']
    keys.forEach(function (key) {
      if (params.headKeys[key]) {
        authors[key] = flatten(params.headKeys[key])
      }
    })

    var webfuncPath = __root + '/website/_functions/' + cat + '/' + params.func_name + '.html'
    var data = {
      warning: 'This file is auto generated by `npm run web:inject`, do not edit by hand',
      examples: (params.headKeys.example || []).map(function (lines, i) { return lines.join('\n') }),
      returns: (params.headKeys.returns || []).map(function (lines, i) { return lines.join('\n') }),
      dependencies: flatten(params.headKeys['depends on'] || []),
      authors: authors || {},
      notes: (params.headKeys.note || []).map(function (lines, i) { return lines.join('\n') }),
      layout: 'function',
      function: params.func_name,
      category: cat,
      permalink: '/functions/' + params.func_name + '/',
      redirect_from: [ '/functions/' + cat + '/' + params.func_name + '/' ]
    }

    try {
      var yml = YAML.safeDump(data).trim()
    } catch (e) {
      console.dir(data)
      throw new Error('Unable to form valid YAML of above data. ' + e)
    }
    var buf = '---' + '\n' + yml + '\n' + '---' + '\n'

    buf += params.code

    mkdirp(path.dirname(webfuncPath), function (err) {
      if (err) {
        return self.error('Could not mkdir  for ' + webfuncPath + '. ' + err)
      }
      fs.writeFileSync(webfuncPath, buf)
    })
  })
}

cli.glob = function (pattern, workerCb) {
  glob(pattern, {}, function (err, files) {
    if (err) {
      return workerCb(err)
    }
    var names = []
    var map = {}
    for (var i in files) {
      var file = files[i]
      var name = path.basename(file, '.js')
      if (file.indexOf('/_') === -1) {
        names.push(name)
        map[name] = file
      }
    }
    names.forEach(function (name) {
      phpjsUtil.load(name, function (err, params) {
        if (err) {
          return workerCb(err)
        }

        return workerCb(null, params, map[name])
      })
    })
  })
}

cli.test = function (args, options) {
  var self = this
  var pattern = __root + '/functions/' + options.category + '/' + options.name + '.js'
  self.pass_cnt = 0
  self.know_cnt = 0
  self.fail_cnt = 0
  self.skip_cnt = 0

  process.on('exit', function () {
    var msg = self.pass_cnt + ' passed / ' + self.fail_cnt + ' failed  / ' + self.know_cnt + ' known / ' + self.skip_cnt + ' skipped'
    if (self.fail_cnt) {
      cli.fatal(msg)
    } else {
      cli.ok(msg)
    }
  })

  var knownFailures = fs.readFileSync(__root + '/known_failures.txt', 'utf-8').split('\n')

  self.glob(pattern, function (err, params, file) {
    if (err) {
      return self.error('Could not glob for ' + pattern + '. ' + err)
    }

    if (params.headKeys.test && params.headKeys.test[0][0] === 'skip') {
      self.skip_cnt++
      return cli.info('--> ' + params.name + ' skipped as instructed. ')
    }

    phpjsUtil.test(params, function (err, test, params) {
      var testName = params.name + '#' + (+(test.number * 1) + 1)
      if (!err) {
        self.pass_cnt++
        cli.debug('--> ' + testName + ' passed. ')
      } else {
        if (knownFailures.indexOf(testName) > -1) {
          cli.error('--> ' + testName + ' known error. ')
          cli.error(err)
          self.know_cnt++
        } else {
          cli.error('--> ' + testName + ' failed. ')
          cli.error(err)
          self.fail_cnt++
          if (options.abort) {
            cli.fatal('Aborting on first failure as instructed. ')
          }
        }
      }
    })
  })
}

cli.main(function (args, options) {
  cli[options.action](args, options)
})
