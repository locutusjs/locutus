function xmlwriter_end_dtd_entity (xmlwriter) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_end_dtd_entity(xmlwriter);
    // *     returns 1: true

    return xmlwriter.endDTDEntity();
}
