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

	var categ='', cats = [], i=0;

	// BEGIN REDUNDANT
	if (!this.php_js) {this.php_js = {};}
	var phpjs = this.php_js;
	// END REDUNDANT

	// BEGIN STATIC
	var _copy = function (orig) {
		var newObj = {};
		for (var i in orig) {
			newObj[i] = orig[i];
		}
		return newObj;
	};

	if (!phpjs.locales) {
		// Can add to the locales
		phpjs.locales = {};
        
		phpjs.locales.en = {
            'LC_CTYPE' : {
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
                xd: /^[A-Fa-f\d]+$/g
            },
            'LC_TIME' : {
                a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                B: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                c: '%a %d %b %Y %T %Z',
                p: ['AM', 'PM'],
                P: ['am', 'pm'],
                r: '%I:%M:%S %p',
                x: '%d/%m/%y',
                X: '%T'
            },
             // Assuming distinction between numeric and monetary is thus:
             // See below for C locale
            'LC_MONETARY' : { // Based on Windows "english" (English_United States.1252) locale
                int_curr_symbol : 'USD',
                currency_symbol : '$',
                mon_decimal_point : '.',
                mon_thousands_sep : ',',
                mon_grouping : [3]
                p_cs_precedes : 1,
                p_sep_by_space : 0,
                n_cs_precedes : 1,
                n_sep_by_space : 0,
                p_sign_posn : 3,
                n_sign_posn : 0,
            },
            'LC_NUMERIC' : { // Based on Windows "english" (English_United States.1252) locale
                decimal_point : '.',
                thousands_sep : ',',
                positive_sign : '',
                negative_sign : '-',
                int_frac_digits : 2,
                frac_digits : 2,
                grouping : [3]
            }
        };
		phpjs.locales['en_US'] = _copy(phpjs.locales.en);
		phpjs.locales['en_US']['LC_TIME'] = {
            c : '%a %d %b %Y %r %Z',
            x : '%D',
            X : '%r'
        };
		phpjs.locales['en_GB'] = _copy(phpjs.locales.en);
		phpjs.locales['en_GB']['LC_TIME'] = {
            r : '%l:%M:%S %P %Z'
        };
		phpjs.locales['en_AU'] = _copy(phpjs.locales['en_GB']);
        phpjs.locales.C = _copy(phpjs.locales.en); // Assume C locale is like English (?) (We need C locale for LC_CTYPE)
        phpjs.locales.C['LC_MONETARY'] = {
            int_curr_symbol : '',
            currency_symbol : '',
            mon_decimal_point : '',
            mon_thousands_sep : '',
            mon_grouping : []
            p_cs_precedes : 127,
            p_sep_by_space : 127,
            n_cs_precedes : 127,
            n_sep_by_space : 127,
            p_sign_posn : 127,
            n_sign_posn : 127,
        };
        phpjs.locales.C['LC_NUMERIC'] = {
            decimal_point : '.',
            thousands_sep : '',
            positive_sign : '',
            negative_sign : '',
            int_frac_digits : 127,
            frac_digits : 127,
            grouping : []
        };

		phpjs.locales['fr'] ={};
		phpjs.locales['fr']['LC_TIME'] = {
			a: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
			A: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
			b: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoû', 'sep', 'oct', 'nov', 'déc'],
			B: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
			c: '%a %d %b %Y %T %Z',
			p: ['', ''],
			P: ['', ''],
			x: '%d.%m.%Y',
			X: '%T'
		};
		phpjs.locales['fr_CA'] = _copy(phpjs.locales['fr']);
		phpjs.locales['fr_CA']['LC_TIME'] = {
            x : '%Y-%m-%d'
        };
	}
	if (!phpjs.locale) {
		phpjs.locale = 'en_US';
		var NS_XHTML = 'http://www.w3.org/1999/xhtml';
		var NS_XML = 'http://www.w3.org/XML/1998/namespace';
		if (document.getElementsByTagNameNS &&
				document.getElementsByTagNameNS(NS_XHTML, 'html')[0]) {
			if (document.getElementsByTagNameNS(NS_XHTML, 'html')[0].getAttributeNS &&
					document.getElementsByTagNameNS(NS_XHTML, 'html')[0].getAttributeNS(NS_XML, 'lang')) {
				phpjs.locale = document.getElementsByTagName(NS_XHTML, 'html')[0].getAttributeNS(NS_XML, 'lang');
			} else if(document.getElementsByTagNameNS(NS_XHTML, 'html')[0].lang) { // XHTML 1.0 only
				phpjs.locale = document.getElementsByTagNameNS(NS_XHTML, 'html')[0].lang
			}
		} else if(document.getElementsByTagName('html')[0] && document.getElementsByTagName('html')[0].lang) {
			phpjs.locale = document.getElementsByTagName('html')[0].lang;
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
		locale = getenv(category) || getenv('LANG');
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