function xmlwriter_start_document (xmlwriter, version, encoding, standalone) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_start_document(xmlwriter, '1.0', null, null);
    // *     returns 1: true

    return xmlwriter.startDocument(version, encoding, standalone);
}
