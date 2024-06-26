// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var floatval = require('../../../../src/php/var/floatval.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/var/floatval.js (tested in test/generated/php/var/test-floatval.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 150.03
    var result = floatval('150.03_page-section')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 0
    -50
    floatval('page: 3')
    var result = floatval('-50 + 8')
    expect(result).to.deep.equal(expected)
    done()
  })
})
