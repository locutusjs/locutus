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

function session_unregister () {
    //* Bundle all session destroying functions (they all do the same thing)
    //* Resets the global $_SESSION and sets the cookie to null
    function session_set_cookie (name, value, expires, path, domain, secure) {
        if (expires) {
            expires = (new Date((new Date).getTime() + expires * 3600)).toGMTString();
        }
     
        var r = [name + '=' + w.urlencode(value)], s = {}, i = '';
        s = {expires: expires, path: path, domain: domain};
        for (var i in s) {
            if (s.hasOwnProperty(i)) { // Exclude items on Object.prototype
                s[i] && r.push(i + '=' + s[i]);
            }
        }
        
        return secure && r.push('secure'), w.document.cookie = r.join(";"), true;
    }

    var t = this;
    t.$_SESSION = null;
	// t.setcookie('JSSESSID', null);
    t.session_set_cookie('JSSESSID', null);
}