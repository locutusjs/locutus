function array_pop(inputArr) {
  //  discuss at: http://phpjs.org/functions/array_pop/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: Theriault
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //        note: While IE (and other browsers) support iterating an object's
  //        note: own properties in order, if one attempts to add back properties
  //        note: in IE, they may end up in their former position due to their position
  //        note: being retained. So use of this function with "associative arrays"
  //        note: (objects) may lead to unexpected behavior in an IE environment if
  //        note: you add back properties with the same keys that you removed
  //   example 1: array_pop([0,1,2]);
  //   returns 1: 2
  //   example 2: data = {firstName: 'Kevin', surName: 'van Zonneveld'};
  //   example 2: lastElem = array_pop(data);
  //   example 2: $result = data
  //   returns 2: {firstName: 'Kevin'}

  var key = '',
    lastKey = '';

  if (inputArr.hasOwnProperty('length')) {
    // Indexed
    if (!inputArr.length) {
      // Done popping, are we?
      return null;
    }
    return inputArr.pop();
  } else {
    // Associative
    for (key in inputArr) {
      if (inputArr.hasOwnProperty(key)) {
        lastKey = key;
      }
    }
    if (lastKey) {
      var tmp = inputArr[lastKey];
      delete(inputArr[lastKey]);
      return tmp;
    } else {
      return null;
    }
  }
}