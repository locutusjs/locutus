function session_unregister (name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Deprecated in PHP
    // *     example 1: session_unregister('someVarName');
    // *     returns 1: true

    var obj = this.$_SESSION ? this : window; // Allow storage on the namespaced object
    if (obj.$_SESSION) {
        delete obj.$_SESSION[name];
    }
    return true;
}