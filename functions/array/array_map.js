function array_map (callback) {
  // http://kevin.vanzonneveld.net
  // +   original by: Andrea Giammarchi (http://webreflection.blogspot.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Takes a function as an argument, not a function's name
  // %        note 2: If the callback is a string, it can only work if the function name is in the global context
  // *     example 1: array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] );
  // *     returns 1: [ 1, 8, 27, 64, 125 ]
  var argc = arguments.length,
    argv = arguments;
  var j = argv[1].length,
    i = 0,
    k = 1,
    m = 0;
  var tmp = [],
    tmp_ar = [];

  while (i < j) {
    while (k < argc) {
      tmp[m++] = argv[k++][i];
    }

    m = 0;
    k = 1;

    if (callback) {
      if (typeof callback === 'string') {
        callback = this.window[callback];
      }
      tmp_ar[i++] = callback.apply(null, tmp);
    } else {
      tmp_ar[i++] = tmp;
    }

    tmp = [];
  }

  return tmp_ar;
}
