function $_SESSION() {
    /**
    * Updates the session cookie data with $_SESSION
    */
    var lifetime = 1800; //in seconds
    w.session_set_cookie('JSSESSID', w.serialize(w.$_SESSION), lifetime, path, domain, secure);
}

function session_update() {
	this.setcookie('JSSESSID', this.serialize($_SESSION));
}
