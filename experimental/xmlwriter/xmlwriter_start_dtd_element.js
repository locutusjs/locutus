function xmlwriter_start_dtd_element(xmlwriter, qualifiedName) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_dtd_element(xmlwriter, 'xsl:output');
  // *     returns 1: true

  return xmlwriter.startDTDElement(qualifiedName);
}
