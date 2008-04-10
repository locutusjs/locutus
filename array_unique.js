function array_unique( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Carlos R. L. Rodrigues
    // *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld']);
    // *     returns 1: true

    var p, i, j;
    for(i = array.length; i;){
        for(p = --i; p > 0;){
            if(array[i] === array[--p]){
                for(j = p; --p && array[i] === array[p];);
                i -= array.splice(p + 1, j - p).length;
            }
        }
    }

    return true;
}