function session_start() {
    // http://kevin.vanzonneveld.net
    // +   original by: Louis Stowasser
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: 
    // *     returns 1: 

	/**
	* Check for a PHPSESSID. If found unpack it from the cookie
	* If not found, create it then pack everything in $_SESSION 
	* into a cookie.
	*/
	if(document.cookie.indexOf('JSSESSID=') === -1) {
		$_SESSION = {};
		this.setcookie('JSSESSID', this.serialize($_SESSION));
	} else {
		$_SESSION = this.unserialize(this.urldecode(this.getcookie('JSSESSID')));
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
    // -    depends on: getcookie
    // *     example 1: 
    // *     returns 1: 

    //* Bundle all session destroying functions (they all do the same thing)
    //* Resets the global $_SESSION and sets the cookie to null
    var t = this;
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

    var sid = 'JSSESSID', this.php_js = this.php_js || {}, pj = this.php_js;
    var cookie = this.getcookie(sid);
    if(!cookie || cookie == "null") {
        t.$_SESSION = {};
        return session_set_cookie(sid, t.serialize(t.$_SESSION), pj.lifetime, pj.path, pj.domain, pj.secure);
    }
    t.$_SESSION = t.unserialize(t.urldecode(t.getcookie(sid)));
    return true;
}
