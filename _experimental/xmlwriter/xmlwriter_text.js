function xmlwriter_text (xmlwriter, content) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_text(xmlwriter, 'some text to write');
    // *     returns 1: true

    return xmlwriter.text(content);
}
