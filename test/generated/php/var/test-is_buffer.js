// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var is_buffer = require('../../../../src/php/var/is_buffer.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/var/is_buffer.js (tested in test/generated/php/var/test-is_buffer.js)', function () {
  it('should pass example 1', function (done) {
    var expected = true
    var result = is_buffer('This could be binary or a regular string...')
    expect(result).to.deep.equal(expected)
    done()
  })
})
