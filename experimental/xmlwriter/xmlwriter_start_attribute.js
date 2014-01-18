function xmlwriter_start_attribute(xmlwriter, name) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_attribute(xmlwriter, 'href');
  // *     returns 1: true

  return xmlwriter.startAttribute(name);
}
