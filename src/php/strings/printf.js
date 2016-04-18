module.exports = function printf () {
  //  discuss at: http://locutusjs.org/php/printf/
  // original by: Ash Searle (http://hexmen.com/blog/)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  depends on: sprintf
  //   example 1: printf("%01.2f", 123.1);
  //   returns 1: 6

  var isNode = typeof module !== 'undefined' && module.exports && typeof global !== 'undefined' && {}.toString.call(global) === '[object global]'

  var body, elmt, d = this.window.document
  var ret = ''

  var HTMLNS = 'http://www.w3.org/1999/xhtml'
  body = d.getElementsByTagNameNS ? (d.getElementsByTagNameNS(HTMLNS, 'body')[0] ? d.getElementsByTagNameNS(HTMLNS,
    'body')[0] : d.documentElement.lastChild) : d.getElementsByTagName('body')[0]

  if (!body) {
    return false
  }

  ret = this.sprintf.apply(this, arguments)

  if (isNode) {
    return console.log(ret)
  }

  elmt = d.createTextNode(ret)
  body.appendChild(elmt)

  return ret.length
}
