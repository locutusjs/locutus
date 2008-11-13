function echo ( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: echo is bad
    // +   improved by: Nate
    // %        note 1: There are a few unsolved issues with this function. Summarizing:
    // %        note 1: converts all the special characters (e.g. tags) to HTML entities, 
    // %        note 1: thus reducing the usability of HTML formatting in echo().
    // %        note 1: 
    // %        note 1: InnerHTML() is better because it works (and it's fast),   
    // %        note 1: but using innerHTML on the BODY is very dangerous because
    // %        note 1: you will break all references to HTMLElements that were done before
    // %        note 1: 
    // %        note 1: There's no good place for a package like http://innerdom.sourceforge.net/
    // %        note 1: inside php.js
    // %        note 1:
    // *     example 1: echo('Hello', 'World');
    // *     returns 1: null
    
    var arg = '', argc = arguments.length, argv = arguments, i = 0;
    var bodies = [], body, elmt;
    
    // .shift() does not work to get first item in bodies
    bodies = document.getElementsByTagName("body");
    if (!bodies || ! bodies[0]) {
        return false;
    }
    body   = bodies[0];
    
    for (i = 0; i < argc; i++ ) {
        arg = argv[i];
        if (document.createDocumentFragment && document.createTextNode && document.appendChild) {
            var docFragment = document.createDocumentFragment();
            var txt = document.createTextNode(aarg);
            docFragment.appendChild(txt);
            document.body.appendChild(docFragment);
        } else if (document.write) {
            document.write(arg);
        } else {
            print(arg);
        }
    }
    
    return null;
}