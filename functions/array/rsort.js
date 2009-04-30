function rsort (inputArr, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir (http://brettz9.blogspot.com)
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    // %        note 1: integrated into all of these functions by adapting the code at
    // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
    // *     example 1: rsort(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 2: rsort(fruits);
    // *     returns 2: true
    // *     results 2: fruits == {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}

    var valArr = [], k = '', i = 0, sorter = false, that=this;
    
    for (k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        delete inputArr[k];
    }

    switch (sort_flags) {
        case 'SORT_STRING': // compare items as strings
             sorter = function (a, b) {
                return that.strnatcmp(b, a);
            };
            break;
        case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
            sorter = function (a, b) {
                return(b.localeCompare(a));
            };
            break;
        case 'SORT_NUMERIC': // compare items numerically
            sorter = function (a, b) {
                return(b - a);
            };
            break;
        case 'SORT_REGULAR': // compare items normally (don't change types)
        default:
            sorter = function (a, b) {
                if (a < b) {
                    return 1;
				}
                if (a > b) {
                    return -1;
				}
                return 0;
            };
            break;
    }
    valArr.sort(sorter);

    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        inputArr[i] = valArr[i];
    }
    return true;
}