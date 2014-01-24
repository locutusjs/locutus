function array_unshift(array) {
  //  discuss at: http://phpjs.org/functions/array_unshift/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Martijn Wieringa
  // improved by: jmweb
  //        note: Currently does not handle objects
  //   example 1: array_unshift(['van', 'Zonneveld'], 'Kevin');
  //   returns 1: 3

  var i = arguments.length;

  while (--i !== 0) {
    arguments[0].unshift(arguments[i]);
  }

  return arguments[0].length;
}