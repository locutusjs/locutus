function xmlwriter_write_dtd (xmlwriter, name, publicId, systemId, subset) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// *     example 1: var xmlwriter = xmlwriter_open_memory();
	// *     example 1: xmlwriter_write_dtd(xmlwriter, name, publicId, systemId, subset);
	// *     returns 1: true

    return xmlwriter.writeDTD(name, publicId, systemId, subset);
}