// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_merge = require('../../../../src/php/array/array_merge.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_merge.js (tested in test/languages/php/array/test-array_merge.js)', function () {
  it('should pass example 1', function (done) {
    var expected = {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
    var $arr1 = {"color": "red", 0: 2, 1: 4}
    var $arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
    var result = array_merge($arr1, $arr2)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = {0: "data"}
    var $arr1 = []
    var $arr2 = {1: "data"}
    var result = array_merge($arr1, $arr2)
    expect(result).to.deep.equal(expected)
    done()
  })
})
