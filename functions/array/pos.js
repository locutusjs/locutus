function pos(arr) {
  //  discuss at: http://phpjs.org/functions/pos/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Uses global: php_js to store the array pointer
  //  depends on: current
  //   example 1: transport = ['foot', 'bike', 'car', 'plane'];
  //   example 1: pos(transport);
  //   returns 1: 'foot'

  return this.current(arr);
}