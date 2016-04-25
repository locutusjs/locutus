module.exports = function echo () {
  //  discuss at: http://locutusjs.io/php/echo/
  // original by: Philip Peterson
  // improved by: echo is bad
  // improved by: Nate
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  revised by: Der Simon (http://innerdom.sourceforge.net/)
  // bugfixed by: Eugene Bulkin (http://doubleaw.com/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: EdorFaus
  //  revised by: Kevin van Zonneveld (http://kvz.io)
  //    input by: JB
  //   example 1: echo('<div><p>abc</p><p>abc</p></div>')
  //   returns 1: undefined

  var args = Array.prototype.slice.call(arguments)
  return console.log(args.join(' '))
}
