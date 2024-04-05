// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var substr_count = require('../../../../src/php/strings/substr_count.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/substr_count.js (tested in test/languages/php/strings/test-substr_count.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 3
    var result = substr_count('Kevin van Zonneveld', 'e')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 0
    var result = substr_count('Kevin van Zonneveld', 'K', 1)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = false
    var result = substr_count('Kevin van Zonneveld', 'Z', 0, 10)
    expect(result).to.deep.equal(expected)
    done()
  })
})
