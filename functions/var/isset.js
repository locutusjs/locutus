function isset () {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: FremyCompany
  // +   improved by: Onno Marsman
  // +   improved by: Rafał Kukawski
  // *     example 1: isset( undefined, true);
  // *     returns 1: false
  // *     example 2: isset( 'Kevin van Zonneveld' );
  // *     returns 2: true
  var a = arguments;

  if (a.length === 0) {
    throw new Error('Empty isset');
  }

  for (var i in a) {
    if (a[i] === undef || a[i] === null) return false;
  }

  return true;
}
