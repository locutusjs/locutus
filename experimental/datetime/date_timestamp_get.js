function date_timestamp_get(dt, timestamp) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var dt = date_create();
  // *     example 1: date_timestamp_get(dt);
  // *     returns 1: 1045000

  return dt.getTimestamp(timestamp);
}
