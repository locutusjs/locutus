function money_format (format, number) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: money_format('%i', 1234.56);
    // *     returns 1: 'USD 1,234.56'

    if (typeof number !== 'number') {
        return null;
    }
    var regex = /%((=.|[+^(!-])*?)(\d*?)(#(\d+))?(\.(\d+))?([in%])/g; // 1: flags, 3: width, 5: left, 7: right, 8: conversion

    this.setlocale('LC_ALL', 0); // Ensure the locale data we need is set up
    var monetary = this.php_js.locales[this.php_js.localeCategories['LC_MONETARY']]['LC_MONETARY'];

    var doReplace = function (n0, flags, n2, width, n4, left, n6, right, conversion) {
        var repl = '';
        if (conversion === '%') { // Percent does not seem to be allowed with intervening content
            return '%';
        }
        var fill = flags && /=./.test(flags) ? flags.match(/=(.)/)[1] : ' '; // flag: =f (numeric fill)
        var showCurrSymbol = !flags || flags.indexOf('!') === -1; // flag: ! (suppress currency symbol)
        width = width || 0; // field width: w (minimum field width)

        number = number+''; // Convert to string
        var decpos = number.indexOf('.');
        var integer = decpos !== -1 ? number.slice(0, decpos) : number; // Get integer portion
        var fraction = decpos !== -1 ? number.slice(decpos+1) : ''; // Get decimal portion

        var str_splice = function (integerStr, idx, thous_sep) {
            var integerArr = integerStr.split('');
            integerArr.splice(idx, 0, thous_sep);
            return integerArr.join('');
        };

        if (flags.indexOf('^') === -1) { // flag: ^ (disable grouping characters (of locale))
            var init_lgth = integer.length;
            var filler = init_lgth < left;
            if (filler) {
                var fillnum = left-init_lgth;
                integer = new Array(fillnum+1).join(fill)+integer;
            }
            // use grouping characters
            var thous_sep = monetary.mon_thousands_sep; // ','
            var mon_grouping = monetary.mon_grouping; // [3] (every 3 digits in U.S.A. locale)

            for (var i = 0, idx = integer.length; i < mon_grouping.length; i++) {
                idx -= mon_grouping[i]; // e.g., 3
                if (idx < 0) {break;}
                if (filler && idx < fillnum) {
                    thous_sep = fill;
                }
                integer = str_splice(integer, idx, thous_sep);
            }
            if (mon_grouping[i-1] > 0) { // Repeating last grouping (may only be one) until highest portion of integer reached
                while (idx > mon_grouping[i-1]) {
                    idx -= mon_grouping[i-1];
                    if (filler && idx < fillnum) {
                        thous_sep = fill;
                    }
                    integer = str_splice(integer, idx, thous_sep);
                }
            }
        }

        // left, right
        if (right === '0') { // No decimal or fractional digits
            repl = integer;
        }
        else {
            var dec_pt = monetary.mon_decimal_point; // '.'
            if (right === '') {
                right = conversion === 'i' ? monetary.int_frac_digits : monetary.frac_digits;
            }
            right = parseInt(right, 10);

            if (right === 0) { // Only remove fractional portion if explicitly set to zero digits
                fraction = '';
                dec_pt = '';
            }
            else if (right < fraction.length) {
                fraction = Math.round(parseInt(fraction.slice(0, right)+'.'+fraction.substr(right, 1), 10))+'';
            }
            else if (right > fraction.length) {
                fraction += new Array(right - fraction.length + 1).join('0'); // pad with 0's
            }
            repl = integer+dec_pt+fraction;
        }

// Unfinished from here:
// 1) add symbol and sign, padding with spaces as necessary for width

// p_cs_precedes, n_cs_precedes, p_sep_by_space, n_sep_by_space, p_sign_posn, n_sign_posn
// symbol/value/sign

        var symbol = '';
        if (showCurrSymbol) {
            symbol = conversion === 'i' ? monetary.int_curr_symbol : monetary.currency_symbol; // 'i' vs. 'n' ('USD' vs. '$')
        }
        
        if (flags.indexOf('(') !== -1) { // flag: parenth. for negative
            if (number < 0) {
                repl = '('+repl+')';
            }
        }
        else { // '+' is default
            var pos_sign = monetary.positive_sign; // ''
            var neg_sign = monetary.negative_sign; // '-'
            repl = number >= 0 ? (pos_sign)+repl : (neg_sign)+repl;
        }

        // How does p_sep_by_space affect the count if there is a space? Included in count presumably?
        if (flags.indexOf('-') !== -1) { // left-justified (pad to right)
            /**
            width
            //*/
        }
        else { // right-justified
            // same as above but other direction
        }
        return repl;
    };

    return format.replace(regex, doReplace);
}