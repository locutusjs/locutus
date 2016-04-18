// Note: basically implemented, but useless without DateTimeZone object
module.exports = function timezone_offset_get (dtzObj, datetime)  {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)

  return dtzObj.getOffset(datetime);
}
