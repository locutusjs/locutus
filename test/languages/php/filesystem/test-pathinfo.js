XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var pathinfo = require('/Users/kvz/code/phpjs/src/php/filesystem/pathinfo.js')

describe('php', function () {
  describe('filesystem.pathinfo.js', function () {
    it('should pass test 1', function (done) {
      pathinfo('/www/htdocs/index.html', 1);
      expected = '/www/htdocs'
      result = pathinfo('/www/htdocs/index.html', 1);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');
      expected = 'index.html'
      result = pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');
      expected = 'html'
      result = pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');
      expected = 'index'
      result = pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      pathinfo('/www/htdocs/index.html', 2 | 4);
      expected = {basename: 'index.html', extension: 'html'}
      result = pathinfo('/www/htdocs/index.html', 2 | 4);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');
      expected = {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
      result = pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 7', function (done) {
      pathinfo('/www/htdocs/index.html');
      expected = {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
      result = pathinfo('/www/htdocs/index.html');
      expect(result).to.equal(expected)
      done()
    })
  })
})