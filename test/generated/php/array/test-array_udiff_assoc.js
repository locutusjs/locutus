// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_udiff_assoc = require('../../../../src/php/array/array_udiff_assoc.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_udiff_assoc.js (tested in test/generated/php/array/test-array_udiff_assoc.js)', function () {
  it('should pass example 1', function (done) {
    var expected = {1: 'van', 2: 'Zonneveld'}
    var result = array_udiff_assoc({0: 'kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
    expect(result).to.deep.equal(expected)
    done()
  })
})
