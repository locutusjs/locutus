module.exports = function HasSuffix(s, suffix) {
  //  discuss at: https://locutus.io/golang/strings/HasSuffix
  //    verified: 1.23
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: HasSuffix('Amigo', 'go')
  //   returns 1: true
  //   example 2: HasSuffix('Amigo', 'O')
  //   returns 2: false
  //   example 3: HasSuffix('Amigo', 'Amigo')
  //   returns 3: true
  //   example 4: HasSuffix('Amigo', '')
  //   returns 4: true

  s = s + ''
  suffix = suffix + ''
  if (suffix.length === 0) {
    return true
  }
  return s.slice(-suffix.length) === suffix
}
