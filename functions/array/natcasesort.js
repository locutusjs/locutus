function natcasesort(inputArr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: strnatcasecmp
    // *     example 1: $array1 = {0:'IMG0.png', 1:'img12.png', 2:'img10.png', 3:'img2.png', 4:'img1.png', 5:'IMG3.png'};
    // *     example 1: natcasesort($array1);
    // *     returns 1: {0: 'IMG0.png', 4: 'img1.png', 3: 'img2.png', 5: 'IMG3.png', 2: 'img10.png', 1: 'img12.png'}

    var valArr=[], keyArr=[], k, i, ret, that = this;

    var bubbleSort = function(keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                ret = that.strnatcasecmp(inputArr[j+1], inputArr[j]);
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
        delete inputArr[k];
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
