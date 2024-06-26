// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var log10 = require('../../../../src/php/math/log10.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/math/log10.js (tested in test/generated/php/math/test-log10.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 1
    var result = log10(10)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 0
    var result = log10(1)
    expect(result).to.deep.equal(expected)
    done()
  })
})
