function xmlwriter_flush (xmlwriter, empty) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
    // *     example 1: xmlwriter_flush(false);
    // *     returns 1: "<root>Here's the buffer...</root>"

    return xmlwriter.flush(empty);
}
