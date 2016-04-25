module.exports = function sha1_file (str_filename) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/sha1_file/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //        test: skip-all
  //   example 1: sha1_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm')
  //   returns 1: '40bd001563085fc35165329ea1ff5c5ecbdbbeef'

  var file_get_contents = require('../filesystem/file_get_contents')
  var sha1 = require('../strings/sha1')
  var buf = file_get_contents(str_filename)

  return sha1(buf)
}
