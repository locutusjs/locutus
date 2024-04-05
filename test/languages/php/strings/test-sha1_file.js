// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var sha1_file = require('../../../../src/php/strings/sha1_file.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/sha1_file.js (tested in test/languages/php/strings/test-sha1_file.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '0ea65a1f4b4d69712affc58240932f3eb8a2af66'
    var result = sha1_file('test/never-change.txt')
    expect(result).to.deep.equal(expected)
    done()
  })
})
