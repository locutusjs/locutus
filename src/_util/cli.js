#!/usr/bin/env node

var Util = require('./util')

var util = new Util(process.argv)

util[process.argv[2]](function (err) {
  if (err) {
    throw new Error(err)
  }
  console.log('Done')
})
