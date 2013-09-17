function session_register () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Deprecated in PHP
    // *     example 1: session_register('someVarName');
    // *     returns 1: true

    var name = '', obj = this.$_SESSION ? this : window; // Allow storage on the namespaced object

    if (!this.$_SESSION && !window.$_SESSION) {
        window.$_SESSION = {};
    }

    for (var i = 0, argc = arguments.length; i < argc; i++) {
        if (typeof arguments[i] !== 'string') {
            this.session_register(arguments[i]); // Probably an array
        }
        else {
            name = arguments[i];
            obj.$_SESSION[name] = window[name];
        }
    }
    return true;
}
