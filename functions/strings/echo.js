function echo ( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: echo is bad
    // +   improved by: Nate
    // +    revised by: Der Simon (http://innerdom.sourceforge.net/)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Eugene Bulkin (http://doubleaw.com/)
    // +   input by: JB
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: If browsers start to support DOM Level 3 Load and Save (parsing/serializing),
    // %        note 1: we wouldn't need any such long code (even most of the code below). See
    // %        note 1: link below for a cross-browser implementation in JavaScript. HTML5 might
    // %        note 1: possibly support DOMParser, but that is not presently a standard.
    // %        note 2: Although innerHTML is widely used and may become standard as of HTML5, it is also not ideal for
    // %        note 2: use with a temporary holder before appending to the DOM (as is our last resort below),
    // %        note 2: since it may not work in an XML context
    // %        note 3: Using innerHTML to directly add to the BODY is very dangerous because it will
    // %        note 3: break all pre-existing references to HTMLElements.
    // %        note 4: Must use well-formed XML/XHTML, including use of the XHTML namespace.
    // *     example 1: echo('<div xmlns="http://www.w3.org/1999/xhtml"><p>abc</p><p>abc</p></div>');
    // *     returns 1: undefined
    
    var arg = '', argc = arguments.length, argv = arguments, i = 0;
    var win = this.window;
    var d = win.document;

    var stringToDOM = function (q, parent) {
        if (win.DOMImplementationLS &&
            win.DOMImplementationLS.createLSInput &&
            win.DOMImplementationLS.createLSParser) { // Follows the DOM 3 Load and Save standard, but not
            // implemented in browsers at present; HTML5 is to standardize on innerHTML, but not for XML (though
            // possibly will also standardize with DOMParser); in the meantime, to ensure fullest browser support, could
            // attach http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.js (see http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.xhtml for a simple test file)
            var lsInput = DOMImplementationLS.createLSInput();
            lsInput.stringData = q;
            var lsParser = DOMImplementationLS.createLSParser(1, null); // synchronous, no schema type
            return lsParser.parse(lsInput);
        }
        else if (win.DOMParser) {
            return new DOMParser().parseFromString(q, 'text/xml').documentElement;
        }
        else if (win.ActiveXObject) {
            var d = new ActiveXObject('MSXML2.DOMDocument');
             d.loadXML(q);
             return d;
        }
        /*else if (win.XMLHttpRequest) { // Supposed to work in older Safari
            var req = new win.XMLHttpRequest;
            req.open('GET', 'data:application/xml;charset=utf-8,'+encodeURIComponent(q), false);
            if (req.overrideMimeType) {
                req.overrideMimeType('application/xml');
            }
            req.send(null);
            return req.responseXML;
        }*/
        else { // Document fragment did not work with innerHTML, so we create a temporary element holder
            var holder;
            if (d.createElementNS) {
                holder = d.createElementNS('http://www.w3.org/1999/xhtml', 'div');
            }
            else {
                holder = d.createElement('div'); // Document fragment did not work with innerHTML
            }
            holder.innerHTML = q;

            while (holder.firstChild) {
                parent.appendChild(holder.firstChild);
            }
        }
        // throw 'Your browser does not support DOM parsing as required by echo()';
    };

    for (i = 0; i < argc; i++ ) {
        arg = argv[i];
        if (d.appendChild) {
            if (d.body) {
                d.body.appendChild(stringToDOM(arg, d.body));
            } else {
                d.documentElement.appendChild(stringToDOM(arg, d.documentElement));
            }
        } else if (d.write) {
            d.write(arg);
        }/* else { // This could recurse if we ever add print!
            print(arg);
        }*/
    }
}