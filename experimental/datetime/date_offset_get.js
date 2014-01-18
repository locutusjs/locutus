function date_offset_get(dt) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: var dt = date_create();
  // *     example 1: date_offset_get(dt);
  // *     returns 1: -480

  return dt.getOffset();
}
