// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var reset = require('../../../../src/php/array/reset.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/reset.js (tested in test/generated/php/array/test-reset.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Kevin'
    var result = reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
    expect(result).to.deep.equal(expected)
    done()
  })
})
