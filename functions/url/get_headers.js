function get_headers(url, format) {
    // +   original by: Paulo Ricardo F. Santos
    // +    bugfixed by: Brett Zamir (http://brettz9.blogspot.com)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
    // *     example 1: get_headers('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {
        throw new Error('XMLHttpRequest not supported');
    }
    var tmp, headers, pair, i;

    req.open('HEAD', url, false);
    req.send(null);

    if (req.readyState < 3) {
        return false;
    }

    tmp = req.getAllResponseHeaders();
    tmp = tmp.split('\n');
    tmp = this.array_filter(tmp, function (value) { return value.substring(1) !== ''; });
    headers = format ? {} : [];

    for (i in tmp) {
        if (format) {
            pair = tmp[i].split(':');
            headers[pair.splice(0, 1)] = pair.join(':').substring(1);
        } else {
            headers[headers.length] = tmp[i];
        }
    }

    return headers;
}