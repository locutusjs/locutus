module.exports = function vprintf (format, args) {
  //       discuss at: http://locutusjs.io/php/vprintf/
  //      original by: Ash Searle (http://hexmen.com/blog/)
  //      improved by: Michael White (http://getsprink.com)
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //        example 1: vprintf("%01.2f", 123.1)
  //        returns 1: 6
  //        test: skip-1

  var sprintf = require('../strings/sprintf')
  var body, elmt
  var ret = ''
  var d = this.window.document

  // @todo This environmental printing belongs in echo

  // .shift() does not work to get first item in bodies
  var HTMLNS = 'http://www.w3.org/1999/xhtml'
  body = d.getElementsByTagNameNS ? (d.getElementsByTagNameNS(HTMLNS, 'body')[0] ? d.getElementsByTagNameNS(HTMLNS,
    'body')[0] : d.documentElement.lastChild) : d.getElementsByTagName('body')[0]

  if (!body) {
    return false
  }

  ret = sprintf.apply(this, [format].concat(args))

  elmt = d.createTextNode(ret)
  body.appendChild(elmt)

  return ret.length
}
