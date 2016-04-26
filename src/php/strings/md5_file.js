module.exports = function md5_file (str_filename) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/md5_file/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //   example 1: md5_file('test/never-change.txt')
  //   returns 1: '202cb962ac59075b964b07152d234b70'

  var fileGetContents = require('../filesystem/file_get_contents')
  var md5 = require('../strings/md5')
  var buf = fileGetContents(str_filename)

  if (buf === false) {
    return false
  }

  return md5(buf)
}
