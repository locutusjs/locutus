function money_format (format, number) {
	// http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // -    depends on: setlocale
    // *     example 1: money_format('%i', 1234.56);
    // *     returns 1: 'USD 1,234.56'
	
	if (typeof number !== 'number') {
		return null;
	}
	
	setlocale('LC_ALL', 0); // Ensure the locale data we need is set up
	
	var regex = /%((=.|[+^(!-])*?)(\d*?)(#(\d+))?(\.(\d+))?([in])/g; // 1: flags, 3: width, 5: left, 7: right, 8: conversion
	
	var monetary = this.phpjs.locales[this.phpjs.locale]['LC_MONETARY'];
	var numeric = this.phpjs.locales[this.phpjs.locale]['LC_NUMERIC'];
	
	var doReplace = function (n0, flags, n2, width, n4, left, n6, right, conversion) {
		var repl = '';
		var fill = /=./.test(flags) ? flags.match(/=(.)/)[1] : ' ';
		var showCurrSymbol = flags.indexOf('!') === -1;
		width = width || 0;		
		

		if (flags.indexOf('^') === -1) {
			// use grouping characters
			monetary.mon_thousands_sep; // ','
			monetary.mon_grouping[0]; // 3
		}
		
		monetary.mon_decimal_point; // '.'
		
		// left, right
		if (right === '0') { // No decimal or fractional digits
			
		}
		else if (right === undefined) {
			right = conversion === 'i' ? numeric.int_frac_digits : numeric.frac_digits;
		}
			
		if (flags.indexOf('-') !== -1) { // left-justified
			// width; fill
		}
		else { // right-justified
			
		}

		
		if (showCurrSymbol) {
			repl = (conversion === 'i' ? monetary.int_curr_symbol : monetary.currency_symbol) + repl; // 'i' vs. 'n' ('USD' vs. '$')
		}
		if (flags.indexOf('(') !== -1) {
			if (number < 0) {
				repl = '('+repl+')';
			}
		}
		else { // '+' is default
			repl = number >= 0 ? numeric.positive_sign+repl : numeric.negative_sign+repl;
		}
				
	};
	
	format = format.replace(regex, doReplace);
	return format.replace(/%%/g, '%'); // Parentheses does not seem to be allowed with intervening content (i.e., it can't just be added along with 'i' and 'n' in the regexp above)
	
}