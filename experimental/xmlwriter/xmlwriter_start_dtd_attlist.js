function xmlwriter_start_dtd_attlist(xmlwriter, name) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory();
  // *     example 1: xmlwriter_start_dtd_attlist(xmlwriter, 'href');
  // *     returns 1: true

  return xmlwriter.startDTDAttlist(name);
}
