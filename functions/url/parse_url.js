function parse_url (str, component) {
    // http://kevin.vanzonneveld.net
    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
    // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: Does not replace invaild characters with '_' as in PHP, nor does it return false with
    // %          note: a seriously malformed URL.
    // %          note: Besides function name, is the same as parseUri besides the commented out portion
    // %          note: and the additional section following, as well as our allowing an extra slash after
    // %          note: the scheme/protocol (to allow file:/// as in PHP)
    // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
    // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}

    var  o   = {
        strictMode: false,
        key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
        q:   {
            name:   "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-protocol to catch file:/// (should restrict this)
        }
    };
    
    var m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    uri = {},
    i   = 14;
    while (i--) {uri[o.key[i]] = m[i] || "";}
    // Uncomment the following to use the original more detailed (non-PHP) script
    /*
        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) {uri[o.q.name][$1] = $2;}
        });
        return uri;
    */

    switch (component) {
        case 'PHP_URL_SCHEME':
            return uri.protocol;
        case 'PHP_URL_HOST':
            return uri.host;
        case 'PHP_URL_PORT':
            return uri.port;
        case 'PHP_URL_USER':
            return uri.user;
        case 'PHP_URL_PASS':
            return uri.password;
        case 'PHP_URL_PATH':
            return uri.path;
        case 'PHP_URL_QUERY':
            return uri.query;
        case 'PHP_URL_FRAGMENT':
            return uri.anchor;
        default:
            var retArr = {};
            if (uri.protocol !== '') {retArr.scheme=uri.protocol;}
            if (uri.host !== '') {retArr.host=uri.host;}
            if (uri.port !== '') {retArr.port=uri.port;}
            if (uri.user !== '') {retArr.user=uri.user;}
            if (uri.password !== '') {retArr.pass=uri.password;}
            if (uri.path !== '') {retArr.path=uri.path;}
            if (uri.query !== '') {retArr.query=uri.query;}
            if (uri.anchor !== '') {retArr.fragment=uri.anchor;}
            return retArr;
    }
}