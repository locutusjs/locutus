function xmlwriter_write_element_ns(xmlwriter, prefix, name, uri, content) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_write_element_ns(xmlwriter, 'xsl', 'if', 'http://www.w3.org/1999/XSL/Transform', '<br />');
  // *     returns 1: true

  return xmlwriter.writeElementNS(prefix, name, uri, content);
}
