function xmlwriter_start_dtd_entity (xmlwriter, name, isparam) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_start_dtd_entity('nbsp', false);
    // *     returns 1: true

    return xmlwriter.startDTDEntity(name, isparam);
}
