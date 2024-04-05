// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var convert_cyr_string = require('../../../../src/php/strings/convert_cyr_string.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/convert_cyr_string.js (tested in test/languages/php/strings/test-convert_cyr_string.js)', function () {
  it('should pass example 1', function (done) {
    var expected = true
    var result = convert_cyr_string(String.fromCharCode(214), 'k', 'w').charCodeAt(0) === 230; // Char. 214 of KOI8-R gives equivalent number value 230 in win1251
    expect(result).to.deep.equal(expected)
    done()
  })
})
