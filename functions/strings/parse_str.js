function parse_str(str, array){
    // http://kevin.vanzonneveld.net
    // +   original by: Cagri Ekin
    // +   improved by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // %        note 1: Currently does not put variables in local scope.
    // %        note 1: So use of second argument is required.
    // *     example 1: var arr = {};
    // *     example 1: parse_str('first=foo&second=bar', arr);
    // *     results 1: arr == { first: 'foo', second: 'bar' }
    // *     example 2: var arr = {};
    // *     example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);
    // *     results 2: arr == { str_a: "Jack and Jill didn't see the well." }

    var glue1 = '=';
    var glue2 = '&';

    var array2 = (str+'').split(glue2);
    var array2l = 0, tmp = '', x = 0;

    array2l = array2.length;
    for (x = 0; x<array2l; x++) {
        tmp = array2[x].split(glue1);
        array[unescape(tmp[0])] = unescape(tmp[1]).replace(/[+]/g, ' ');
    }
}