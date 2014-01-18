function xmlwriter_end_pi(xmlwriter) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var xmlwriter = xmlwriter_open_memory(xmlwriter);
  // *     example 1: xmlwriter_end_pi(xmlwriter);
  // *     returns 1: true

  return xmlwriter.endPI();
}
