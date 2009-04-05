function substr_replace (str, replace, start, length) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// *     example 1: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
	// *     returns 1: 'bob'
	// *     example 2: $var = 'ABCDEFGH:/MNRPQR/';
	// *     example 2: substr_replace($var, 'bob', 0, $var.length);
	// *     returns 2: 'bob'
	// *     example 3: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
	// *     returns 3: 'bobABCDEFGH:/MNRPQR/'
	// *     example 4: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
	// *     returns 4: 'ABCDEFGH:/bob/'
	// *     example 5: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
	// *     returns 5: 'ABCDEFGH:/bob/'
	// *     example 6: 'substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)'
	// *     returns 6: 'ABCDEFGH://'

    var i=0, j=0, outStr='';

    if (start < 0) { // start position in str
        start = start + str.length;
    }
    length = length !== undefined ? length : str.length;
    if (length < 0) {
        length = length + str.length - start;
    }
    for (i=start; i < start+length; i++) { //
        if (replace[j] !== undefined) {
            outStr += replace[j++];
        }
    }
    return str.slice(0, start)+outStr+replace.slice(j)+str.slice(i);
}