XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strip_tags = require('/Users/kvz/code/phpjs/src/php/strings/strip_tags.js')

describe('php', function () {
  describe('strings.strip_tags.js', function () {
    it('should pass test 1', function (done) {
      strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
      expected = 'Kevin <b>van</b> <i>Zonneveld</i>'
      result = strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
      expected = '<p>Kevin van Zonneveld</p>'
      result = strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
      expected = "<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>"
      result = strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      strip_tags('1 < 5 5 > 1');
      expected = '1 < 5 5 > 1'
      result = strip_tags('1 < 5 5 > 1');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      strip_tags('1 <br/> 1');
      expected = '1  1'
      result = strip_tags('1 <br/> 1');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      strip_tags('1 <br/> 1', '<br>');
      expected = '1 <br/> 1'
      result = strip_tags('1 <br/> 1', '<br>');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 7', function (done) {
      strip_tags('1 <br/> 1', '<br><br/>');
      expected = '1 <br/> 1'
      result = strip_tags('1 <br/> 1', '<br><br/>');
      expect(result).to.equal(expected)
      done()
    })
  })
})