function xmlwriter_start_dtd (xmlwriter, qualifiedName, publicId, systemId) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// *     example 1: var xmlwriter = xmlwriter_open_memory();
	// *     example 1: xmlwriter_start_dtd(xmlwriter, qualifiedName, publicId, systemId);
	// *     returns 1: true

    return xmlwriter.startDTD(qualifiedName, publicId, systemId);
}