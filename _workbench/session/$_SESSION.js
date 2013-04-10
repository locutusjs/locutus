function $_SESSION() {
    // http://kevin.vanzonneveld.net
    // +   original by: Louis Stowasser
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: serialize
    // -    depends on: urlencode
    // *     example 1:
    // *     returns 1:

    //* Bundle all session destroying functions (they all do the same thing)
    //* Resets the global $_SESSION and sets the cookie to null
    var session_set_cookie = function (name, value, expires, path, domain, secure) {
        if (expires) {
            expires = (new Date((new Date).getTime() + expires * 3600)).toGMTString();
        }

        var r = [name + '=' + t.urlencode(value)], s = {}, i = '';
        s = {expires: expires, path: path, domain: domain};
        for (var i in s) {
            if (s.hasOwnProperty(i)) { // Exclude items on Object.prototype
                s[i] && r.push(i + '=' + s[i]);
            }
        }

        return secure && r.push('secure'), document.cookie = r.join(";"), true;
    };

  /**
    * Updates the session cookie data with $_SESSION
    */
    var lifetime = 1800, t = this; // in seconds
    return session_set_cookie('JSSESSID', t.serialize(t.$_SESSION), lifetime, path, domain, secure);
}

function session_update() {
    // -    depends on: setcookie
	this.setcookie('JSSESSID', this.serialize($_SESSION));
}
