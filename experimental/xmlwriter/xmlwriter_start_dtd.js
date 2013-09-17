function xmlwriter_start_dtd (xmlwriter, qualifiedName, publicId, systemId) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_start_dtd(xmlwriter, 'html', '-//W3C//DTD XHTML 1.0 Transitional//EN', 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd');
    // *     returns 1: true

    return xmlwriter.startDTD(qualifiedName, publicId, systemId);
}
