(function(w, undefined) {
	var lifetime = 1800, //in seconds
		path = undefined,
		domain = undefined,
		secure = undefined,
		sid = 'JSSESSID';
	
	/**
	* Check for a PHPSESSID. If found unpack it from the cookie
	* If not found, create it then pack everything in $_SESSION 
	* into a cookie.
	*/
	w.session_start = function() {
		var cookie = w.getcookie(sid);
		if(!cookie || cookie == "null") {
			w.$_SESSION = {};
			w.session_set_cookie(sid, w.serialize(w.$_SESSION), lifetime, path, domain, secure);
		} else {
			w.$_SESSION = w.unserialize(w.urldecode(w.getcookie(sid)));
		}
	};
	
	/**
	* Bundle all session destroying functions (they all do the same thing)
	* Resets the global $_SESSION and sets the cookie to null
	*/
	w.session_unset = w.session_destroy = w.session_unregister = function() {
		w.$_SESSION = null;
		w.session_set_cookie(sid,null);
	};
	
	/**
	* Updates the session cookie data with $_SESSION
	*/
	w.session_update = function() {
		w.session_set_cookie(sid, w.serialize(w.$_SESSION), lifetime, path, domain, secure);
	};
	
	/**
	* Update the params of the cookie
	*/
	w.session_set_cookie_params = function(l, p, d, s) {
		lifetime = l;
		path = p;
		domain = d;
		secure = !!s; //make sure bool
	};
	
	/**
	* Get value of a cookie
	*/
	w.getcookie = function(name) {
		var cookies = document.cookie.split(';'),i=0,l=cookies.length,
			current;
		for(;i<l;i++) {
			current = cookies[i].split('=');
			current[0] = current[0].replace(/\s+/,"");
			if(current[0] === name) return current[1];
		}
		return undefined;
	};
	
	w.session_set_cookie = function(name, value, expires, path, domain, secure) {
		if(expires) {
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
	
	/**
	* Encode string in session format (serialized then url encoded)
	*/
	w.session_encode = function() {
		return w.urldecode(w.getcookie(sid));
	}
	
	/**
	* Decode string from session format
	*/
	w.session_decode = function(str) {
		return w.unserialize(w.urldecode(str));
	}
})(window);