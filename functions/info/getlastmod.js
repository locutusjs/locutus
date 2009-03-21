function getlastmod () {
	// http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %        note 1: Will not work on browsers which don't support document.lastModified
    // *     example 1: getlastmod();
    // *     returns 1: 1237610043
	return new Date(document.lastModified).getTime()/1000;
}