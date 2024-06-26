// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var sort = require('../../../../src/php/array/sort.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/sort.js (tested in test/generated/php/array/test-sort.js)', function () {
  it.skip('should pass example 1', function (done) {
    var expected = ['Kevin', 'Zonneveld', 'van']
    var $arr = ['Kevin', 'van', 'Zonneveld']
    sort($arr)
    var result = $arr
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
    ini_set('locutus.sortByReference', true)
    var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    sort($fruits)
    var result = $fruits
    expect(result).to.deep.equal(expected)
    done()
  })
})
