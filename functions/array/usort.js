function usort (inputArr, sorter) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: stuff = {d: '3', a: '1', b: '11', c: '4'};
    // *     example 1: usort(stuff, function (a, b) {return(a-b);});
    // *     results 1: stuff = {0: '1', 1: '3', 2: '4', 3: '11'};

    var valArr = [], keyArr=[];
    var k = '', i = 0;

    if (typeof sorter === 'string') {
        sorter = this[sorter];
    } else if (sorter instanceof Array) {
        sorter = this[sorter[0]][sorter[1]];
    }
    for (k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        delete inputArr[k] ;
    }
    try {
        valArr.sort(sorter);
    } catch (e) {
        return false;
    }
    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        inputArr[i] = valArr[i];
    }

    return true;
}