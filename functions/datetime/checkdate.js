function checkdate2 ( m, d, y ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Pyerre
    // +    revised by: Theriault
    // *     example 1: checkdate(12, 31, 2000);
    // *     returns 1: true
    // *     example 2: checkdate(2, 29, 2001);
    // *     returns 2: false
    // *     example 3: checkdate(03, 31, 2008);
    // *     returns 3: true
    // *     example 4: checkdate(1, 390, 2000);
    // *     returns 4: false
    
    // getDate() will return NaN if y or m were invalid. isNaN will return
    return !(m < 1 || m > 12 || y < 1 || y > 32767 || d < 1 || d > ((new Date(y, m, 0)).getDate() || '') || isNaN(d));

}

function checkdate ( m, d, y ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Pyerre
    // *     example 1: checkdate(12, 31, 2000);
    // *     returns 1: true
    // *     example 2: checkdate(2, 29, 2001);
    // *     returns 2: false
    // *     example 3: checkdate(03, 31, 2008);
    // *     returns 3: true
    // *     example 4: checkdate(1, 390, 2000);
    // *     returns 4: false
    //return !(m<1||m>12||y<1||y>32767||d<1||d>((new Date(y,m,0)).getDate()||'')||isNaN(d));
    return m>0&&m<13&&y>0&&y<32768&&d>0&&d<((new Date(y,m,0)).getDate()+1);
    //return m>=1&&m<=12&&y>=1&&y<=32767&&(((new Date(y,m,0)).getMonth()+1)==m&&d<32);
}