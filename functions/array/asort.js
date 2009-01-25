function asort(inputArr, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // +   improved by: Brett Zamir
    // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    // %        note 1: integrated into all of these functions by adapting the code at
    // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
    // %        note 2: The examples are correct, this is a new way
    // %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
    // -    depends on: strnatcmp
    // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: asort(data);
    // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    // *     returns 1: true

    var valArr=[], keyArr=[], k, i, ret, sorter;

    switch (sort_flags) {
        case 'SORT_STRING': // compare items as strings
            sorter = function (a, b) {
                return strnatcmp(a, b);
            };
            break;
        case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
            sorter = function (a, b) {
                return(a.localeCompare(b));
            };
            break;
        case 'SORT_NUMERIC': // compare items numerically
            sorter = function (a, b) {
                return(a - b);
            };
            break;
        case 'SORT_REGULAR': // compare items normally (don't change types)
        default:
            sorter = function (a, b) {
                if (a > b)
                    return 1;
                if (a < b)
                    return -1;
                return 0;
            };
            break;
    }

    var bubbleSort = function(keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                ret = sorter(inputArr[j+1], inputArr[j]);
                if (ret < 0) {
                    tempValue = inputArr[j];
                    inputArr[j] = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j+1];
                    keyArr[j+1] = tempKeyVal;
                }
            }
        }
    };

    // Get key and value arrays
    for (k in inputArr) {
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k] ;
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr);
    } catch(e) {
        return false;
    }

    // Repopulate the old array
    for (i = 0; i < valArr.length; i++) {
        inputArr[keyArr[i]] = valArr[i];
    }

    return true;
}