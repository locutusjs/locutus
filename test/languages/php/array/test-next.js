// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var next = require('../../../../src/php/array/next.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/next.js (tested in test/languages/php/array/test-next.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'car'
    var $transport = ['foot', 'bike', 'car', 'plane']
    next($transport)
    var result = next($transport)
    expect(result).to.deep.equal(expected)
    done()
  })
})
