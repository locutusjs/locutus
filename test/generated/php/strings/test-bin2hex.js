// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var bin2hex = require('../../../../src/php/strings/bin2hex.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/bin2hex.js (tested in test/generated/php/strings/test-bin2hex.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '4b6576'
    var result = bin2hex('Kev')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = '00'
    var result = bin2hex(String.fromCharCode(0x00))
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = 'c3a6'
    var result = bin2hex("æ")
    expect(result).to.deep.equal(expected)
    done()
  })
})
