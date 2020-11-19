#!/usr/bin/env node

const Util = require('./util')

const util = new Util(process.argv)

util[process.argv[2]](function (err) {
  if (err) {
    throw new Error(err)
  }
  console.log('Done')
})
