function setlocale (category, locale) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// +   improved by: Blues at http://hacks.bluesmoon.info/strftime/strftime.js
	// +   improved by: YUI Library: http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html
	// -    depends on: getenv
	// %          note 1: Is extensible, but currently only implements locales en,
    // %          note 1: en-US, en-GB, en-AU, fr, and fr-CA for LC_TIME only, and C for LC_CTYPE
    // %          note 2: Uses global: php_js to store locale info
	// *     example 1: setlocale('LC_ALL', 'en-US');
	// *     returns 1: 'en-US'

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
            }
        };
		phpjs.locales['en-US'] = _copy(phpjs.locales.en);
		phpjs.locales['en-US']['LC_TIME'] = {
            c : '%a %d %b %Y %r %Z',
            x : '%D',
            X : '%r'
        };
		phpjs.locales['en-GB'] = _copy(phpjs.locales.en);
		phpjs.locales['en-GB']['LC_TIME'] = {
            r : '%l:%M:%S %P %Z'
        };
		phpjs.locales['en-AU'] = _copy(phpjs.locales['en-GB']);
        phpjs.locales.C = _copy(phpjs.locales.en); // Assume C locale is like English (?) (We need C locale for LC_CTYPE)

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
		phpjs.locales['fr-CA'] = _copy(phpjs.locales['fr']);
		phpjs.locales['fr-CA']['LC_TIME'] = {
            x : '%Y-%m-%d'
        };
	}
	if (!phpjs.locale) {
		phpjs.locale = 'en-US';
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

	// Fix locale if declared locale hasn't been defined
	if(!(phpjs.locale in phpjs.locales)) {
		if(phpjs.locale.replace(/-[a-zA-Z]+$/, '') in phpjs.locales) {
			phpjs.locale = phpjs.locale.replace(/-[a-zA-Z]+$/, '');
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