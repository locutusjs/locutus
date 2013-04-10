function xmlwriter_write_dtd (xmlwriter, name, publicId, systemId, subset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_write_dtd(xmlwriter, 'html', '-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//EN', 'http://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd', '<!ENTITY % XHTML.prefixed  "IGNORE" ><!ENTITY % XHTML.prefix    "" >');
    // *     returns 1: true

    return xmlwriter.writeDTD(name, publicId, systemId, subset);
}
