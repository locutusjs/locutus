// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var substr_compare = require('../../../../src/php/strings/substr_compare.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/substr_compare.js (tested in test/languages/php/strings/test-substr_compare.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 0
    var result = substr_compare("abcde", "bc", 1, 2)
    expect(result).to.deep.equal(expected)
    done()
  })
})
