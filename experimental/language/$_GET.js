function $_GET (name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %     note 1: See import_request_variables() for building a $_GET object which allows the PHP-like bracket access.
    // *     example 1: document.cookie = 'test=hello';
    // *     example 1: var $myVar = $_COOKIE('test'); // Note the round brackets!
    // *     returns 1: 'hello'

    var nameEQ = name + '=',
        url = window.location.href,
        pos = url.indexOf('?'),
        url = url.slice(pos + 1),
        arr = url.split('&'),
        i = 0,
        pair = '',
        arrl = arr.length;
    for (i = 0; i < arrl; i++) {
        var pair = arr[i];
        if (pair.indexOf(nameEQ) === 0) {
            return decodeURIComponent(pair.slice(nameEQ.length).replace(/\+/g, '%20'));
        }
    }
    return null;
}
