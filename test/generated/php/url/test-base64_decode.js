// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var base64_decode = require('../../../../src/php/url/base64_decode.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/url/base64_decode.js (tested in test/generated/php/url/test-base64_decode.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Kevin van Zonneveld'
    var result = base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 'a'
    var result = base64_decode('YQ==')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = '✓ à la mode'
    var result = base64_decode('4pyTIMOgIGxhIG1vZGU=')
    expect(result).to.deep.equal(expected)
    done()
  })
})
