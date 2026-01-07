module.exports = function Split(s, sep) {
  //  discuss at: https://locutus.io/golang/strings/Split
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns an array of substrings split by sep
  //   example 1: Split('a,b,c', ',')
  //   returns 1: ['a', 'b', 'c']
  //   example 2: Split('a man a plan a canal panama', 'a ')
  //   returns 2: ['', 'man ', 'plan ', 'canal panama']
  //   example 3: Split(' xyz ', '')
  //   returns 3: [' ', 'x', 'y', 'z', ' ']
  //   example 4: Split('', 'Bernardo O\'Higgins')
  //   returns 4: ['']

  s = s + ''
  sep = sep + ''

  if (sep === '') {
    // Split into individual characters (like Go's behavior)
    return s.split('')
  }

  return s.split(sep)
}
