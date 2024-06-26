// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var create_function = require('../../../../src/php/funchand/create_function.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/funchand/create_function.js (tested in test/generated/php/funchand/test-create_function.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 3
    var $f = create_function('a, b', 'return (a + b)')
    var result = $f(1, 2)
    expect(result).to.deep.equal(expected)
    done()
  })
})
