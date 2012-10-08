*[noname]()* on 2008-10-25 17:32:15  
You need to change position for some lines.
From:
```
    entities['60'] = '&amp;lt;';
    entities['62'] = '&amp;gt;';
    entities['38'] = '&amp;amp;';
```

To:
```
    entities['38'] = '&amp;amp;';
    entities['60'] = '&amp;lt;';
    entities['62'] = '&amp;gt;';
```

Because it will be encode wrong. Example:
&lt;a&gt;  =&gt; &amp;amp;lt;a&amp;amp;gt;
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-03 10:23:51  
@ noname: I've committed your fix noname, thanks!
---------------------------------------
*[GreLI]()* on 2008-11-30 16:39:50  
Instead of this:
```
entities['38'] = '&amp;amp;amp;';
entities['60'] = '&amp;amp;lt;';
entities['62'] = '&amp;amp;gt;';
```
You can write
```
entities = {
'38': '&amp;amp;amp;',
'60': '&amp;amp;lt;',
'62': '&amp;amp;gt;'
}
```
to reduce size and increase readability.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-01 09:34:04  
@ GreLI: It was easier developing (read: copy &amp; pasting ;) that way. We might want to switch back  to reduce it's size though, that's a good point, thanks.
---------------------------------------
*[Alex]()* on 2009-02-20 13:09:05  
need replace:
entities['39'] = '&amp;#039;';
to
entities['39'] = '&amp;#39;';
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-21 12:50:51  
@ Alex: Ok I've changed it in SVN, can you tell me why is that?
---------------------------------------
*[Marco]()* on 2009-02-23 16:22:52  
I suggest that you add a ; after the following code so that the script can be packed to one line (for example with: http://dean.edwards.name/packer/)

```symbol = String.fromCharCode(decimal)```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-25 16:36:30  
@ Marco: Excellent suggestion, thanks!
---------------------------------------
*[madipta](http://www.madipta.com)* on 2009-02-26 02:56:45  
i think you need to move entities['38'] on top

```

    entities['38'] = '&amp;';

    if (useQuoteStyle != 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
 
    if (useQuoteStyle == 'ENT_QUOTES') {
        entities['39'] = ''';
    }
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-03-02 14:37:50  
@ madipta: Thank you: fixed.
---------------------------------------
*[KELAN]()* on 2009-04-30 07:53:00  
```
    useTable      = (table ? table.toUpperCase() : 'HTML_SPECIALCHARS');
    useQuoteStyle = (quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT');
    
    // Translate arguments
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';
    
    // Map numbers to strings for compatibilty with PHP constants
    if (!isNaN(useTable)) {
        useTable = constMappingTable[useTable];
    }
    if (!isNaN(useQuoteStyle)) {
        useQuoteStyle = constMappingQuoteStyle[useQuoteStyle];
    }

```

==> get_html_translation_table(0,2);

```
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';
	useTable 	  = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
	useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[table] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

```
---------------------------------------
*[KELAN]()* on 2009-04-30 07:55:27  
useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-04-30 09:27:22  
Thanks... Done in SVN. I also simplified the if/else following
---------------------------------------
*[Ratheous]()* on 2009-07-04 23:35:45  
Because the ampersand is used in all entities, and htmlspecialchars etc. washes the string through the split and join repeatedly, entities['38'] should be the first item in the array and the first character replaced. Thus any ampersand already in the string will be correctly replaced but those introduced by the replacement of other characters will remain intact. 

Someone may have commented on this previously; it's hard to tell because the comments are a bit hard to follow, but regardless, it hasn't been fixed.

Moving it up to line 40 solves the problem in my code, but if I remember correctly the use of for...in doesn't guarantee iterators in a particular order so it might be better to take it out of the entities table and replace it separately (though in my experience they come out in the order they were assigned).

P.S. Just as an observation, you use 'histogram' as a variable name in a number of functions for what is actually a hash table...

his?to?gram?/?h?st??græm/ 

–noun Statistics.
a graph of a frequency distribution in which rectangles with bases on the horizontal axis are given widths equal to the class intervals and heights equal to the corresponding frequencies.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-07-05 03:25:18  
It was fixed recently in subversion (SVN). It just needed some time to be made available.

Yes, it's true that ECMAScript doesn't guarantee the order of execution within objects, but I understand that all major browsers maintain the order (and PHP.JS in general depends on this, being as we rely on objects for associative array-like behavior).

Good point about "histogram". Maybe someone copied it from count_chars() which looks like that one used the word correctly. Anyways, I fixed it for the other functions (entity ones) where it was indeed not correct.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-08 16:34:24  
Great stuff!
---------------------------------------
*[Roger]()* on 2009-10-20 16:51:08  
Things can be so easy:
```
function toHTMLEntity(str) {
	var s = str.split("");
	var ret = "";
	for (i = 0; i < s.length; i++) {
		var c = s[i].charCodeAt(0);
		if(c > 127) ret += ("&#" + c + ";");
		else ret += s[i];
	}
	return ret;
}

```

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-20 20:06:18  
@Roger: Yes, things can be that easy, if that's what you are trying to do. However, your function creating numeric character references has no relation to substituting for get_html_translation_table() for those who need it (nor for htmlentities() or htmlspecialchars() which depend on it). 
---------------------------------------
*[Nick Kolosov](http://sammy.ru)* on 2009-11-17 11:09:51  
Entities order must depend on the direction of translation.
With conversion <a> => &lt;a>
  entities['38'] must be the first one.
With conversion &lt;a> => <a>
  entities['38'] must be the last one.

Current version with html_entity_decode converts &amp;nbsp; to space instead of &nbsp;. Its' wrong.

May be html_entity_decode must be corrected, js is not my s trong side, don't know how to reverse hash order

---------------------------------------
*[Nick Kolosov](http://sammy.ru)* on 2009-11-17 11:23:32  
Ups, blog eated html tags. Error example:
```
html_entity_decode('&amp;nbsp;') = ' ' instead of '&nbsp'
```
---------------------------------------
*[Fox]()* on 2009-12-02 10:23:07  
Sure it's not a good solution, but to answer to Nick Kolosov, and as I had the same problem with using :
- htmlspecialchars => encode
- html_entity_decode => decode
And my aim was to not add parameters in functions (keep functions like php). I decided to add a small code in decode functions in order to fix the problem.
in html_entity_decode function before :
```
  for (symbol in hash_map) {
```
add the following lines :
```
  // BOF : fix &amp; problem
  delete(hash_map['&']);
  hash_map['&']	= '&amp;';
  // EOF : fix &amp; problem
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-12-14 15:34:38  
@ Nick Kolosov: Thanks for reporting.

@ Fox: Thanks for fixing : )

Will be online shortly folks.
---------------------------------------
*[Pitouli]()* on 2011-06-14 14:52:26  
A bigger list for replacement :

```
entities['38'] = '&amp;';
entities['60'] = '&lt;';
entities['62'] = '&gt;';

entities['94'] = '&circ;';
entities['126'] = '&tilde;';

entities['130'] = '&sbquo;';	// Single Low-9 Quotation Mark
entities['131'] = '&fnof;';		// Latin Small Letter F With Hook
entities['132'] = '&bdquo;';	// Double Low-9 Quotation Mark
entities['133'] = '&hellip;';	// Horizontal Ellipsis
entities['134'] = '&dagger;';	// Dagger
entities['135'] = '&Dagger;';	// Double Dagger
entities['136'] = '&circ;';		// Modifier Letter Circumflex Accent
entities['137'] = '&permil;';	// Per Mille Sign
entities['138'] = '&Scaron;';	// Latin Capital Letter S With Caron
entities['139'] = '&lsaquo;';	// Single Left-Pointing Angle Quotation Mark
entities['140'] = '&OElig;';	// Latin Capital Ligature OE
entities['145'] = '&lsquo;';	// Left Single Quotation Mark
entities['146'] = '&rsquo;';	// Right Single Quotation Mark
entities['147'] = '&ldquo;';	// Left Double Quotation Mark
entities['148'] = '&rdquo;';	// Right Double Quotation Mark
entities['149'] = '&bull;';		// Bullet
entities['150'] = '&ndash;';	// En Dash
entities['151'] = '&mdash;';	// Em Dash
entities['152'] = '&tilde;';	// Small Tilde
entities['153'] = '&trade;';	// Trade Mark Sign
entities['154'] = '&scaron;';	// Latin Small Letter S With Caron
entities['155'] = '&rsaquo;';	// Single Right-Pointing Angle Quotation Mark
entities['156'] = '&oelig;';	// Latin Small Ligature OE
entities['159'] = '&Yuml;';		// Latin Capital Letter Y With Diaeresis

entities['160'] = '&nbsp;';		// Non-breaking space
entities['161'] = '&iexcl;';		// Inverted exclamation mark
entities['162'] = '&cent;';		// Cent sign
entities['163'] = '&pound;';		// Pound sign
entities['164'] = '&curren;';	// Currency sign
entities['165'] = '&yen;';		// Yen sign
entities['166'] = '&brvbar;';	// Broken vertical bar
entities['167'] = '&sect;';		// Section sign
entities['168'] = '&uml;';		// Diaeresis
entities['169'] = '&copy;';		// Copyright sign
entities['170'] = '&ordf;';		// Feminine ordinal indicator
entities['171'] = '&laquo;';		// Left-pointing double angle quotation mark
entities['172'] = '&not;';		// Not sign
entities['173'] = '&shy;';		// Soft hyphen
entities['174'] = '&reg;';		// Registered sign
entities['175'] = '&macr;';		// Macron
entities['176'] = '&deg;';		// Degree sign
entities['177'] = '&plusmn;';	// Plus-minus sign
entities['178'] = '&sup2;';		// Superscript two
entities['179'] = '&sup3;';		// Superscript three
entities['180'] = '&acute;';		// Acute accent
entities['181'] = '&micro;';		// Micro sign
entities['182'] = '&para;';		// Pilcrow sign
entities['183'] = '&middot;';	// Middle dot
entities['184'] = '&cedil;';		// Cedilla
entities['185'] = '&sup1;';		// Superscript one
entities['186'] = '&ordm;';		// Masculine ordinal indicator
entities['187'] = '&raquo;';		// Right-pointing double angle quotation mark
entities['188'] = '&frac14;';	// Vulgar fraction one-quarter
entities['189'] = '&frac12;';	// Vulgar fraction one-half
entities['190'] = '&frac34;';	// Vulgar fraction three-quarters
entities['191'] = '&iquest;';	// Inverted question mark
entities['192'] = '&Agrave;';	// A with grave
entities['193'] = '&Aacute;';	// A with acute
entities['194'] = '&Acirc;';		// A with circumflex
entities['195'] = '&Atilde;';	// A with tilde
entities['196'] = '&Auml;';		// A with diaeresis
entities['197'] = '&Aring;';		// A with ring above
entities['198'] = '&AElig;';		// AE
entities['199'] = '&Ccedil;';	// C with cedilla
entities['200'] = '&Egrave;';	// E with grave
entities['201'] = '&Eacute;';	// E with acute
entities['202'] = '&Ecirc;';		// E with circumflex
entities['203'] = '&Euml;';		// E with diaeresis
entities['204'] = '&Igrave;';	// I with grave
entities['205'] = '&Iacute;';	// I with acute
entities['206'] = '&Icirc;';		// I with circumflex
entities['207'] = '&Iuml;';		// I with diaeresis
entities['208'] = '&ETH;';		// Eth
entities['209'] = '&Ntilde;';	// N with tilde
entities['210'] = '&Ograve;';	// O with grave
entities['211'] = '&Oacute;';	// O with acute
entities['212'] = '&Ocirc;';		// O with circumflex
entities['213'] = '&Otilde;';	// O with tilde
entities['214'] = '&Ouml;';		// O with diaeresis
entities['215'] = '&times;';		// Multiplication sign
entities['216'] = '&Oslash;';	// O with stroke
entities['217'] = '&Ugrave;';	// U with grave
entities['218'] = '&Uacute;';	// U with acute
entities['219'] = '&Ucirc;';		// U with circumflex
entities['220'] = '&Uuml;';		// U with diaeresis
entities['221'] = '&Yacute;';	// Y with acute
entities['222'] = '&THORN;';		// Thorn
entities['223'] = '&szlig;';		// Sharp s. Also known as ess-zed
entities['224'] = '&agrave;';	// a with grave
entities['225'] = '&aacute;';	// a with acute
entities['226'] = '&acirc;';		// a with circumflex
entities['227'] = '&atilde;';	// a with tilde
entities['228'] = '&auml;';		// a with diaeresis
entities['229'] = '&aring;';		// a with ring above
entities['230'] = '&aelig;';		// ae. Also known as ligature ae
entities['231'] = '&ccedil;';	// c with cedilla
entities['232'] = '&egrave;';	// e with grave
entities['233'] = '&eacute;';	// e with acute
entities['234'] = '&ecirc;';		// e with circumflex
entities['235'] = '&euml;';		// e with diaeresis
entities['236'] = '&igrave;';	// i with grave
entities['237'] = '&iacute;';	// i with acute
entities['238'] = '&icirc;';		// i with circumflex
entities['239'] = '&iuml;';		// i with diaeresis
entities['240'] = '&eth;';		// eth
entities['241'] = '&ntilde;';	// n with tilde
entities['242'] = '&ograve;';	// o with grave
entities['243'] = '&oacute;';	// o with acute
entities['244'] = '&ocirc;';		// o with circumflex
entities['245'] = '&otilde;';	// o with tilde
entities['246'] = '&ouml;';		// o with diaeresis
entities['247'] = '&divide;';	// Division sign
entities['248'] = '&oslash;';	// o with stroke. Also known as o with slash
entities['249'] = '&ugrave;';	// u with grave
entities['250'] = '&uacute;';	// u with acute
entities['251'] = '&ucirc;';		// u with circumflex
entities['252'] = '&uuml;';		// u with diaeresis
entities['253'] = '&yacute;';	// y with acute
entities['254'] = '&thorn;';		// thorn
entities['255'] = '&yuml;';		// y with diaeresis
entities['264'] = '&#264;';		// Latin capital letter C with circumflex
entities['265'] = '&#265;';		// Latin small letter c with circumflex
entities['338'] = '&OElig;';		// Latin capital ligature OE
entities['339'] = '&oelig;';		// Latin small ligature oe
entities['352'] = '&Scaron;';	// Latin capital letter S with caron
entities['353'] = '&scaron;';	// Latin small letter s with caron
entities['372'] = '&#372;';		// Latin capital letter W with circumflex
entities['373'] = '&#373;';		// Latin small letter w with circumflex
entities['374'] = '&#374;';		// Latin capital letter Y with circumflex
entities['375'] = '&#375;';		// Latin small letter y with circumflex
entities['376'] = '&Yuml;';		// Latin capital letter Y with diaeresis
entities['402'] = '&fnof;';		// Latin small f with hook, function, florin
entities['710'] = '&circ;';		// Modifier letter circumflex accent
entities['732'] = '&tilde;';		// Small tilde
entities['913'] = '&Alpha;';		// Alpha
entities['914'] = '&Beta;';		// Beta
entities['915'] = '&Gamma;';		// Gamma
entities['916'] = '&Delta;';		// Delta
entities['917'] = '&Epsilon;';	// Epsilon
entities['918'] = '&Zeta;';		// Zeta
entities['919'] = '&Eta;';		// Eta
entities['920'] = '&Theta;';		// Theta
entities['921'] = '&Iota;';		// Iota
entities['922'] = '&Kappa;';		// Kappa
entities['923'] = '&Lambda;';	// Lambda
entities['924'] = '&Mu;';		// Mu
entities['925'] = '&Nu;';		// Nu
entities['926'] = '&Xi;';		// Xi
entities['927'] = '&Omicron;';	// Omicron
entities['928'] = '&Pi;';		// Pi
entities['929'] = '&Rho;';		// Rho
entities['931'] = '&Sigma;';		// Sigma
entities['932'] = '&Tau;';		// Tau
entities['933'] = '&Upsilon;';	// Upsilon
entities['934'] = '&Phi;';		// Phi
entities['935'] = '&Chi;';		// Chi
entities['936'] = '&Psi;';		// Psi
entities['937'] = '&Omega;';		// Omega
entities['945'] = '&alpha;';		// alpha
entities['946'] = '&beta;';		// beta
entities['947'] = '&gamma;';		// gamma
entities['948'] = '&delta;';		// delta
entities['949'] = '&epsilon;';	// epsilon
entities['950'] = '&zeta;';		// zeta
entities['951'] = '&eta;';		// eta
entities['952'] = '&theta;';		// theta
entities['953'] = '&iota;';		// iota
entities['954'] = '&kappa;';		// kappa
entities['955'] = '&lambda;';	// lambda
entities['956'] = '&mu;';		// mu
entities['957'] = '&nu;';		// nu
entities['958'] = '&xi;';		// xi
entities['959'] = '&omicron;';	// omicron
entities['960'] = '&pi;';		// pi
entities['961'] = '&rho;';		// rho
entities['962'] = '&sigmaf;';	// sigmaf
entities['963'] = '&sigma;';		// sigma
entities['964'] = '&tau;';		// tau
entities['965'] = '&upsilon;';	// upsilon
entities['966'] = '&phi;';		// phi
entities['967'] = '&chi;';		// chi
entities['968'] = '&psi;';		// psi
entities['969'] = '&omega;';		// omega
entities['977'] = '&thetasym;';	// Theta symbol
entities['978'] = '&upsih;';		// Greek upsilon with hook symbol
entities['982'] = '&piv;';		// Pi symbol
entities['8194'] = '&ensp;';		// En space
entities['8195'] = '&emsp;';		// Em space
entities['8201'] = '&thinsp;';	// Thin space
entities['8204'] = '&zwnj;';		// Zero width non-joiner
entities['8205'] = '&zwj;';		// Zero width joiner
entities['8206'] = '&lrm;';		// Left-to-right mark
entities['8207'] = '&rlm;';		// Right-to-left mark
entities['8211'] = '&ndash;';	// En dash
entities['8212'] = '&mdash;';	// Em dash
entities['8216'] = '&lsquo;';	// Left single quotation mark
entities['8217'] = '&rsquo;';	// Right single quotation mark
entities['8218'] = '&sbquo;';	// Single low-9 quotation mark
entities['8220'] = '&ldquo;';	// Left double quotation mark
entities['8221'] = '&rdquo;';	// Right double quotation mark
entities['8222'] = '&bdquo;';	// Double low-9 quotation mark
entities['8224'] = '&dagger;';	// Dagger
entities['8225'] = '&Dagger;';	// Double dagger
entities['8226'] = '&bull;';		// Bullet
entities['8230'] = '&hellip;';	// Horizontal ellipsis
entities['8240'] = '&permil;';	// Per mille sign
entities['8242'] = '&prime;';	// Prime
entities['8243'] = '&Prime;';	// Double Prime
entities['8249'] = '&lsaquo;';	// Single left-pointing angle quotation
entities['8250'] = '&rsaquo;';	// Single right-pointing angle quotation
entities['8254'] = '&oline;';	// Overline
entities['8260'] = '&frasl;';	// Fraction Slash
entities['8364'] = '&euro;';		// Euro sign
entities['8472'] = '&weierp;';	// Script capital
entities['8465'] = '&image;';	// Blackletter capital I
entities['8476'] = '&real;';		// Blackletter capital R
entities['8482'] = '&trade;';	// Trade mark sign
entities['8501'] = '&alefsym;';	// Alef symbol
entities['8592'] = '&larr;';		// Leftward arrow
entities['8593'] = '&uarr;';		// Upward arrow
entities['8594'] = '&rarr;';		// Rightward arrow
entities['8595'] = '&darr;';		// Downward arrow
entities['8596'] = '&harr;';		// Left right arrow
entities['8629'] = '&crarr;';	// Downward arrow with corner leftward. Also known as carriage return
entities['8656'] = '&lArr;';		// Leftward double arrow. ISO 10646 does not say that lArr is the same as the 'is implied by' arrow but also does not have any other character for that function. So ? lArr can be used for 'is implied by' as ISOtech suggests
entities['8657'] = '&uArr;';		// Upward double arrow
entities['8658'] = '&rArr;';		// Rightward double arrow. ISO 10646 does not say this is the 'implies' character but does not have another character with this function so ? rArr can be used for 'implies' as ISOtech suggests
entities['8659'] = '&dArr;';		// Downward double arrow
entities['8660'] = '&hArr;';		// Left-right double arrow
// Mathematical Operators
entities['8704'] = '&forall;';	// For all
entities['8706'] = '&part;';		// Partial differential
entities['8707'] = '&exist;';	// There exists
entities['8709'] = '&empty;';	// Empty set. Also known as null set and diameter
entities['8711'] = '&nabla;';	// Nabla. Also known as backward difference
entities['8712'] = '&isin;';		// Element of
entities['8713'] = '&notin;';	// Not an element of
entities['8715'] = '&ni;';		// Contains as member
entities['8719'] = '&prod;';		// N-ary product. Also known as product sign. Prod is not the same character as U+03A0 'greek capital letter pi' though the same glyph might be used for both
entities['8721'] = '&sum;';		// N-ary summation. Sum is not the same character as U+03A3 'greek capital letter sigma' though the same glyph might be used for both
entities['8722'] = '&minus;';	// Minus sign
entities['8727'] = '&lowast;';	// Asterisk operator
entities['8729'] = '&#8729;';	// Bullet operator
entities['8730'] = '&radic;';	// Square root. Also known as radical sign
entities['8733'] = '&prop;';		// Proportional to
entities['8734'] = '&infin;';	// Infinity
entities['8736'] = '&ang;';		// Angle
entities['8743'] = '&and;';		// Logical and. Also known as wedge
entities['8744'] = '&or;';		// Logical or. Also known as vee
entities['8745'] = '&cap;';		// Intersection. Also known as cap
entities['8746'] = '&cup;';		// Union. Also known as cup
entities['8747'] = '&int;';		// Integral
entities['8756'] = '&there4;';	// Therefore
entities['8764'] = '&sim;';		// tilde operator. Also known as varies with and similar to. The tilde operator is not the same character as the tilde, U+007E, although the same glyph might be used to represent both
entities['8773'] = '&cong;';		// Approximately equal to
entities['8776'] = '&asymp;';	// Almost equal to. Also known as asymptotic to
entities['8800'] = '&ne;';		// Not equal to
entities['8801'] = '&equiv;';	// Identical to
entities['8804'] = '&le;';		// Less-than or equal to
entities['8805'] = '&ge;';		// Greater-than or equal to
entities['8834'] = '&sub;';		// Subset of
entities['8835'] = '&sup;';		// Superset of. Note that nsup, 'not a superset of, U+2283' is not covered by the Symbol font encoding and is not included.
entities['8836'] = '&nsub;';		// Not a subset of
entities['8838'] = '&sube;';		// Subset of or equal to
entities['8839'] = '&supe;';		// Superset of or equal to
entities['8853'] = '&oplus;';	// Circled plus. Also known as direct sum
entities['8855'] = '&otimes;';	// Circled times. Also known as vector product
entities['8869'] = '&perp;';		// Up tack. Also known as orthogonal to and perpendicular
entities['8901'] = '&sdot;';		// Dot operator. The dot operator is not the same character as U+00B7 middle dot
// Miscellaneous Technical
entities['8968'] = '&lceil;';	// Left ceiling. Also known as an APL upstile
entities['8969'] = '&rceil;';	// Right ceiling
entities['8970'] = '&lfloor;';	// left floor. Also known as APL downstile
entities['8971'] = '&rfloor;';	// Right floor
entities['9001'] = '&lang;';		// Left-pointing angle bracket. Also known as bra. Lang is not the same character as U+003C 'less than'or U+2039 'single left-pointing angle quotation mark'
entities['9002'] = '&rang;';		// Right-pointing angle bracket. Also known as ket. Rang is not the same character as U+003E 'greater than' or U+203A 'single right-pointing angle quotation mark'
// Geometric Shapes
entities['9642'] = '&#9642;';	// Black small square
entities['9643'] = '&#9643;';	// White small square
entities['9674'] = '&loz;';		// Lozenge
// Miscellaneous Symbols
entities['9702'] = '&#9702;';	// White bullet
entities['9824'] = '&spades;';	// Black (filled) spade suit
entities['9827'] = '&clubs;';	// Black (filled) club suit. Also known as shamrock
entities['9829'] = '&hearts;';	// Black (filled) heart suit. Also known as shamrock
entities['9830'] = '&diams;';   // Black (filled) diamond suit
```
---------------------------------------
*[????? ????](http://an3m1.com/)* on 2012-04-23 14:51:17  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas   

---------------------------------------
