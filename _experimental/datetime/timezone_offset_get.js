
// Note: basically implemented, but useless without DateTimeZone object
function timezone_offset_get (dtzObj, datetime) {
	return dtzObj.getOffset(datetime);
}