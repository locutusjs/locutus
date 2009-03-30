function printf( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Michael White (http://getsprink.com)
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // -    depends on: sprintf
    // *     example 1: printf("%01.2f", 123.1);
    // *     returns 1: 6

    var body, elmt;
    var ret = '';
    
    var HTMLNS = 'http://www.w3.org/1999/xhtml';
    body = document.getElementsByTagNameNS ?
      (document.getElementsByTagNameNS(HTMLNS, 'body')[0] ?
        document.getElementsByTagNameNS(HTMLNS, 'body')[0] :
        document.documentElement.lastChild) :
      document.getElementsByTagName('body')[0];

    if (!body) {
        return false;
    }
    
    ret = sprintf.apply(this, arguments);

    elmt = document.createTextNode(ret);
    body.appendChild(elmt);
    
    return ret.length;
}