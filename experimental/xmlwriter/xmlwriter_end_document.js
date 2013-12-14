function xmlwriter_end_document (xmlwriter) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_end_document(xmlwriter);
    // *     returns 1: true

    return xmlwriter.endDocument();
}
