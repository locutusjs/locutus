function get_required_files() {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // -    depends on: get_included_files
  // *     example 1: get_required_files();
  // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']
  return this.get_included_files();
}
