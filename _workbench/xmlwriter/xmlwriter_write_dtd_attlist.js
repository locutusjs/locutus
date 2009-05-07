function xmlwriter_write_dtd_attlist (xmlwriter, name, content) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// *     example 1: var xmlwriter = xmlwriter_open_memory();
	// *     example 1: xmlwriter_write_dtd_attlist(xmlwriter, name, content);
	// *     returns 1: true

    return xmlwriter.writeDTDAttlist(name, content);
}