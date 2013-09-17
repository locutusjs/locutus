function header (hdr, replace, http_response_code) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %    note 1: This is only for server-side JavaScript use and has not been fully tested
    // *     example 1: header('Content-type: text/plain');
    // *     returns 1: undefined

    var semi = hdr.indexOf(':');
    var prop = hdr.slice(0, semi);
    var value = hdr.slice(semi+1).replace(/^\s+/, '');

    if (window.addHeader) { // old SSJS 1.2
        // See http://research.nihonsoft.org/javascript/ServerReferenceJS12/index.htm
        window.addHeader(prop, value);
    }
    else if (Jaxer && Jaxer.response && Jaxer.response.addHeader) {
        // See http://jaxer.org/api/
        Jaxer.response.addHeader(prop, value);
    }
    else {
        throw 'You must use a server-side implementation of JavaScript which supports addHeader';
    }
}
