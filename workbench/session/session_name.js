function session_name (name) {
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: session_name('aNewSess');
    // *     returns 1: 'PHPSESSID'

    if (name && ((/^\d+$/).test(name) || !(/^[a-zA-Z0-9]+$/).test(name))) { // if underscore ok, use \W; if need one letter, must it be at beginning?
        throw 'Session name must consist of alphanumeric characters only (and at least one letter)';
    }
    var oldSessionName = '';

    // BEGIN REDUNDANT
    if (!this.php_js) {
        this.php_js = {};
    }
    if (!this.php_js.ini) {
        this.php_js.ini = {};
    }
    if (!this.php_js.ini['session.name']) {
        this.php_js.ini['session.name'] = {};
    }
    // END REDUNDANT

    if (this.php_js.ini['session.name'].local_value) {
        oldSessionName = this.php_js.ini['session.name'].local_value;
    }

    if (name) {
        this.php_js.ini['session.name'].local_value = name;
    }
    return oldSessionName || 'PHPSESSID';
}
