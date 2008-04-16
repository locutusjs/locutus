function array_shift( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_shift(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin'

    var i=0, first_elm=null, cnt=0, tmp_arr = {};

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Object) || !array.length ){
        return null;
    }

    if( array.constructor === Array ){
        first_elm = array[0];
        for( i = 0; i < array.length; i++ ){
            array[i] = array[i+1];
        }
        array.length--;
    } else if( array.constructor === Object ){
        for(var key in array){
            if( cnt == 0 ){
                first_elm = array[key];
            } else{
                tmp_arr[key] = array[key];
            }
            cnt ++;
        }
        array = tmp_arr;
    }

    return first_elm;
}