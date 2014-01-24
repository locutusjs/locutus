function arsort(inputArr, sort_flags) {
  //  discuss at: http://phpjs.org/functions/arsort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault
  //        note: SORT_STRING (as well as natsort and natcasesort) might also be
  //        note: integrated into all of these functions by adapting the code at
  //        note: http://sourcefrog.net/projects/natsort/natcompare.js
  //        note: The examples are correct, this is a new way
  //        note: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
  //        note: This function deviates from PHP in returning a copy of the array instead
  //        note: of acting by reference and returning true; this was necessary because
  //        note: IE does not allow deleting and re-adding of properties without caching
  //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to
  //        note: get the PHP behavior, but use this only if you are in an environment
  //        note: such as Firefox extensions where for-in iteration order is fixed and true
  //        note: property deletion is supported. Note that we intend to implement the PHP
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since
  //        note: is by reference in PHP anyways
  //        note: Since JS objects' keys are always strings, and (the
  //        note: default) SORT_REGULAR flag distinguishes by key type,
  //        note: if the content is a numeric string, we treat the
  //        note: "original type" as numeric.
  //  depends on: i18n_loc_get_default
  //   example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  //   example 1: data = arsort(data);
  //   returns 1: data == {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
  //   example 2: ini_set('phpjs.strictForIn', true);
  //   example 2: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  //   example 2: arsort(data);
  //   example 2: $result = data;
  //   returns 2: {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}

  var valArr = [],
    valArrLen = 0,
    k, i, ret, sorter, that = this,
    strictForIn = false,
    populateArr = {};

  switch (sort_flags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function(a, b) {
        return that.strnatcmp(b, a);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, original by the current locale (set with i18n_loc_set_default() as of PHP6)
      var loc = this.i18n_loc_get_default();
      sorter = this.php_js.i18nLocales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function(a, b) {
        return (a - b);
      };
      break;
    case 'SORT_REGULAR':
      // compare items normally (don't change types)
    default:
      sorter = function(b, a) {
        var aFloat = parseFloat(a),
          bFloat = parseFloat(b),
          aNumeric = aFloat + '' === a,
          bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
    .ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function(a, b) {
    return sorter(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return strictForIn || populateArr;
}