module.exports = function md5_file (str_filename) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/md5_file/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //        test: skip-all
  //   example 1: md5_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm')
  //   returns 1: '202cb962ac59075b964b07152d234b70'

  var file_get_contents = require('../filesystem/file_get_contents')
  var md5 = require('../strings/md5')
  var buf = ''

  buf = file_get_contents(str_filename)

  if (!buf) {
    return false
  }

  return md5(buf)
}
