function parse_str(str, array){
    // http://kevin.vanzonneveld.net
    // +   original by: Cagri Ekin
    // +   improved by: Michael White (http://getsprink.com)
    // *     example 1: parse_str('first=foo&second=bar');
    // *     returns 1: { first: 'foo', second: 'bar' }
    // *     example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.');
    // *     returns 2: { str_a: "Jack and Jill didn't see the well." }

    var glue1 = '=';
    var glue2 = '&';

    var array2 = str.split(glue2);
    var array3 = [];
    for(var x=0; x<array2.length; x++){
        var tmp = array2[x].split(glue1);
        array3[unescape(tmp[0])] = unescape(tmp[1]).replace(/[+]/g, ' ');
    }

    if(array){
        array = array3;
    } else{
        return array3;
    }
}