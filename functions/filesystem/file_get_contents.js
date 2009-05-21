function file_get_contents( url ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Legaev Andrey
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes. 
    // %        note 1: To avoid browser blocking issues's consider using jQuery's: $('#divId').load('http://url') instead.
    // %        note 2: flags, context, offset, maxLen arguments not implemented
    // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    // Note: could also be made to optionally add to global $http_response_header as per http://php.net/manual/en/reserved.variables.httpresponseheader.php

    var tmp, headers = [], newTmp = [], k=0, i=0, href = '', pathPos = -1;
    var func = function (value) { return value.substring(1) !== ''; };
    var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {throw new Error('XMLHttpRequest not supported');}

    if (!/^https?:/.test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
        href = this.window.location.href;
        pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8)-1 : href.lastIndexOf('/');
        url = href.slice(0, pathPos+1)+url;
    }
    
    req.open("GET", url, false);
    req.send(null);

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
    
    return req.responseText;
}