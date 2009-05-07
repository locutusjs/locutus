function xmlwriter_set_indent (xmlwriter, indent) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// *     example 1: var xmlwriter = xmlwriter_open_memory();
	// *     example 1: xmlwriter_set_indent(xmlwriter, indent);
	// *     returns 1: true

    return xmlwriter.setIndent(indent);
}