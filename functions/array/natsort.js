function natsort(inputArr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // -    depends on: strnatcmp
    // *     example 1: $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"};
    // *     example 1: natcasesort($array1);
    // *     returns 1: {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}

    var valArr=[], keyArr=[], k, i, ret;

    var bubbleSort = function(keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                ret = strnatcmp(inputArr[j+1], inputArr[j]);
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