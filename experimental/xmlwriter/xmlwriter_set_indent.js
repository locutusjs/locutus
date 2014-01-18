function xmlwriter_set_indent(xmlwriter, indent) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_set_indent(xmlwriter, true);
  // *     returns 1: true

  return xmlwriter.setIndent(indent);
}
