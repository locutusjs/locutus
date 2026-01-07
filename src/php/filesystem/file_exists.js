module.exports = function file_exists(filename) {
  //  discuss at: https://locutus.io/php/file_exists/
  //    verified: 8.3
  // original by: Erik Niebla
  //      note 1: so this function is Node-only
  //   example 1: file_exists('test/never-change.txt')
  //   returns 1: true

  const fs = require('fs')

  return fs.existsSync(filename)
}
