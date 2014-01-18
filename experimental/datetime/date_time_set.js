function date_time_set(dt, hour, minute, second) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var dt = date_create();
  // *     example 1: date_time_set(dt, 10, 15, 30);
  // *     returns 1: {}

  return dt.setTime(hour, minute, second);
}
