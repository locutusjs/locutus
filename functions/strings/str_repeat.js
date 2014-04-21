function str_repeat(string, multiplier) {
	//  discuss at: http://phpjs.org/functions/str_repeat/
	// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// improved by: Ian Carter (http://euona.com/)
	// improved by: Nakka Chandra (http://n41tkd.wordpress.com/)
	//   example 1: str_repeat('-=', 10);
	//   returns 1: '-=-=-=-=-=-=-=-=-=-='
	multiplier = parseInt((multiplier === true ? 1 : multiplier) + "", 10);
	return typeof string == "string" && multiplier >= 1 ?
		new Array(multiplier + 1).join(string) : null;
}
