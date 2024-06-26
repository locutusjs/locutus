// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var asort = require('../../../../src/php/array/asort.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/asort.js (tested in test/generated/php/array/test-asort.js)', function () {
  it('should pass example 1', function (done) {
    var expected = {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    asort($data)
    var result = $data
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    ini_set('locutus.sortByReference', true)
    var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
    asort($data)
    var result = $data
    expect(result).to.deep.equal(expected)
    done()
  })
})
