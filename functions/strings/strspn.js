function strspn(str1, str2){
    // http://kevin.vanzonneveld.net
    // +   original by: Valentina De Rosa
    // %        note 1: Good start, but still missing the 3rd & 4th argument which came to PHP in version 4.3.0
    // *     example 1: strspn('42 is the answer, what is the question ...', '1234567890');
    // *     returns 1: 2

    var found;
    var stri;
    var strj;
    var j = 0;
    var i = 0;

    for(i = 0; i < str1.length; i++){
        found = 0;
        stri  = str1.substring(i,i+1);
        for (j = 0; j <= str2.length; j++) {
            strj = str2.substring(j,j+1);
            if (stri == strj) {
                found = 1;
                break;
            }
        }
        if (found != 1) {
            return i;
        }
    }

    return i;
}