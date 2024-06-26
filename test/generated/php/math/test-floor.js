// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var floor = require('../../../../src/php/math/floor.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/math/floor.js (tested in test/generated/php/math/test-floor.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 8723321
    var result = floor(8723321.4)
    expect(result).to.deep.equal(expected)
    done()
  })
})
