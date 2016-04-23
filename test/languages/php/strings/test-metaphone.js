XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var metaphone = require('/Users/kvz/code/phpjs/src/php/strings/metaphone.js')

describe('php', function () {
  describe('strings.metaphone.js', function () {
    it('should pass test 1', function (done) {
      metaphone('Gnu');
      expected = 'N'
      result = metaphone('Gnu');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      metaphone('bigger');
      expected = 'BKR'
      result = metaphone('bigger');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      metaphone('accuracy');
      expected = 'AKKRS'
      result = metaphone('accuracy');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      metaphone('batch batcher');
      expected = 'BXBXR'
      result = metaphone('batch batcher');
      expect(result).to.equal(expected)
      done()
    })
  })
})