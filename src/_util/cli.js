#!/usr/bin/env node
var cli = require('cli').enable('status', 'help', 'version', 'glob', 'timeout')
var path = require('path')
var Util = require('./util')
var equal = require('deep-equal')
// var fs = require('fs')
// var _ = require('underscore')

// Not ideal: http://stackoverflow.com/questions/8083410/how-to-set-default-timezone-in-node-js
process.env.TZ = 'UTC'

// --debug works out of the box. See -h
cli.parse({
  action: ['a', 'Test / Build', 'string', 'test'],
  name: ['n', 'Function name to test', 'path', '*'],
  category: ['c', 'Category to test', 'path', '*'],
  language: ['l', 'Language to test', 'path', '*'],
  abort: ['a', 'Abort on first failure']
})

var util = new Util({
  debug: cli.debug,
  error: cli.error,
  fatal: cli.fatal,
  info: cli.info,
  ok: cli.ok,
  injectDependencies: ['ini_set', 'ini_get'],
  equal: equal,
  __src: path.dirname(__dirname),
  __root: path.dirname(path.dirname(__dirname)),
  globals: {
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

cli.main(function (args, options) {
  util[options.action](args, options)
})
