// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_diff_uassoc = require('../../../../src/php/array/array_diff_uassoc.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_diff_uassoc.js (tested in test/languages/php/array/test-array_diff_uassoc.js)', function () {
  it.skip('should pass example 1', function (done) {
    var expected = {b: 'brown', c: 'blue', 0: 'red'}
    var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
    var result = array_diff_uassoc($array1, $array2, function (key1, key2) { return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)) })
    expect(result).to.deep.equal(expected)
    done()
  })
})
