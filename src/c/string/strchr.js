module.exports = function strchr(str, c) {
  //  discuss at: https://locutus.io/c/string/strchr/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns a pointer to the first occurrence of c in str.
  //      note 1: In JS, returns the substring starting from the first occurrence, or null.
  //   example 1: strchr('Hello, World!', 'o')
  //   returns 1: 'o, World!'
  //   example 2: strchr('Hello', 'x')
  //   returns 2: null

  str = str + ''
  c = (c + '').charAt(0)
  const idx = str.indexOf(c)
  return idx === -1 ? null : str.slice(idx)
}
