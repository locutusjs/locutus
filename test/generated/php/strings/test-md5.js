// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var md5 = require('../../../../src/php/strings/md5.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/md5.js (tested in test/generated/php/strings/test-md5.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '6e658d4bfcb59cc13f96c14450ac40b9'
    var result = md5('Kevin van Zonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
})
