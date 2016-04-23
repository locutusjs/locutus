XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var parse_url = require('/Users/kvz/code/phpjs/src/php/url/parse_url.js')

describe('php', function () {
  describe('url.parse_url.js', function () {
    it('should pass test 1', function (done) {
      parse_url('http://username:password@hostname/path?arg=value#anchor');
      expected = {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
      result = parse_url('http://username:password@hostname/path?arg=value#anchor');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      parse_url('http://en.wikipedia.org/wiki/%22@%22_%28album%29');
      expected = {scheme: 'http', host: 'en.wikipedia.org', path: '/wiki/%22@%22_%28album%29'}
      result = parse_url('http://en.wikipedia.org/wiki/%22@%22_%28album%29');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      parse_url('https://host.domain.tld/a@b.c/folder')
      expected = {scheme: 'https', host: 'host.domain.tld', path: '/a@b.c/folder'}
      result = parse_url('https://host.domain.tld/a@b.c/folder')
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      parse_url('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar');
      expected = { scheme: 'https', host: 'www.example.com', path: '/a@b.c/folder', query: 'foo=bar', user: 'gooduser', pass: 'secretpassword' }
      result = parse_url('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar');
      expect(result).to.equal(expected)
      done()
    })
  })
})