function str_shuffle (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: shuffled = str_shuffle("abcdef");
    // *     results 1: shuffled.length == 6
    if (str == undefined) {
        throw 'Wrong parameter count for str_shuffle()';
    }

    var getRandomInt = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };
    var newStr = '',
        rand = 0;

    while (str.length) {
        rand = getRandomInt(str.length - 1);
        newStr += str.charAt(rand);
        str = str.substring(0, rand) + str.substr(rand + 1);
    }

    return newStr;
}
