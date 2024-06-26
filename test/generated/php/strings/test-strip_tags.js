// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var strip_tags = require('../../../../src/php/strings/strip_tags.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/strip_tags.js (tested in test/generated/php/strings/test-strip_tags.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Kevin <b>van</b> <i>Zonneveld</i>'
    var result = strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = '<p>Kevin van Zonneveld</p>'
    var result = strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = "<a href='https://kvz.io'>Kevin van Zonneveld</a>"
    var result = strip_tags("<a href='https://kvz.io'>Kevin van Zonneveld</a>", "<a>")
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    var expected = '1 < 5 5 > 1'
    var result = strip_tags('1 < 5 5 > 1')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 5', function (done) {
    var expected = '1  1'
    var result = strip_tags('1 <br/> 1')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 6', function (done) {
    var expected = '1 <br/> 1'
    var result = strip_tags('1 <br/> 1', '<br>')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 7', function (done) {
    var expected = '1 <br/> 1'
    var result = strip_tags('1 <br/> 1', '<br><br/>')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 8', function (done) {
    var expected = 'hello world'
    var result = strip_tags('<i>hello</i> <<foo>script>world<</foo>/script>')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 9', function (done) {
    var expected = '4'
    var result = strip_tags(4)
    expect(result).to.deep.equal(expected)
    done()
  })
})
