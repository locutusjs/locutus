function $_COOKIE (name) {
    // http://kevin.vanzonneveld.net
    // +   original by: http://www.quirksmode.org/js/cookies.html
    // +   improved by: Steve
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: document.cookie = 'test=hello';
    // *     example 1: var $myVar = $_COOKIE('test'); // Note the round brackets!
    // *     returns 1: 'hello'

    var i = 0, c = '', nameEQ = name + '=',
        ca = document.cookie.split(';'),
        cal = ca.length;
    for (i = 0; i < cal; i++) {
        c = ca[i].replace(/^ */, '');
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.slice(nameEQ.length).replace(/\+/g, '%20'));
        }
    }
    return null;
}
