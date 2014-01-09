function pos(arr) {
  // From: http://phpjs.org/functions
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // -    depends on: current
  // *     example 1: transport = ['foot', 'bike', 'car', 'plane'];
  // *     example 1: pos(transport);
  // *     returns 1: 'foot'
  return this.current(arr);
}
