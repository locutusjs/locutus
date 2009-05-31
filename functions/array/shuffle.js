function shuffle( inputArr ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: shuffle({5:'a', 2:'3', 3:'c', 4:5, 'q':5});
    // *     returns 1: true

    var valArr = [];
    var k = '', i = 0;

    for (k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        delete inputArr[k];
    }
    valArr.sort(function() {return 0.5 - Math.random();});

    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        inputArr[i] = valArr[i];
    }
    
    return true;
}