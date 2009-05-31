function str_word_count(str, format, charlist) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ole Vrijenhoek
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Original author stated that "charlist parameter works correct but the last word in the given string will not be counted", but seems to work
    // *     example 1: str_word_count('Hello fri3nd, youre   looking          good today!', 1, 'àáãç3');
    // *     returns 1: ['Hello', 'fri3nd', 'youre', 'looking', 'good', 'today']

    // A word is valid when it contains a-z A-Z ' -
    // Ole Vrijenhoek
    var l = str.length; var tmpStr = "";
    var i = 0;
    var c = '';
    var wArr = [], wC = 0;
    var assArr = {}, aC = 0, reg = "";
    
    if (charlist) {
        for(i = 0; i<=charlist.length - 1; i++) {
            if (i != charlist.length - 1) {
                reg = reg + charlist.charCodeAt(i) + "|";
            } else {
                reg = reg + charlist.charCodeAt(i);
            }
        }
        reg = new RegExp(reg);
    }

    for (i = 0; i <= l-1; i++) {
        c = str.charCodeAt(i);
        if ((c<91&&c>64)||(c<123&&c>96)||c == 45||c == 39||(reg && reg.test(c))) {
            if(tmpStr == "" && format == 2) {
                aC = i;
            }
            tmpStr = tmpStr + String.fromCharCode(c);
        } else {
            if(tmpStr != "") {
                if (format != 2) {
                    wArr[wArr.length] = tmpStr;
                } else {
                    assArr[aC] = tmpStr;
                }
                tmpStr = "";
                wC++;
            }
        }
    }
    
    if (!format) {
        return wC;
    } else if (format == 1) {
        return wArr;
    } else if (format == 2) {
        return assArr;
    }
    throw 'You have supplied an incorrect format';
}