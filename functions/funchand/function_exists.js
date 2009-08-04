function function_exists (function_name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Steve Clay
    // +   improved by: Legaev Andrey
    // *     example 1: function_exists('isFinite');
    // *     returns 1: true


    if (typeof function_name == 'string'){
        return (typeof this.window[function_name] == 'function');
    } else{
        return (function_name instanceof Function);
    }
}