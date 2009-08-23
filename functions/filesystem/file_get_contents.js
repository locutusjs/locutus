function file_get_contents (url, flags, context, offset, maxLen) {
    // Read the entire file into a string
    //
    // version: 906.111
    // discuss at: http://phpjs.org/functions/file_get_contents
    // +   original by: Legaev Andrey
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Raphael (Ao) RUDLER
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain without modifications.
    // %        note 2: Synchronous by default (as in PHP) so may lock up browser. Can
    // %        note 2: get async by setting a custom "phpjs.async" property to true and "notification" for an
    // %        note 2: optional callback (both as context params, with responseText, and other JS-specific
    // %        note 2: request properties available via 'this'). Note that file_get_contents() will not return the text
    // %        note 2: in such a case (use this.responseText within the callback). Or, consider using
    // %        note 2: jQuery's: $('#divId').load('http://url') instead.
    // %        note 3: The context argument is only implemented for http, and only partially (see below for
    // %        note 3: "Presently unimplemented HTTP context options"); also the arguments passed to
    // %        note 3: notification are incomplete
    // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'
    // Note: could also be made to optionally add to global $http_response_header as per http://php.net/manual/en/reserved.variables.httpresponseheader.php

    var tmp, headers = [], newTmp = [], k=0, i=0, href = '', pathPos = -1, flagNames = '', content = null, http_stream = false;
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
    else if (!/^(https?|file):/.test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
        href = this.window.location.href;
        pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8)-1 : href.lastIndexOf('/');
        url = href.slice(0, pathPos+1)+url;
    }

    if (context) {
        var http_options = context.stream_options && context.stream_options.http;
        http_stream = !!http_options;
    }

    if (!context || http_stream) {
        var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
        if (!req) {throw new Error('XMLHttpRequest not supported');}

        var method = http_stream ? http_options.method : 'GET';
        var async = !!(context && context.stream_params && context.stream_params['phpjs.async']);
        
        if (this.php_js.ini['phpjs.ajaxBypassCache'] && this.php_js.ini['phpjs.ajaxBypassCache'].local_value) {
            url += (url.match(/\?/) == null ? "?" : "&") + (new Date()).getTime(); // Give optional means of forcing bypass of cache
        }
        
        req.open(method, url, async);
        if (async) {
            var notification = context.stream_params.notification;
            if (typeof notification === 'function') {
                req.onreadystatechange = function (aEvt) { // aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent

// Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials; overrideMimeType()
/*
PHP Constants:
STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.
STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.
STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.
STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.
STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.
STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .
STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.
STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.
STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.
STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).

STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.
STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.
STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.
*/

                    var objContext = {}; // properties are not available in PHP, but offered on notification via 'this' for convenience
                    objContext.responseText = req.responseText;
                    objContext.responseXML = req.responseXML;
                    objContext.status = req.status;
                    objContext.statusText = req.statusText;
                    objContext.readyState = req.readyState;
                    objContext.evt = aEvt;

                    // notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')
                    // Need to add message, etc.
                    var bytes_transferred;
                    switch (req.readyState) {
                        case 0: //     UNINITIALIZED     open() has not been called yet.
                            notification.call(objContext, 0, 0, '', 0, 0, 0);
                            break;
                        case 1: //     LOADING     send() has not been called yet.
                            notification.call(objContext, 0, 0, '', 0, 0, 0);
                            break;
                        case 2: //     LOADED     send() has been called, and headers and status are available.
                            notification.call(objContext, 0, 0, '', 0, 0, 0);
                            break;
                        case 3: //     INTERACTIVE     Downloading; responseText holds partial data.
                            bytes_transferred = Math.floor(req.responseText.length/2); // Two characters for each byte
                            notification.call(objContext, 7, 0, '', 0, bytes_transferred, 0);
                            break;
                        case 4: //     COMPLETED     The operation is complete.
                            if (req.status >= 200 && req.status < 400) {
                                bytes_transferred = Math.floor(req.responseText.length/2); // Two characters for each byte
                                notification.call(objContext, 8, 0, '', req.status, bytes_transferred, 0);
                            }
                            else if (req.status === 403) { // Fix: These two are finished except for message
                                notification.call(objContext, 10, 2, '', req.status, 0, 0);
                            }
                            else { // Errors
                                notification.call(objContext, 9, 2, '', req.status, 0, 0);
                            }
                            break;
                        default:
                            throw 'Unrecognized ready state for file_get_contents()';
                    }
                }
            }
        }

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
            req.sendAsBinary(content); // In Firefox, only available FF3+
        }
        else {
            req.send(content);
        }

        tmp = req.getAllResponseHeaders();
        if (tmp) {
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
        }

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