function setlocale (category, locale) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// +   derived from: Blues at http://hacks.bluesmoon.info/strftime/strftime.js
	// +   derived from: YUI Library: http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html
	// -    depends on: getenv
	// %          note 1: Is extensible, but currently only implements locales en,
    // %          note 1: en_US, en_GB, en_AU, fr, and fr_CA for LC_TIME only; C for LC_CTYPE; C and en for LC_MONETARY/LC_NUMERIC
    // %          note 2: Uses global: php_js to store locale info
	// *     example 1: setlocale('LC_ALL', 'en_US');
	// *     returns 1: 'en_US'
	var categ='', cats = [], i = 0, d = this.window.document;

	// BEGIN REDUNDANT
	if (!this.php_js) {this.php_js = {};}
	var phpjs = this.php_js;
	// END REDUNDANT

	// BEGIN STATIC
	var _copy = function _copy (orig) {
		var newObj = {};
		for (var i in orig) {
            if (typeof orig[i] === 'object') {
                newObj[i] = _copy(orig[i]);
            }
            else {
                newObj[i] = orig[i];
            }
		}
		return newObj;
	};

	if (!phpjs.locales) {
		// Can add to the locales
		phpjs.locales = {};

		phpjs.locales.en = {
            'LC_COLLATE' : '', // Need to add something here for strcoll (and modify it too), perhaps a sorter function
            'LC_CTYPE' : { // Need to change any of these for English as opposed to C?
                an: /^[A-Za-z\d]+$/g,
                al: /^[A-Za-z]+$/g,
                ct: /^[\u0000-\u001F\u007F]+$/g,
                dg: /^[\d]+$/g,
                gr: /^[\u0021-\u007E]+$/g,
                lw: /^[a-z]+$/g,
                pr: /^[\u0020-\u007E]+$/g,
                pu: /^[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+$/g,
                sp: /^[\f\n\r\t\v ]+$/g,
                up: /^[A-Z]+$/g,
                xd: /^[A-Fa-f\d]+$/g,
                CODESET : 'UTF-8',
                 // Used by sql_regcase
                lower : 'abcdefghijklmnopqrstuvwxyz',
                upper : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            },
            'LC_TIME' : { // Comments include nl_langinfo() constant equivalents and any changes from Blues' implementation
                a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // ABDAY_
                A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // DAY_
                b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // ABMON_
                B: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // MON_
                c: '%a %d %b %Y %r %Z', // D_T_FMT // changed %T to %r per results
                p: ['AM', 'PM'], // AM_STR/PM_STR
                P: ['am', 'pm'], // Not available in nl_langinfo()
                r: '%I:%M:%S %p', // T_FMT_AMPM (Fixed for all locales)
                x: '%m/%d/%Y', // D_FMT // switched order of %m and %d; changed %y to %Y (C uses %y)
                X: '%r', // T_FMT // changed from %T to %r  (%T is default for C, not English US)
                // Following are from nl_langinfo() or http://www.cptec.inpe.br/sx4/sx4man2/g1ab02e/strftime.4.html
                alt_digits : '', // e.g., ordinal
                ERA : '',
                ERA_YEAR : '',
                ERA_D_T_FMT : '',
                ERA_D_FMT : '',
                ERA_T_FMT : ''
            },
             // Assuming distinction between numeric and monetary is thus:
             // See below for C locale
            'LC_MONETARY' : { // Based on Windows "english" (English_United States.1252) locale
                int_curr_symbol : 'USD',
                currency_symbol : '$',
                mon_decimal_point : '.',
                mon_thousands_sep : ',',
                mon_grouping : [3],
                positive_sign : '',
                negative_sign : '-',
                int_frac_digits : 2, // Fractional digits only for money defaults?
                frac_digits : 2,
                p_cs_precedes : 1,
                p_sep_by_space : 0,
                n_cs_precedes : 1,
                n_sep_by_space : 0,
                p_sign_posn : 3,
                n_sign_posn : 0
            },
            'LC_NUMERIC' : { // Based on Windows "english" (English_United States.1252) locale
                decimal_point : '.',
                thousands_sep : ',',
                grouping : [3]
            },
            'LC_MESSAGES' : {
                YESEXPR : '^[yY].*',
                NOEXPR : '^[nN].*',
                YESSTR : '',
                NOSTR : ''
            }
        };
		phpjs.locales.en_US = _copy(phpjs.locales.en);
		phpjs.locales.en_US.LC_TIME.c = '%a %d %b %Y %r %Z';
        phpjs.locales.en_US.LC_TIME.x = '%D';
        phpjs.locales.en_US.LC_TIME.X = '%r';

		phpjs.locales.en_GB = _copy(phpjs.locales.en);
		phpjs.locales.en_GB.LC_TIME.r =  '%l:%M:%S %P %Z';

		phpjs.locales.en_AU = _copy(phpjs.locales.en_GB);
        phpjs.locales.C = _copy(phpjs.locales.en); // Assume C locale is like English (?) (We need C locale for LC_CTYPE)
        phpjs.locales.C.LC_CTYPE.CODESET = 'ANSI_X3.4-1968';
        phpjs.locales.C.LC_MONETARY = {
            int_curr_symbol : '',
            currency_symbol : '',
            mon_decimal_point : '',
            mon_thousands_sep : '',
            mon_grouping : [],
            p_cs_precedes : 127,
            p_sep_by_space : 127,
            n_cs_precedes : 127,
            n_sep_by_space : 127,
            p_sign_posn : 127,
            n_sign_posn : 127,
            positive_sign : '',
            negative_sign : '',
            int_frac_digits : 127,
            frac_digits : 127
        };
        phpjs.locales.C.LC_NUMERIC = {
            decimal_point : '.',
            thousands_sep : '',
            grouping : []
        };
        phpjs.locales.C.LC_TIME.c = '%a %b %e %H:%M:%S %Y'; // D_T_FMT
        phpjs.locales.C.LC_TIME.x = '%m/%d/%y'; // D_FMT
        phpjs.locales.C.LC_TIME.X = '%H:%M:%S'; // T_FMT
        phpjs.locales.C.LC_MESSAGES.YESEXPR = '^[yY]';
        phpjs.locales.C.LC_MESSAGES.NOEXPR = '^[nN]';

		phpjs.locales.fr =_copy(phpjs.locales.en);
		phpjs.locales.fr.LC_TIME.a = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
        phpjs.locales.fr.LC_TIME.A = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        phpjs.locales.fr.LC_TIME.b = ['jan', 'fÃ©v', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoÃ»', 'sep', 'oct', 'nov', 'dÃ©c'];
        phpjs.locales.fr.LC_TIME.B = ['janvier', 'fÃ©vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aoÃ»t', 'septembre', 'octobre', 'novembre', 'dÃ©cembre'];
        phpjs.locales.fr.LC_TIME.c = '%a %d %b %Y %T %Z';
        phpjs.locales.fr.LC_TIME.p = ['', ''];
        phpjs.locales.fr.LC_TIME.P = ['', ''];
        phpjs.locales.fr.LC_TIME.x = '%d.%m.%Y';
        phpjs.locales.fr.LC_TIME.X = '%T';

		phpjs.locales.fr_CA = _copy(phpjs.locales.fr);
		phpjs.locales.fr_CA.LC_TIME.x = '%Y-%m-%d';

	}
	if (!phpjs.locale) {
		phpjs.locale = 'en_US';
		var NS_XHTML = 'http://www.w3.org/1999/xhtml';
		var NS_XML = 'http://www.w3.org/XML/1998/namespace';
		if (d.getElementsByTagNameNS &&
				d.getElementsByTagNameNS(NS_XHTML, 'html')[0]) {
			if (d.getElementsByTagNameNS(NS_XHTML, 'html')[0].getAttributeNS &&
					d.getElementsByTagNameNS(NS_XHTML, 'html')[0].getAttributeNS(NS_XML, 'lang')) {
				phpjs.locale = d.getElementsByTagName(NS_XHTML, 'html')[0].getAttributeNS(NS_XML, 'lang');
			} else if(d.getElementsByTagNameNS(NS_XHTML, 'html')[0].lang) { // XHTML 1.0 only
				phpjs.locale = d.getElementsByTagNameNS(NS_XHTML, 'html')[0].lang;
			}
		} else if(d.getElementsByTagName('html')[0] && d.getElementsByTagName('html')[0].lang) {
			phpjs.locale = d.getElementsByTagName('html')[0].lang;
		}
	}
    phpjs.locale = phpjs.locale.replace('-', '_'); // PHP-style

	// Fix locale if declared locale hasn't been defined
	if(!(phpjs.locale in phpjs.locales)) {
		if(phpjs.locale.replace(/_[a-zA-Z]+$/, '') in phpjs.locales) {
			phpjs.locale = phpjs.locale.replace(/_[a-zA-Z]+$/, '');
		}
	}

	if (!phpjs.localeCategories) {
		phpjs.localeCategories = {
			'LC_COLLATE': phpjs.locale, // for string comparison, see strcoll()
			'LC_CTYPE': phpjs.locale,// for character classification and conversion, for example strtoupper()
			'LC_MONETARY': phpjs.locale,// for localeconv()
			'LC_NUMERIC': phpjs.locale,// for decimal separator (See also localeconv())
			'LC_TIME': phpjs.locale,// for date and time formatting with strftime()
			'LC_MESSAGES':phpjs.locale// for system responses (available if PHP was compiled with libintl)
		};
	}
	// END STATIC

	if (locale === null || locale === '') {
		locale = this.getenv(category) || this.getenv('LANG');
	} else if (locale instanceof Array) {
		for (i=0; i < locale.length; i++) {
			if (!(locale[i] in this.php_js.locales)) {
				if (i === locale.length-1) {
					return false; // none found
				}
				continue;
			}
			locale = locale[i];
			break;
		}
	}

	// Just get the locale
	if (locale === '0' || locale === 0) {
		if (category === 'LC_ALL') {
			for (categ in this.php_js.localeCategories) {
				cats.push(categ+'='+this.php_js.localeCategories[categ]);
			}
			return cats.join(';');
		}
		return this.php_js.localeCategories[category];
	}

	if (!(locale in this.php_js.locales)) {
		return false; // Locale not found
	}

	// Set and get locale
	if (category === 'LC_ALL') {
		for (categ in this.php_js.localeCategories) {
			this.php_js.localeCategories[categ] = locale;
		}
	} else {
		this.php_js.localeCategories[category] = locale;
	}
	return locale;
}