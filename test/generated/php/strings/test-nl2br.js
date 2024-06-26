// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var nl2br = require('../../../../src/php/strings/nl2br.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/nl2br.js (tested in test/generated/php/strings/test-nl2br.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Kevin<br />\nvan<br />\nZonneveld'
    var result = nl2br('Kevin\nvan\nZonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
    var result = nl2br("\nOne\nTwo\n\nThree\n", false)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
    var result = nl2br("\nOne\nTwo\n\nThree\n", true)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    var expected = ''
    var result = nl2br(null)
    expect(result).to.deep.equal(expected)
    done()
  })
})
