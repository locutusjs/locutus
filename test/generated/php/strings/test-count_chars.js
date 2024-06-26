// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var count_chars = require('../../../../src/php/strings/count_chars.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/count_chars.js (tested in test/generated/php/strings/test-count_chars.js)', function () {
  it('should pass example 1', function (done) {
    var expected = " !HWdelor"
    var result = count_chars("Hello World!", 3)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = {32:1,33:1,72:1,87:1,100:1,101:1,108:3,111:2,114:1}
    var result = count_chars("Hello World!", 1)
    expect(result).to.deep.equal(expected)
    done()
  })
})
