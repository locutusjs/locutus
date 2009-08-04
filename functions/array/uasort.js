function uasort (inputArr, sorter) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
    // *     results 1: fruits == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}

    if (typeof sorter === 'string') {
        sorter = this[sorter];
    } else if (sorter instanceof Array) {
        sorter = this[sorter[0]][sorter[1]];
    }
    
    var valArr = [], keyArr=[], tempKeyVal, tempValue, ret;
    var k = '', i = 0;

    var sorterNew = function (keyArr, valArr) {
        for (var i=valArr.length-2; i >=0; i--) {
            for (var j=0; j <= i; j++) {
                ret = sorter(valArr[j+1], valArr[j]);
                if (ret < 0) {
                    tempValue = valArr[j];
                    valArr[j] = valArr[j+1];
                    valArr[j+1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j+1];
                    keyArr[j+1] = tempKeyVal;
                }
            }
        }
    };

    for (k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k];
    }
    try {
        sorterNew(keyArr, valArr); // Sort our new temporary arrays
    } catch (e) {
        return false;
    }
    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        inputArr[keyArr[i]] = valArr[i];
    }
    
    return true;
}