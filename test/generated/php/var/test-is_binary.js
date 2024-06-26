// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var is_binary = require('../../../../src/php/var/is_binary.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/var/is_binary.js (tested in test/generated/php/var/test-is_binary.js)', function () {
  it('should pass example 1', function (done) {
    var expected = true
    var result = is_binary('This could be binary as far as JavaScript knows...')
    expect(result).to.deep.equal(expected)
    done()
  })
})
