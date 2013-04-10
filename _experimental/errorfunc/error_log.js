function error_log (message, message_type, destination, extra_headers) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paul Hutchinson (http://restaurantthing.com/)
    // +   revised by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: The dependencies, mail(), syslog(), and file_put_contents()
    // %          note 1: are either not fullly implemented or implemented at all
    // -    depends on: mail
    // -    depends on: syslog
    // -    depends on: file_put_contents
    // *     example 1: error_log('Oops!');
    // *     returns 1: true

    var that = this,
        _sapi = function () { // SAPI logging (we treat console as the "server" logging; the
                                            // syslog option could do so potentially as well)
            if (!that.window.console || !that.window.console.log) {
                return false;
            }
            that.window.console.log(message);
            return true;
        };
    message_type = message_type || 0;

    switch(message_type) {
        case 1: // Email
            var subject = 'PHP error_log message'; // Apparently no way to customize the subject
            return this.mail(destination, subject, message, extra_headers);
        case 2: // No longer an option in PHP, but had been to send via TCP/IP to 'destination' (name or IP:port)
            // use socket_create() and socket_send()?
            return false;
        case 0: // syslog or file depending on ini
            var log = this.php_js && this.php_js.ini && this.php_js.ini.error_log && this.php_js.ini.error_log.local_value;
            if (!log) {
                return _sapi();
            }
            if (log === 'syslog') {
                return this.syslog(4, message); // presumably 'LOG_ERR' (4) is correct?
            }
            destination = log;
            // Fall-through
        case 3: // File logging
            var ret = this.file_put_contents(destination, message, 8); // FILE_APPEND (8)
            return ret === false ? false : true;
        case 4: // SAPI logging
            return _sapi();
        default: // Unrecognized value
            return false;
    }
    return false; // Shouldn't get here
}
