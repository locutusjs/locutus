// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_filter = require('../../../../src/php/array/array_filter.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_filter.js (tested in test/languages/php/array/test-array_filter.js)', function () {
  it('should pass example 1', function (done) {
    var expected = {"a": 1, "c": 3, "e": 5}
    var odd = function (num) {return (num & 1);}
    var result = array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = [ 6, , 8, , 10, , 12 ]
    var even = function (num) {return (!(num & 1));}
    var result = array_filter([6, 7, 8, 9, 10, 11, 12], even)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = {"a":1, "c":-1}
    var result = array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined})
    expect(result).to.deep.equal(expected)
    done()
  })
})
