// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var serialize = require('../../../../src/php/var/serialize.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/var/serialize.js (tested in test/languages/php/var/test-serialize.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    var result = serialize(['Kevin', 'van', 'Zonneveld'])
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 'a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}'
    var result = serialize({firstName: 'Kevin', midName: 'van'})
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = 'a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}'
    var result = serialize( {'ü': 'ü', '四': '四', '𠜎': '𠜎'})
    expect(result).to.deep.equal(expected)
    done()
  })
})
