function comparer(result, should){

    var valid = [1, 'OK'];

    if( result === null || result === false || result === undefined ){
        if(result != should){
            return [-3, 'Got nothing'];
        }
    } else if( result.constructor === Array || result.constructor === Object ){
        for (key in result){
            // recurse
            subres = comparer(result[key], should[key]);
            if(subres[0] < 1){
                return [subres[0], subres[1]];
            }
        }
    } else{
        if(should != result){
            return [-99, 'General mismatch'];
        }
    }

    return valid;
}