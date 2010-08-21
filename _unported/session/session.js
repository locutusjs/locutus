(function(w, undefined) {
	var lifetime = 1800, //in seconds (30 minutes)
		path = '/',
		domain = '',
		secure = false,
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
			w.setcookie('JSSESSID', w.serialize(w.$_SESSION), lifetime, path, domain, secure);
		} else {
			w.$_SESSION = w.unserialize(w.urldecode(w.getcookie('JSSESSID')));
		}
	};
	
	/**
	* Bundle all session destroying functions (they all do the same thing)
	* Resets the global $_SESSION and sets the cookie to null
	*/
	w.session_unset = w.session_destroy = w.session_unregister = function() {
		w.$_SESSION = null;
		w.setcookie('JSSESSID',null);
	};
	
	/**
	* Updates the session cookie data with $_SESSION
	*/
	w.session_update = function() {
		w.setcookie('JSSESSID', w.serialize(w.$_SESSION));
	};
	
	/**
	* Update the params of the cookie
	*/
	w.session_set_cookie_params = function(l, p, d, s) {
		lifetime = l;
		path = p;
		domain = d;
		secure = s;
	};
	
	/**
	* Get value of a cookie
	*/
	w.getcookie = function(name) {
		var cookies = document.cookie.split(';'),i=0,l=cookies.length,
			current;
		for(;i<l;i++) {
			current = cookies[i].split('=');
			if(current[0] === name) return current[1];
		}
		return undefined;
	};
	
	/**
	* Encode string in session format (serialized then url encoded)
	*/
	w.session_encode = function(str) {
		return w.urldecode(w.getcookie('JSSESSID'));
	}
	
	/**
	* Decode string from session format
	*/
	w.session_decode = function(str) {
		return w.unserialize(w.urldecode(str));
	}
})(window);