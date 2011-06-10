function function_exists (function_name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Steve Clay
    // +   improved by: Legaev Andrey
	// +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: function_exists('isFinite');
    // *     returns 1: true

    if (typeof function_name === 'string') {
        function_name = this.window[function_name];
    }
    return typeof function_name === 'function';
}
