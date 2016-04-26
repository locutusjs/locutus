module.exports = function sha1_file (str_filename) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/sha1_file/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //   example 1: sha1_file('test/never-change.txt')
  //   returns 1: '0ea65a1f4b4d69712affc58240932f3eb8a2af66'

  var fileGetContents = require('../filesystem/file_get_contents')
  var sha1 = require('../strings/sha1')
  var buf = fileGetContents(str_filename)

  if (buf === false) {
    return false
  }

  return sha1(buf)
}
