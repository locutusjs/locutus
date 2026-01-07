module.exports = function strstr(haystack, needle) {
  //  discuss at: https://locutus.io/c/string/strstr/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Finds the first occurrence of needle in haystack.
  //      note 1: Returns substring starting from the match, or null if not found.
  //   example 1: strstr('Hello, World!', 'World')
  //   returns 1: 'World!'
  //   example 2: strstr('Hello', 'xyz')
  //   returns 2: null

  haystack = haystack + ''
  needle = needle + ''
  const idx = haystack.indexOf(needle)
  return idx === -1 ? null : haystack.slice(idx)
}
