// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var preg_match = require('../../../../src/php/pcre/preg_match.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/pcre/preg_match.js (tested in test/languages/php/pcre/test-preg_match.js)', function () {
  it('should pass example 1', function (done) {
    var expected = true
    var result = preg_match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", "rony@pharaohtools.com")
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = false
    var result = preg_match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", "ronypharaohtools.com")
    expect(result).to.deep.equal(expected)
    done()
  })
})
