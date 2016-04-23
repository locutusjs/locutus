module.exports = function echo () {
  //  discuss at: http://locutusjs.io/php/echo/
  // original by: Philip Peterson
  // improved by: echo is bad
  // improved by: Nate
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //  revised by: Der Simon (http://innerdom.sourceforge.net/)
  // bugfixed by: Eugene Bulkin (http://doubleaw.com/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: EdorFaus
  //    input by: JB
  //        note: If browsers start to support DOM Level 3 Load and Save (parsing/serializing),
  //        note: we wouldn't need any such long code (even most of the code below). See
  //        note: link below for a cross-browser implementation in JavaScript. HTML5 might
  //        note: possibly support DOMParser, but that is not presently a standard.
  //        note: Although innerHTML is widely used and may become standard as of HTML5, it is also not ideal for
  //        note: use with a temporary holder before appending to the DOM (as is our last resort below),
  //        note: since it may not work in an XML context
  //        note: Using innerHTML to directly add to the BODY is very dangerous because it will
  //        note: break all pre-existing references to HTMLElements.
  //   example 1: echo('<div><p>abc</p><p>abc</p></div>')
  //   returns 1: undefined

  var isNode = typeof module !== 'undefined' && module.exports && typeof global !== 'undefined' && {}.toString.call(global) === '[object global]'
  if (isNode) {
    var args = Array.prototype.slice.call(arguments)
    return console.log(args.join(' '))
  }

  var arg = ''
  var argc = arguments.length
  var argv = arguments
  var i = 0
  var holder, win = this.window
  var d = win.document
  var ns_xhtml = 'http://www.w3.org/1999/xhtml'
  // If we're in a XUL context
  var ns_xul = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'

  var stringToDOM = function (str, parent, ns, container) {
    var extraNSs = ''
    if (ns === ns_xul) {
      extraNSs = ' xmlns:html="' + ns_xhtml + '"'
    }
    var stringContainer = '<' + container + ' xmlns="' + ns + '"' + extraNSs + '>' + str + '</' + container + '>'
    var dils = win.DOMImplementationLS
    var dp = win.DOMParser
    var ax = win.ActiveXObject
    if (dils && dils.createLSInput && dils.createLSParser) {
      // Follows the DOM 3 Load and Save standard, but not
      // implemented in browsers at present; HTML5 is to standardize on innerHTML, but not for XML (though
      // possibly will also standardize with DOMParser); in the meantime, to ensure fullest browser support, could
      // attach http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.js (see http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.xhtml for a simple test file)
      var lsInput = dils.createLSInput()
      // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
      lsInput.stringData = stringContainer
      // synchronous, no schema type
      var lsParser = dils.createLSParser(1, null)
      return lsParser.parse(lsInput)
        .firstChild
    } else if (dp) {
      // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
      try {
        var fc = new dp()
          .parseFromString(stringContainer, 'text/xml')
        if (fc && fc.documentElement && fc.documentElement.localName !== 'parsererror' && fc.documentElement.namespaceURI !==
          'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
          return fc.documentElement.firstChild
        }
        // If there's a parsing error, we just continue on
      } catch (e) {
        // If there's a parsing error, we just continue on
      }
    } else if (ax) {
      // We don't bother with a holder in Explorer as it doesn't support namespaces
      var axo = new ax('MSXML2.DOMDocument')
      axo.loadXML(str)
      return axo.documentElement
    }
    /* else if (win.XMLHttpRequest) {
     // Supposed to work in older Safari
      var req = new win.XMLHttpRequest;
      req.open('GET', 'data:application/xml;charset=utf-8,'+encodeURIComponent(str), false);
      if (req.overrideMimeType) {
        req.overrideMimeType('application/xml');
      }
      req.send(null);
      return req.responseXML;
    }*/
    // Document fragment did not work with innerHTML, so we create a temporary element holder
    // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
    // if (d.createElementNS && (d.contentType && d.contentType !== 'text/html')) {
    // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways)
    if (d.createElementNS && // Browser supports the method
      (d.documentElement.namespaceURI || // We can use if the document is using a namespace
        d.documentElement.nodeName.toLowerCase() !== 'html' || // We know it's not HTML4 or less, if the tag is not HTML (even if the root namespace is null)
        (d.contentType && d.contentType !== 'text/html') // We know it's not regular HTML4 or less if this is Mozilla (only browser supporting the attribute) and the content type is something other than text/html; other HTML5 roots (like svg) still have a namespace
      )) {
      // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways); last test is for the sake of being in a pure XML document
      holder = d.createElementNS(ns, container)
    } else {
      // Document fragment did not work with innerHTML
      holder = d.createElement(container)
    }
    holder.innerHTML = str
    while (holder.firstChild) {
      parent.appendChild(holder.firstChild)
    }
    return false
    // throw new Error('Your browser does not support DOM parsing as required by echo()');
  }

  var ieFix = function (node) {
    if (node.nodeType === 1) {
      var newNode = d.createElement(node.nodeName)
      var i, len
      if (node.attributes && node.attributes.length > 0) {
        for (i = 0, len = node.attributes.length; i < len; i++) {
          newNode.setAttribute(node.attributes[i].nodeName, node.getAttribute(node.attributes[i].nodeName))
        }
      }
      if (node.childNodes && node.childNodes.length > 0) {
        for (i = 0, len = node.childNodes.length; i < len; i++) {
          newNode.appendChild(ieFix(node.childNodes[i]))
        }
      }
      return newNode
    } else {
      return d.createTextNode(node.nodeValue)
    }
  }

  var replacer = function (s, m1, m2) {
    // We assume for now that embedded variables do not have dollar sign; to add a dollar sign, you currently must use {$$var} (We might change this, however.)
    // Doesn't cover all cases yet: see http://php.net/manual/en/language.types.string.php#language.types.string.syntax.double
    if (m1 !== '\\') {
      return m1 + eval(m2)
    } else {
      return s
    }
  }

  this.locutus = this.locutus || {}
  var locutus = this.locutus
  var ini = locutus.ini
  var obs = locutus.obs
  for (i = 0; i < argc; i++) {
    arg = argv[i]
    if (ini && ini['locutus.echo_embedded_vars']) {
      arg = arg.replace(/(.?)\{?\$(\w*?\}|\w*)/g, replacer)
    }

    if (!locutus.flushing && obs && obs.length) {
      // If flushing we output, but otherwise presence of a buffer means caching output
      obs[obs.length - 1].buffer += arg
      continue
    }

    if (d.appendChild) {
      if (d.body) {
        if (win.navigator.appName === 'Microsoft Internet Explorer') {
          // We unfortunately cannot use feature detection, since this is an IE bug with cloneNode nodes being appended
          d.body.appendChild(stringToDOM(ieFix(arg)))
        } else {
          var unappendedLeft = stringToDOM(arg, d.body, ns_xhtml, 'div')
            .cloneNode(true) // We will not actually append the div tag (just using for providing XHTML namespace by default)
          if (unappendedLeft) {
            d.body.appendChild(unappendedLeft)
          }
        }
      } else {
        // We will not actually append the description tag (just using for providing XUL namespace by default)
        d.documentElement.appendChild(stringToDOM(arg, d.documentElement, ns_xul, 'description'))
      }
    } else if (d.write) {
      d.write(arg)
    } else {
      console.log(arg)
    }
  }
}
