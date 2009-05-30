function echo ( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: echo is bad
    // +   improved by: Nate
    // +    revised by: Der Simon (http://innerdom.sourceforge.net/)
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // +   bugfixed by: Eugene Bulkin (http://doubleaw.com/)
    // +   input by: JB
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // %        note 1: If browsers start to support DOM Level 3 Load and Save (parsing/serializing),
    // %        note 1: we wouldn't need any such long code (even most of the code below). See
    // %        note 1: link below for a cross-browser implementation in JavaScript. HTML5 might
    // %        note 1: possibly support DOMParser, but that is not presently a standard.
    // %        note 2: Although innerHTML is widely used and may become standard as of HTML5, it is also not ideal for
    // %        note 2: use with a temporary holder before appending to the DOM (as is our last resort below),
    // %        note 2: since it may not work in an XML context
    // %        note 3: Using innerHTML to directly add to the BODY is very dangerous because it will
    // %        note 3: break all pre-existing references to HTMLElements.
    // *     example 1: echo('Hello', 'World');
    // *     returns 1: undefined
    
    var arg = '', argc = arguments.length, argv = arguments, i = 0;
	var d = this.window.document;
	
    var stringToDOM = function (q) {
        if (window.DOMImplementationLS &&
            window.DOMImplementationLS.createLSInput && 
            window.DOMImplementationLS.createLSParser) { // Follows the DOM 3 Load and Save standard, but not
            // implemented in browsers at present; HTML5 is to standardize on innerHTML, but not for XML (though
            // possibly will also standardize with DOMParser); in the meantime, to ensure fullest browser support, could
            // attach http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.js (see http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.xhtml for a simple test file)
            var lsInput = DOMImplementationLS.createLSInput();
            lsInput.stringData = q;
            var lsParser = DOMImplementationLS.createLSParser(1, null); // synchronous, no schema type
            return lsParser.parse(lsInput);
        }
        else if (window.DOMParser) {
            return new DOMParser().parseFromString(q, 'text/xml').documentElement;
        }
        else if (window.ActiveXObject) {
            var d = new ActiveXObject('MSXML2.DOMDocument');
             d.loadXML(q);
             return d;
        }
        /*else if (window.XMLHttpRequest) { // Supposed to work in older Safari
            var req = new window.XMLHttpRequest;
            req.open('GET', 'data:application/xml;charset=utf-8,'+encodeURIComponent(q), false);
            if (req.overrideMimeType) {
                req.overrideMimeType('application/xml');
            }
            req.send(null);
            return req.responseXML;
        }*/
        else if (document.createDocumentFragment) { // Document fragment did not work with innerHTML, so we create a temporary element holder
            var holder;
            if (document.createElementNS) {
                holder = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
            }
            else {
                holder = document.createElement('div'); // Document fragment did not work with innerHTML
            }
            holder.innerHTML = q;
            var df = document.createDocumentFragment();
            while (holder.firstChild) {
                df.appendChild(holder.firstChild);
            }
            return df;
        }
        throw 'Your browser does not support DOM parsing as required by echo()';
    };

    for (i = 0; i < argc; i++ ) {
        arg = argv[i];
        if (d.createDocumentFragment && d.createTextNode && d.appendChild) {
            if (d.body) {
                d.body.appendChild(stringToDOM(arg));
            } else {
                d.documentElement.appendChild(stringToDOM(arg));
            }
        } else if (d.write) {
            d.write(arg);
        }/* else { // This could recurse if we ever add print!
            print(arg);
        }*/
    }
}