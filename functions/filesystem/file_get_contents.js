function file_get_contents( url, flags, context, offset, maxLen ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Legaev Andrey
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes. 
    // %        note 1: To avoid browser blocking issues's consider using jQuery's: $('#divId').load('http://url') instead.
    // %        note 2: The context argument is only implemented for http, and only partially (see below for
    // %        note 2: "Presently unimplemented HTTP context options")
    // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    // Note: could also be made to optionally add to global $http_response_header as per http://php.net/manual/en/reserved.variables.httpresponseheader.php

    var tmp, headers = [], newTmp = [], k=0, i=0, href = '', pathPos = -1, flagNames = '', content = null;
    var func = function (value) { return value.substring(1) !== ''; };

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    context = context || this.php_js.default_streams_context || null;

    if (!flags) {flags = 0;}
    var OPTS = {
        PHP_FILE_USE_INCLUDE_PATH : 1,
        PHP_FILE_TEXT : 32,
        PHP_FILE_BINARY : 64
    };
    if (typeof flags === 'number') { // Allow for a single string or an array of string flags
        flagNames = flags;
    }
    else {
        flags = [].concat(flags);
        for (i=0; i < flags.length; i++) {
            if (OPTS[flags[i]]) {
                flagNames = flagNames | OPTS[flags[i]];
            }
        }
    }
    
    if ((flagNames & OPTS.PHP_FILE_USE_INCLUDE_PATH) && this.php_js.ini.include_path &&
            this.php_js.ini.include_path.local_value) {
        var slash = this.php_js.ini.include_path.local_value.indexOf('/') !== -1 ? '/' : '\\';
        url = this.php_js.ini.include_path.local_value+slash+url;
    }
    else if (!/^https?:/.test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
        href = this.window.location.href;
        pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8)-1 : href.lastIndexOf('/');
        url = href.slice(0, pathPos+1)+url;
    }

    var http_options = context.stream_options && context.stream_options.http;
    var http_stream = !!http_options;

    if (!context || http_stream) {
        var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
        if (!req) {throw new Error('XMLHttpRequest not supported');}

        var method = http_stream ? http_options.method : 'GET';

        req.open(method, url, false);

        if (http_stream) {
            var sendHeaders = http_options.header && http_options.header.split(/\r?\n/);
            var userAgentSent = false;
            for (i=0; i < sendHeaders.length; i++) {
                var sendHeader = sendHeaders[i];
                var breakPos = sendHeader.search(/:\s*/);
                var sendHeaderName = sendHeader.substring(0, breakPos);
                req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos+1));
                if (sendHeaderName === 'User-Agent') {
                    userAgentSent = true;
                }
            }
            if (!userAgentSent) {
                var user_agent = http_options.user_agent ||
                                                                    (this.php_js.ini.user_agent && this.php_js.ini.user_agent.local_value);
                if (user_agent) {
                    req.setRequestHeader('User-Agent', user_agent);
                }
            }
            content = http_options.content || null;
            /*
            // Presently unimplemented HTTP context options
            var request_fulluri = http_options.request_fulluri || false; // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.
            var max_redirects = http_options.max_redirects || 20; // The max number of redirects to follow. Value 1 or less means that no redirects are followed.
            var protocol_version = http_options.protocol_version || 1.0; // HTTP protocol version
            var timeout = http_options.timeout || (this.php_js.ini.default_socket_timeout && this.php_js.ini.default_socket_timeout.local_value); // Read timeout in seconds, specified by a float
            var ignore_errors = http_options.ignore_errors || false; // Fetch the content even on failure status codes.
            */
        }
        // We should probably change to an || "or", in order to have binary as the default (as it is in PHP), but this method might not be well-supported; check for its existence instead or will this be to much trouble?
        if (flagNames & OPTS.PHP_FILE_BINARY && !(flagNames & OPTS.PHP_FILE_TEXT)) { // These flags shouldn't be together
            req.sendAsBinary(); // In Firefox, only available FF3+
        }
        else {
            req.send(content);
        }

        tmp = req.getAllResponseHeaders();
        tmp = tmp.split('\n');
        for (k=0; k < tmp.length; k++) {
            if (func(tmp[k])) {
                newTmp.push(tmp[k]);
            }
        }
        tmp = newTmp;
        for (i=0; i < tmp.length; i++) {
            headers[i] = tmp[i];
        }
        this.$http_response_header = headers; // see http://php.net/manual/en/reserved.variables.httpresponseheader.php

        if (offset || maxLen) {
            if (maxLen) {
                return req.responseText.substr(offset || 0, maxLen);
            }
            return req.responseText.substr(offset);
        }
        return req.responseText;
    }
    return false;
}