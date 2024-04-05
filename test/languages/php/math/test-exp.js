// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var exp = require('../../../../src/php/math/exp.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/math/exp.js (tested in test/languages/php/math/test-exp.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 1.3498588075760032
    var result = exp(0.3)
    expect(result).to.deep.equal(expected)
    done()
  })
})
