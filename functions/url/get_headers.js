function get_headers(url, format) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Ricardo F. Santos
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
    // *     example 1: get_headers('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'
    
    var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) throw new Error('XMLHttpRequest not supported');
    var tmp, headers, pair, i;

    req.open('HEAD', url, false);
    req.send(null);


    if (req.readyState < 3) {
        return false;
    }

    tmp     = req.getAllResponseHeaders();
    tmp     = tmp.split('\n');
    headers = {0 : req.status + ' ' + req.statusText};

    for (i in tmp) {
        pair = tmp[i].split(':', 2);
        headers[(format) ? pair[0] : headers.length] = (pair[1]+'').replace(/^\s+|\s+$/g, '');
    }

    return headers;
}