function xmlwriter_write_attribute (xmlwriter, name, value) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_write_attribute(xmlwriter, 'href', 'http://www.un.org');
    // *     returns 1: true

    return xmlwriter.writeAttribute(name, value);
}
