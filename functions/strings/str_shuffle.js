function str_shuffle (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: shuffled = str_shuffle("abcdef");
    // *     results 1: shuffled.length == 6
    if (str == null) {
        throw 'Wrong parameter count for str_shuffle()';
    }
    
    str += '';

    var newStr = '', rand;

    while (str.length) {
        rand = Math.floor(Math.random() * str.length);
        newStr += str.charAt(rand);
        str = str.substring(0, rand) + str.substr(rand + 1);
    }

    return newStr;
}
