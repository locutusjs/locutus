#!/usr/bin/env node
var Util = require('./util')

var util = new Util()

util[process.argv[2]](process.argv, function (err) {
  if (err) {
    throw new Error(err)
  }
  console.log('Done')
})
