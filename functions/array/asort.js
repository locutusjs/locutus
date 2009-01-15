function asort(inputArr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %          note: The examples are correct, this is a new way
    // %          note: Credits to: http://javascript.internet.com/math-related/bubble-sort.html 
    // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: asort(data);
    // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    // *     returns 1: true

    var bubbleSort = function(keyArr, inputArr) {
        var i = 0, j = 0, tempValue = '', tempKeyVal = '';

        for (i = inputArr.length-2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                if (inputArr[j+1] < inputArr[j]) {
                    tempValue     = inputArr[j];
                    inputArr[j]   = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    tempKeyVal    = keyArr[j];
                    keyArr[j]     = keyArr[j+1];
                    keyArr[j+1]   = tempKeyVal;
                }
            }
        }
    };

    var valArr = [], keyArr=[], k = '', i = 0;

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