function xmlwriter_write_attribute_ns (xmlwriter, prefix, name, uri, content) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_write_attribute_ns(xmlwriter, 'xlink', 'type', 'http://www.w3.org/1999/xlink', 'simple');
    // *     returns 1: true

    return xmlwriter.writeAttributeNS(prefix, name, uri, content);
}
