function xmlwriter_write_dtd_entity (xmlwriter, name, content, pe, pubid, sysid, ndataid) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_write_dtd_entity(xmlwriter, 'nbsp', '&#160;', false, '', '', '');
    // *     returns 1: true

    return xmlwriter.writeDTDEntity(name, content, pe, pubid, sysid, ndataid);
}
