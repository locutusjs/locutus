function xmlwriter_start_element_ns (xmlwriter, prefix, name, uri) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// *     example 1: var xmlwriter = xmlwriter_open_memory();
	// *     example 1: xmlwriter_start_element_ns(xmlwriter, prefix, name, uri);
	// *     returns 1: true
    
    return xmlwriter.startElementNS(prefix, name, uri);
}