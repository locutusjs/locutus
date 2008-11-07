function decbin(number) {
    // http://kevin.vanzonneveld.net
    // +   original by: Enrique Gonzalez
    // +   bugfixed by: Onno Marsman
    // *     example 1: decbin(12);
    // *     returns 1: '1100'
    // *     example 2: decbin(26);
    // *     returns 2: '11010'
    // *     example 3: decbin('26');
    // *     returns 3: '11010'
    
    return parseInt(number).toString(2);
}