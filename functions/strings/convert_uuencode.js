function convert_uuencode(data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ole Vrijenhoek
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: convert_uuencode("test\ntext text\r\n");
    // *     returns 1: '0=&5S=`IT97AT('1E>'0-"@``'

    var c = "";
    var a = 0;
    var newStr = "";
    var i = 0;

    for (i = 0; i < data.length-1; i++) {
        c += "0" + data.charCodeAt(i).toString(2);
    }
    for (i = 0; i < (c.length/6)-1; i++) {
        newStr += String.fromCharCode(parseInt(c.substr(a, 6), "2")+32);
        a += 6;
    }

    return newStr;
}