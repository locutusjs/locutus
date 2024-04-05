// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var strcspn = require('../../../../src/php/strings/strcspn.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/strcspn.js (tested in test/languages/php/strings/test-strcspn.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 7
    var result = strcspn('abcdefg123', '1234567890')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 0
    var result = strcspn('123abc', '1234567890')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = 6
    var result = strcspn('abcdefg123', '1234567890', 1)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    var expected = 1
    var result = strcspn('abcdefg123', '1234567890', -6, -5)
    expect(result).to.deep.equal(expected)
    done()
  })
})
