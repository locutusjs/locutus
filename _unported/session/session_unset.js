function session_unset () {
    $_SESSION = {};
	this.setcookie('JSSESSID',null);
}