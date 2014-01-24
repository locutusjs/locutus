function usort(inputArr, sorter) {
  //  discuss at: http://phpjs.org/functions/usort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //   example 1: stuff = {d: '3', a: '1', b: '11', c: '4'};
  //   example 1: stuff = usort(stuff, function (a, b) {return(a-b);});
  //   example 1: $result = stuff;
  //   returns 1: {0: '1', 1: '3', 2: '4', 3: '11'};

  var valArr = [],
    k = '',
    i = 0,
    strictForIn = false,
    populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]];
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
    .ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  for (k in inputArr) { // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  try {
    valArr.sort(sorter);
  } catch (e) {
    return false;
  }
  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return strictForIn || populateArr;
}