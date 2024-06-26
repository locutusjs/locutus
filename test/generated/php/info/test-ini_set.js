// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var ini_set = require('../../../../src/php/info/ini_set.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/info/ini_set.js (tested in test/generated/php/info/test-ini_set.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Asia/Hong_Kong'
    ini_set('date.timezone', 'Asia/Hong_Kong')
    var result = ini_set('date.timezone', 'America/Chicago')
    expect(result).to.deep.equal(expected)
    done()
  })
})
