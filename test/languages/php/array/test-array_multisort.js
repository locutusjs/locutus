XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_multisort = require('/Users/kvz/code/phpjs/src/php/array/array_multisort.js')

describe('php', function () {
  describe('array.array_multisort.js', function () {
    it('should pass test 1', function (done) {
      array_multisort([1, 2, 1, 2, 1, 2], [1, 2, 3, 4, 5, 6]);
      expected = true
      result = array_multisort([1, 2, 1, 2, 1, 2], [1, 2, 3, 4, 5, 6]);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      characters = {A: 'Edward', B: 'Locke', C: 'Sabin', D: 'Terra', E: 'Edward'};
      jobs = {A: 'Warrior', B: 'Thief', C: 'Monk', D: 'Mage', E: 'Knight'};
      array_multisort(characters, 'SORT_DESC', 'SORT_STRING', jobs, 'SORT_ASC', 'SORT_STRING');
      expected = true
characters = {A: 'Edward', B: 'Locke', C: 'Sabin', D: 'Terra', E: 'Edward'};
jobs = {A: 'Warrior', B: 'Thief', C: 'Monk', D: 'Mage', E: 'Knight'};
      result = array_multisort(characters, 'SORT_DESC', 'SORT_STRING', jobs, 'SORT_ASC', 'SORT_STRING');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      lastnames = [ 'Carter','Adams','Monroe','Tyler','Madison','Kennedy','Adams'];
      firstnames = ['James', 'John' ,'James', 'John', 'James',  'John',   'John'];
      president = [ 39,      6,      5,       10,     4,       35,        2    ];
      array_multisort(firstnames, 'SORT_DESC', 'SORT_STRING', lastnames, 'SORT_ASC', 'SORT_STRING', president, 'SORT_NUMERIC');
      expected = true
lastnames = [ 'Carter','Adams','Monroe','Tyler','Madison','Kennedy','Adams'];
firstnames = ['James', 'John' ,'James', 'John', 'James',  'John',   'John'];
president = [ 39,      6,      5,       10,     4,       35,        2    ];
      result = array_multisort(firstnames, 'SORT_DESC', 'SORT_STRING', lastnames, 'SORT_ASC', 'SORT_STRING', president, 'SORT_NUMERIC');
      expect(result).to.equal(expected)
      done()
    })
  })
})