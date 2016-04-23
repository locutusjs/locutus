XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_chunk = require('/Users/kvz/code/phpjs/src/php/array/array_chunk.js')

describe('php', function () {
  describe('array.array_chunk.js', function () {
    it('should pass test 1', function (done) {
      array_chunk(['Kevin', 'van', 'Zonneveld'], 2);
      expected = [['Kevin', 'van'], ['Zonneveld']]
      result = array_chunk(['Kevin', 'van', 'Zonneveld'], 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true);
      expected = [{0:'Kevin', 1:'van'}, {2: 'Zonneveld'}]
      result = array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2);
      expected = [['Kevin', 'van'], ['Zonneveld']]
      result = array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true);
      expected = [{1: 'Kevin', 2: 'van'}, {3: 'Zonneveld'}]
      result = array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true);
      expect(result).to.equal(expected)
      done()
    })
  })
})