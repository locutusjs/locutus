function intval (mixed_var, base) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: stensi
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: intval('Kevin van Zonneveld');
    // *     returns 1: 0
    // *     example 2: intval(4.2);
    // *     returns 2: 4
    // *     example 3: intval(42, 8);
    // *     returns 3: 42
    // *     example 4: intval('09');
    // *     returns 4: 9

    var tmp;

    var type = typeof( mixed_var );

    if (type == 'boolean'){
        if (mixed_var == true) {
            return 1;
        } else {
            return 0;
        }
    } else if (type == 'string'){
        tmp = parseInt(mixed_var * 1, 10);
        if (isNaN(tmp) || !isFinite(tmp)){
            return 0;
        } else{
            return tmp.toString(base || 10);
        }
    } else if (type == 'number' && isFinite(mixed_var) ){
        return Math.floor(mixed_var);
    } else{
        return 0;
    }
}