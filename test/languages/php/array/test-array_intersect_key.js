// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_intersect_key = require('../../../../src/php/array/array_intersect_key.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_intersect_key.js (tested in test/languages/php/array/test-array_intersect_key.js)', function () {
  it('should pass example 1', function (done) {
    var expected = {0: 'red', a: 'green'}
    var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    var $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
    var result = array_intersect_key($array1, $array2)
    expect(result).to.deep.equal(expected)
    done()
  })
})
