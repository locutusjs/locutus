// Note: basically implemented, but useless without DateTimeZone object
function timezone_offset_get(dtzObj, datetime) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)

  return dtzObj.getOffset(datetime);
}
