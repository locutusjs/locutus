function array_push(inputArr) {
  //  discuss at: http://phpjs.org/functions/array_push/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: Note also that IE retains information about property position even
  //        note: after being supposedly deleted, so if you delete properties and then
  //        note: add back properties with the same keys (including numeric) that had
  //        note: been deleted, the order will be as before; thus, this function is not
  //        note: really recommended with associative arrays (objects) in IE environments
  //   example 1: array_push(['kevin','van'], 'zonneveld');
  //   returns 1: 3

  var i = 0,
    pr = '',
    argv = arguments,
    argc = argv.length,
    allDigits = /^\d$/,
    size = 0,
    highestIdx = 0,
    len = 0;
  if (inputArr.hasOwnProperty('length')) {
    for (i = 1; i < argc; i++) {
      inputArr[inputArr.length] = argv[i];
    }
    return inputArr.length;
  }

  // Associative (object)
  for (pr in inputArr) {
    if (inputArr.hasOwnProperty(pr)) {
      ++len;
      if (pr.search(allDigits) !== -1) {
        size = parseInt(pr, 10);
        highestIdx = size > highestIdx ? size : highestIdx;
      }
    }
  }
  for (i = 1; i < argc; i++) {
    inputArr[++highestIdx] = argv[i];
  }
  return len + i - 1;
}