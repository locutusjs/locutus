function end(array){
    var last;
    if(Object.prototype.toString.call(array) === "[object Object]" || Object.prototype.toString.call(array) === "[object Array]"){
        for(var i in array){
            last = array[i];
        }
        return last;
    }
    throw "END expected 'array' as an object.";
    return false;
}
