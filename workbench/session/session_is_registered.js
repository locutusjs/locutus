function session_is_registered (name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Deprecated in PHP
    // *     example 1: session_is_registered('someUnregisteredGlobalVarName');
    // *     returns 1: false

    var obj = this.$_SESSION ? this : window; // Can be stored on the namespaced object
    return !!(obj.$_SESSION) && typeof obj.$_SESSION[name] !== 'undefined';
}
