function empty( mixed_var ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // +      input by: Onno Marsman
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: empty(null);
    // *     returns 1: true
    // *     example 2: empty(undefined);
    // *     returns 2: true
    // *     example 3: empty([]);
    // *     returns 3: true
    
    if (mixed_var === "" 
        || mixed_var === 0   
        || mixed_var === "0"
        || mixed_var === null  
        || mixed_var === false
        || mixed_var === undefined    
        || ((typeof mixed_var == 'array' || typeof mixed_var == 'object') && mixed_var.length === 0) ){
        return true;
    }
    
    return false;
}