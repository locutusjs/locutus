function array_combine(keys, values) {
  //  discuss at: http://phpjs.org/functions/array_combine/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_combine([0,1,2], ['kevin','van','zonneveld']);
  //   returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}

  /*  changed by: Mark Giblin (CodeKraft) - 
      Notes: a number of assumptions are made, 
        1 both keys && values are arrays 
        2 arrays will be of equal length
      returns:  see example 1 above for details, 
                if arrays are not equal, an empty object is returned      
  */

  var obj = {};
  if(keys.length == values.length)
    while(values.length)
      obj[keys.shift()] = values.shift();
  return obj;
}
