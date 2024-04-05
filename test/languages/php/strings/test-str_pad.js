// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var str_pad = require('../../../../src/php/strings/str_pad.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/str_pad.js (tested in test/languages/php/strings/test-str_pad.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '-=-=-=-=-=-Kevin van Zonneveld'
    var result = str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = '------Kevin van Zonneveld-----'
    var result = str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH')
    expect(result).to.deep.equal(expected)
    done()
  })
})
