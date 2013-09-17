function xmlwriter_write_pi (xmlwriter, target, content) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_write_pi(xmlwriter, 'xml-stylesheet', 'href="mystyle.css" type="text/css"');
    // *     returns 1: true

    return xmlwriter.writePI(target, content);
}
