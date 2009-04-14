function __FILE__() {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://getsprink.com/)
    // %        note 1: Not really a function, so in experimental
    // %        note 1: Not really a function, so in experimental
    // %        note 2: It will probably need a bit of work to make it fully
    // %        note 2: cross-browser but I tested it in FF3 and Safari 3 on
    // %        note 2: mac os x.
    // %        note 3: If the function thinks it is in the original HTML
    // %        note 3: document then the URL stored in window.location.href
    // %        note 3: is used. There might be a better choice for this.
    // *     example 1: __FILE__();
    // *     returns 1: ''

    var t = document.getElementsByTagName('script');
    var url = t[t.length-1];

    if ("src" in url && url.src != '') {
        return url.src;
    } else {
        return window.location.href;
    }
}
