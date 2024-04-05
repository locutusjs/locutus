// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var microtime = require('../../../../src/php/datetime/microtime.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/datetime/microtime.js (tested in test/languages/php/datetime/test-microtime.js)', function () {
  it('should pass example 1', function (done) {
    var expected = true
    var $timeStamp = microtime(true)
    var result = $timeStamp > 1000000000 && $timeStamp < 2000000000
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = true
    var result = /^0\.[0-9]{1,6} [0-9]{10,10}$/.test(microtime())
    expect(result).to.deep.equal(expected)
    done()
  })
})
