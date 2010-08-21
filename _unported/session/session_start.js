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
		$_SESSION = this.unserialize(urldecode(getcookie('JSSESSID')));
	}
}

function session_update() {
	this.setcookie('JSSESSID', this.serialize($_SESSION));
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