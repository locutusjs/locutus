XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var shuffle = require('/Users/kvz/code/phpjs/src/php/array/shuffle.js')

describe.skip('php.array.shuffle.js', function () {
  it('should pass example 1', function (done) {
    ini_set('locutus.strictForIn', true);
    shuffle(data);
    $result = data;
    var expected = {5:'a', 4:5, 'q':5, 3:'c', 2:'3'}
ini_set('locutus.strictForIn', true);
shuffle(data);
    var result = $result = data;
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
    ini_set('locutus.strictForIn', true);
    var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
    shuffle(data);
    $result = data;
    var expected = {5:'a', 'q':5, 3:'c', 2:'3', 4:5}
var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
ini_set('locutus.strictForIn', true);
var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
shuffle(data);
    var result = $result = data;
    expect(result).to.deep.equal(expected)
    done()
  })
})