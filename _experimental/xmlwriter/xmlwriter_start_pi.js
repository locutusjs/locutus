function xmlwriter_start_pi (xmlwriter, target) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_start_pi(xmlwriter, 'xml-stylesheet');
    // *     returns 1: true

    return xmlwriter.startPI(target);
}
