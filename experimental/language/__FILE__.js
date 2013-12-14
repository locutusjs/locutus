function __FILE__() {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://getsprink.com/)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Not a function in PHP, so in experimental
    // %        note 2: It will probably need a bit of work to make it fully
    // %        note 2: cross-browser
    // %        note 3: If the function thinks it is in the original HTML
    // %        note 3: document then the URL stored in this.window.location.href
    // %        note 3: is used. There might be a better choice for this.
    // *     example 1: __FILE__();
    // *     returns 1: 'http://example.com/myfile.js'

    var d = this.window.document;

    var t = d.getElementsByTagName('script');
    if (!t || t.length === 0) {
        t = d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'script');
    }
    var url = t[t.length-1];

    if (url.hasAttribute('src')) { // Let work for XUL as well
        var src = url.getAttribute('src');
        if (src !== '' && /^(https?|chrome):/.test(src)) { // Must be absolute reference
            return src;
        }
    }
    return this.window.location.href;
}
