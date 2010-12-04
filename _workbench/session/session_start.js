function session_start() {
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
    function session_set_cookie (name, value, expires, path, domain, secure) {
        if (expires) {
            expires = (new Date((new Date).getTime() + expires * 3600)).toGMTString();
        }
     
        var r = [name + '=' + w.urlencode(value)], s = {}, i = '';
        s = {expires: expires, path: path, domain: domain};
        for (i in s) {
            if (s.hasOwnProperty(i)) { // Exclude items on Object.prototype
                s[i] && r.push(i + '=' + s[i]);
            }
        }
        
        return secure && r.push('secure'), w.document.cookie = r.join(";"), true;
    }

    var sid = 'JSSESSID', t = this;
    var cookie = this.getcookie(sid);
    if(!cookie || cookie == "null") {
        t.$_SESSION = {};
        t.session_set_cookie(sid, t.serialize(t.$_SESSION), lifetime, path, domain, secure);
    } else {
        t.$_SESSION = t.unserialize(t.urldecode(t.getcookie(sid)));
    }
}



function getcookie(name) {
	var cookies = document.cookie.split(';'),i=0,l=cookies.length,
		current;
	for(;i<l;i++) {
		current = cookies[i].split('=');
		if(current[0] === name) return current[1];
	}
	return undefined;
}