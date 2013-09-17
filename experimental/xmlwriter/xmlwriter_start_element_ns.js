function xmlwriter_start_element_ns (xmlwriter, prefix, name, uri) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_start_element_ns(xmlwriter, 'xsl', 'stylesheet', 'http://www.w3.org/1999/XSL/Transform');
    // *     returns 1: true

    return xmlwriter.startElementNS(prefix, name, uri);
}
