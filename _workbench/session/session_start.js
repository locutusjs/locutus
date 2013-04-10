function session_start() {
    // http://kevin.vanzonneveld.net
    // +   original by: Louis Stowasser
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1:
    // *     returns 1:

    var _getcookie = function (name) {
        var cookies = document.cookie.split(';'),i=0,l=cookies.length,
            current;
        for(;i<l;i++) {
            current = cookies[i].split('=');
    //            current[0] = current[0].replace(/\s+/,"");
            if(current[0] === name) {return current[1];}
        }
        return undefined;
    };
	/**
	* Check for a PHPSESSID. If found unpack it from the cookie
	* If not found, create it then pack everything in $_SESSION
	* into a cookie.
	*/
	if(document.cookie.indexOf('JSSESSID=') === -1) {
		$_SESSION = {};
		this.setcookie('JSSESSID', this.serialize($_SESSION));
	} else {
		$_SESSION = this.unserialize(this.urldecode(_getcookie('JSSESSID')));
	}
}

 /**

    * Check for a PHPSESSID. If found unpack it from the cookie
    * If not found, create it then pack everything in $_SESSION
    * into a cookie.
    */
function session_start () {
    // http://kevin.vanzonneveld.net
    // +   original by: Louis Stowasser
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: unserialize
    // -    depends on: serialize
    // -    depends on: urlencode
    // *     example 1:
    // *     returns 1:

    //* Bundle all session destroying functions (they all do the same thing)
    //* Resets the global $_SESSION and sets the cookie to null
    var t = this;
    var _getcookie = function (name) {
        var cookies = document.cookie.split(';'),i=0,l=cookies.length,
            current;
        for(;i<l;i++) {
            current = cookies[i].split('=');
    //            current[0] = current[0].replace(/\s+/,"");
            if(current[0] === name) {return current[1];}
        }
        return undefined;
    };
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

    var sid = 'JSSESSID';
    this.php_js = this.php_js || {};
    var pj = this.php_js;
    var cookie = _getcookie(sid);
    if(!cookie || cookie == "null") {
        t.$_SESSION = {};
        return session_set_cookie(sid, t.serialize(t.$_SESSION), pj.lifetime, pj.path, pj.domain, pj.secure);
    }
    t.$_SESSION = t.unserialize(t.urldecode(_getcookie(sid)));
    return true;
}
