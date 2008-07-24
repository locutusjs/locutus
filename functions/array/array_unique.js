function array_unique( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      input by: duncan
    // +    bufixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
    // *     returns 1: ['Kevin','van','Zonneveld']

    var p, i, j, tmp_arr = array;
    for(i = tmp_arr.length; i;){
        for(p = --i; p > 0;){
            if(tmp_arr[i] === tmp_arr[--p]){
                for(j = p; --p && tmp_arr[i] === tmp_arr[p];);
                i -= tmp_arr.splice(p + 1, j - p).length;
            }
        }
    }

    return tmp_arr;
}