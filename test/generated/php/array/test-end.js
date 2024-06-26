// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var end = require('../../../../src/php/array/end.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/end.js (tested in test/generated/php/array/test-end.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Zonneveld'
    var result = end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 'Zonneveld'
    var result = end(['Kevin', 'van', 'Zonneveld'])
    expect(result).to.deep.equal(expected)
    done()
  })
})
