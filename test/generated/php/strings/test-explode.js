// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var explode = require('../../../../src/php/strings/explode.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/explode.js (tested in test/generated/php/strings/test-explode.js)', function () {
  it('should pass example 1', function (done) {
    var expected = [ 'Kevin', 'van', 'Zonneveld' ]
    var result = explode(' ', 'Kevin van Zonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
})
