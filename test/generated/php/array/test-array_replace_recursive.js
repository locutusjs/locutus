// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_replace_recursive = require('../../../../src/php/array/array_replace_recursive.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_replace_recursive.js (tested in test/generated/php/array/test-array_replace_recursive.js)', function () {
  it('should pass example 1', function (done) {
    var expected = {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}
    var result = array_replace_recursive({'citrus' : ['orange'], 'berries' : ['blackberry', 'raspberry']}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']})
    expect(result).to.deep.equal(expected)
    done()
  })
})