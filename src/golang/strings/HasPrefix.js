module.exports = function HasPrefix(s, prefix) {
  //  discuss at: https://locutus.io/golang/strings/HasPrefix
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: HasPrefix('Gopher', 'Go')
  //   returns 1: true
  //   example 2: HasPrefix('Gopher', 'C')
  //   returns 2: false
  //   example 3: HasPrefix('Gopher', '')
  //   returns 3: true

  s = s + ''
  prefix = prefix + ''
  return s.slice(0, prefix.length) === prefix
}
