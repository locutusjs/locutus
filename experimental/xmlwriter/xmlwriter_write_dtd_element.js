function xmlwriter_write_dtd_element (xmlwriter, name, content) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_write_dtd_element('title', '(#PCDATA)');
    // *     returns 1: true

    xmlwriter.writeDTDElement(name, content);
}
