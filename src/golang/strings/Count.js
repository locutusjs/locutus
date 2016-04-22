module.exports = function Count (s, sep) {
  //  discuss at: http://locutusjs.io/php/printf/
  // original by: Ash Searle (http://hexmen.com/blog/)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  depends on: strings.Index
  //  depends on: unicode.utf8.RuneCountInString
  //   example 1: strings.Count("cheese", "e")
  //   returns 1: 3
  //   example 2: strings.Count("five", "") // before & after each rune
  //   returns 2: 5

  var pos
  var n = 0

  if ((sep.length === 0)) {
    return RuneCountInString(s) + 1 >> 0
  } else if (sep.length > s.length) {
    return 0
  } else if ((sep.length === s.length)) {
    if (sep === s) {
      return 1
    }
    return 0
  }
  while (true) {
    pos = Index(s, sep)
    if (pos === -1) {
      break
    }
    n = n + (1) >> 0
    s = s.substring((pos + sep.length >> 0))
  }
  return n
}
