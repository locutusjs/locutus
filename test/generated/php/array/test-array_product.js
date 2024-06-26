// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_product = require('../../../../src/php/array/array_product.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_product.js (tested in test/generated/php/array/test-array_product.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 384
    var result = array_product([ 2, 4, 6, 8 ])
    expect(result).to.deep.equal(expected)
    done()
  })
})
