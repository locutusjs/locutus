module.exports = function md5_file (str_filename) { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/md5_file/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Relies on file_get_contents which does not work in the browser, so Node only.
  //      note 2: Keep in mind that in accordance with PHP, the whole file is buffered and then
  //      note 2: hashed. We'd recommend Node's native crypto modules for faster and more
  //      note 2: efficient hashing
  //   example 1: md5_file('test/never-change.txt')
  //   returns 1: 'bc3aa724b0ec7dce4c26e7f4d0d9b064'

  const fileGetContents = require('../filesystem/file_get_contents')
  const md5 = require('../strings/md5')
  const buf = fileGetContents(str_filename)

  if (buf === false) {
    return false
  }

  return md5(buf)
}
