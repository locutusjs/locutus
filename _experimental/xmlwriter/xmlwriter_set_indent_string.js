function xmlwriter_set_indent_string (xmlwriter, indentString) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: var xmlwriter = xmlwriter_open_memory();
	// *     example 1: xmlwriter_set_indent_string(xmlwriter, '    ');
	// *     returns 1: true

    return xmlwriter.setIndentString(indentString);
}