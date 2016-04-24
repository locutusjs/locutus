#!/usr/bin/env node
var path = require('path')
var Util = require('./util')

var util = new Util({
  __src: path.dirname(__dirname),
  __root: path.dirname(path.dirname(__dirname)),
  __test: path.dirname(path.dirname(__dirname)) + '/test'
})

util[process.argv[2]](process.argv, function (err) {
  if (err) {
    throw new Error(err)
  }
  console.log('Done')
})
