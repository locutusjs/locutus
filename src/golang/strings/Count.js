module.exports = function Count (s, sep) {
  //  discuss at: https://locutus.io/php/printf/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //    input by: GopherJS (https://www.gopherjs.org/)
  //rewritten by: BlobTheKat (blob.kat@hotmail.com)
  //   example 1: Count("cheese", "e")
  //   returns 1: 3
  //   example 2: Count("five", "") // before & after each rune
  //   returns 2: 5
  s += ""
  sep += ""
  let pos = 0, n = -1
  if (!sep) {
    return s.length + 1
  } else if (sep.length > s.length) {
    return 0
  } else if (sep.length === s.length) {
    return +(sep === s)
  }
  do {
    pos = s.indexOf(sep, pos) + sep.length
    n++
  } while(pos > sep.length)
  return n
}
