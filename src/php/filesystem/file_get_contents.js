module.exports = function file_get_contents (url, flags, context, offset, maxLen) { // eslint-disable-line camelcase
  //       discuss at: http://locutusjs.io/php/file_get_contents/
  //      original by: Legaev Andrey
  //         input by: Jani Hartikainen
  //         input by: Raphael (Ao) RUDLER
  //      improved by: Kevin van Zonneveld (http://kvz.io)
  //      improved by: Brett Zamir (http://brett-zamir.me)
  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
  // reimplemented by: Kevin van Zonneveld (http://kvz.io)
  //           note 1: Does not work in the browser. Node only.
  //        example 1: var $buf = file_get_contents('test/never-change.txt')
  //        example 1: var $result = $buf.indexOf('file_get_contents') !== -1
  //        returns 1: true

  var fs = require('fs')

  return fs.readFileSync(url, 'utf-8')
}
