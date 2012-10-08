*[Brett Zamir](http://bahai-library.com)* on 2009-01-17 05:56:01  
Sorry not to think of it earlier... Here are asort() and arsort() updated with sort_flags infrastructure and SORT_REGULAR added. 

SORT_STRING (as well as natsort and natcasesort) might also be integrated into all of these functions by adapting the code at http://sourcefrog.net/projects/natsort/natcompare.js (note that the URL is not a typo), but I don't know how you want to do it (and it would need a little tweaking, at least for case insensitive sorts, but it is based on the same algorithm used by PHP).

I've also copied the same infrastructure for sort(), and rsort()  (and sped up rsort())

```
function asort(inputArr, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %          note: The examples are correct, this is a new way
    // %          note: Credits to: http://javascript.internet.com/math-related/bubble-sort.html 
    // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: asort(data);
    // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    // *     returns 1: true
	
	var valArr=[], keyArr=[], k, i, ret, sorter;

	switch (sort_flags) {
		case 'SORT_STRING': // compare items as strings
		case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
			throw 'Not implemented yet';
		case 'SORT_NUMERIC': // compare items numerically
			sorter = function (a, b) {
				return(a - b);
			};
			break;
		case 'SORT_REGULAR': // compare items normally (don't change types)
		default:
			sorter = function (a, b) {
				if (a &gt; b)
					return 1;
				if (a &lt; b)
					return -1;
				return 0;
			};
			break;
	}

    var bubbleSort = function(keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i &gt;= 0; i--) {
            for (j = 0; j &lt;= i; j++) {
                ret = sorter(inputArr[j+1], inputArr[j]);
                if (ret &gt; 0) {
                    tempValue     = inputArr[j];
                    inputArr[j]   = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    tempKeyVal    = keyArr[j];
                    keyArr[j]     = keyArr[j+1];
                    keyArr[j+1]   = tempKeyVal;
                }
            }
        }
    };
  
    // Get key and value arrays
    for (k in inputArr) { 
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k] ;
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr); 
    } catch(e) {
        return false;
    }
 
    // Repopulate the old array
    for (i = 0; i &lt; valArr.length; i++) {  
        inputArr[keyArr[i]] = valArr[i];
    }
    
    return true;
}

function sort (inputArr, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir
    // *     example 1: sort(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 2: sort(fruits);
    // *     returns 2: true
    // *     results 2: fruits == {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
 
    var valArr = [], keyArr=[];
    var k = '', i = 0;
    
    for (k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        delete inputArr[k] ;
    }
	
	switch (sort_flags) {
		case 'SORT_STRING': // compare items as strings
		case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
			throw 'Not implemented yet';
		case 'SORT_NUMERIC': // compare items numerically
			sorter = function (a, b) {
				return(a - b);
			};
			break;
		case 'SORT_REGULAR': // compare items normally (don't change types)
		default:
			sorter = function (a, b) {
				if (a &gt; b)
					return 1;
				if (a &lt; b)
					return -1;
				return 0;
			};
			break;
	}
    valArr.sort(sorter);
 
    for (i = 0; i &lt; valArr.length; i++) { // Repopulate the old array
        inputArr[i] = valArr[i];
    }
    return true;
}


function rsort (inputArr, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir
    // *     example 1: rsort(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 2: rsort(fruits);
    // *     returns 2: true
    // *     results 2: fruits == {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
 
    var valArr = [], keyArr=[];
    var k = '', i = 0;
    
    for (k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        delete inputArr[k] ;
    }
 
    switch (sort_flags) {
		case 'SORT_STRING': // compare items as strings
		case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
			throw 'Not implemented yet';
		case 'SORT_NUMERIC': // compare items numerically
			sorter = function (a, b) {
				return(b - a);
			};
			break;
		case 'SORT_REGULAR': // compare items normally (don't change types)
		default:
			sorter = function (a, b) {
				if (a &lt; b)
					return 1;
				if (a &gt; b)
					return -1;
				return 0;
			};
			break;
	}
    valArr.sort(sorter);
 
    for (i = 0; i &lt; valArr.length; i++) { // Repopulate the old array
        inputArr[i] = valArr[i];
    }
    return true;
}
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-17 06:01:49  
Sorry... the sort() and rsort() I just updated can be used, but asort() needs to be fixed to the following, and I forgot arsort():

function asort(inputArr, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %          note: The examples are correct, this is a new way
    // %          note: Credits to: http://javascript.internet.com/math-related/bubble-sort.html 
    // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: asort(data);
    // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    // *     returns 1: true
	
	var valArr=[], keyArr=[], k, i, ret, sorter;

	switch (sort_flags) {
		case 'SORT_STRING': // compare items as strings
		case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
			throw 'Not implemented yet';
		case 'SORT_NUMERIC': // compare items numerically
			sorter = function (a, b) {
				return(a - b);
			};
			break;
		case 'SORT_REGULAR': // compare items normally (don't change types)
		default:
			sorter = function (a, b) {
				if (a &gt; b)
					return 1;
				if (a &lt; b)
					return -1;
				return 0;
			};
			break;
	}

    var bubbleSort = function(keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i &gt;= 0; i--) {
            for (j = 0; j &lt;= i; j++) {
                ret = sorter(inputArr[j+1], inputArr[j]);
                if (ret &lt; 0) {
                    tempValue     = inputArr[j];
                    inputArr[j]   = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    tempKeyVal    = keyArr[j];
                    keyArr[j]     = keyArr[j+1];
                    keyArr[j+1]   = tempKeyVal;
                }
            }
        }
    };
  
    // Get key and value arrays
    for (k in inputArr) { 
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k] ;
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr); 
    } catch(e) {
        return false;
    }
 
    // Repopulate the old array
    for (i = 0; i &lt; valArr.length; i++) {  
        inputArr[keyArr[i]] = valArr[i];
    }
    
    return true;
}

function arsort(inputArr, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %          note: The examples are correct, this is a new way
    // %          note: Credits to: http://javascript.internet.com/math-related/bubble-sort.html 
    // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: asort(data);
    // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    // *     returns 1: true
	
	var valArr=[], keyArr=[], k, i, ret, sorter;

	switch (sort_flags) {
		case 'SORT_STRING': // compare items as strings
		case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
			throw 'Not implemented yet';
		case 'SORT_NUMERIC': // compare items numerically
			sorter = function (a, b) {
				return(a - b);
			};
			break;
		case 'SORT_REGULAR': // compare items normally (don't change types)
		default:
			sorter = function (a, b) {
				if (a &gt; b)
					return 1;
				if (a &lt; b)
					return -1;
				return 0;
			};
			break;
	}

    var bubbleSort = function(keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i &gt;= 0; i--) {
            for (j = 0; j &lt;= i; j++) {
                ret = sorter(inputArr[j+1], inputArr[j]);
                if (ret &gt; 0) {
                    tempValue     = inputArr[j];
                    inputArr[j]   = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    tempKeyVal    = keyArr[j];
                    keyArr[j]     = keyArr[j+1];
                    keyArr[j+1]   = tempKeyVal;
                }
            }
        }
    };
  
    // Get key and value arrays
    for (k in inputArr) { 
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k] ;
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr); 
    } catch(e) {
        return false;
    }
 
    // Repopulate the old array
    for (i = 0; i &lt; valArr.length; i++) {  
        inputArr[keyArr[i]] = valArr[i];
    }
    
    return true;
}

```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-17 13:48:27  
@ Brett Zamir: Wicked!
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-18 03:05:48  
Sorry, in rsort(), I neglected to add a variable declaration for 'sorter' at the top, so it is a global now.

On the good side, I figured out there is an easy way to get to sort by the locale, though there's apparently no way in regular JavaScript to change the locale, as there is in PHP.

You can replace the SORT_STRING and SORT_LOCALE_STRING in all sort functions (except for usort, uksort, uasort which don't have them) now with the following:

(for krsort and rsort only:)

```
		case 'SORT_STRING': // compare items as strings
			throw 'Not implemented yet';
		case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale
			sorter = function (a, b) {
				return(b.localeCompare(a));
			};
			break;
```

For asort, arsort, ksort, and sort:

```
		case 'SORT_STRING': // compare items as strings
			throw 'Not implemented yet';
		case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale
			sorter = function (a, b) {
				return(a.localeCompare(b));
			};
			break;
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-22 12:59:37  
Now the sorting functions can be made complete with my submissions below (and its dependency on strnatcmp--thanks Onno!) and with with SORT_LOCALE patches in my earlier comment:

For asort, arsort, ksort, and sortï¼š

    switch (sort_flags) {
        case 'SORT_STRING': // compare items as strings
            sorter = strnatcmp;
            break;

or in the case ofã€€krsort and rsort

```    switch (sort_flags) {
        case 'SORT_STRING': // compare items as strings
            sorter = function (a,b) {
                    return strnatcmp(b,a);
            }
            break;```

FYI, PHP's own algorithm for sorting naturally is available in a JavaScript function (but not a case-sensitive version) at http://sourcefrog.net/projects/natsort/natcompare.js . I presume yours is just as good, Onno, and seems to work just fine, but for your reference, it's there in case you think you may have missed something.

We can also get natsort as a derivative of asort, also using strnatcmp (but don't be thrown off by the fact that this function (and natcasesort discussed below) are supposed to preserve keys, and as such won't be able to make a difference with JavaScript arrays as they are expected to be passed by reference--but they will work with ).

The following depends on strnatcmp which depends on strcmp:

```
$array1 = {a:&quot;img12.png&quot;, b:&quot;img10.png&quot;, c:&quot;img2.png&quot;, d:&quot;img1.png&quot;};
natsort($array1);
/*
d: img1.png
c: img2.png
b: img10.png
a: img12.png
*/


function natsort(inputArr) { 
    var valArr=[], keyArr=[], k, i, ret;
  
    var bubbleSort = function(keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i &gt;= 0; i--) {
            for (j = 0; j &lt;= i; j++) {
                ret = strnatcmp(inputArr[j+1], inputArr[j]);
                if (ret &lt; 0) {
                    tempValue = inputArr[j];
                    inputArr[j] = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j+1];
                    keyArr[j+1] = tempKeyVal;
                }
            }
        }
    };
 
    // Get key and value arrays
    for (k in inputArr) {
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k] ;
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr);
    } catch(e) {
        return false;
    }
 
    // Repopulate the old array
    for (i = 0; i &lt; valArr.length; i++) {
        inputArr[keyArr[i]] = valArr[i];
    }
 
    return true;
}
```

Now I'm fairly certain natcasesort should work as follows, but I believe there must be a bug in strncasecmp (which returns 0 at each iteration), since it isn't working:

```
$array1 = {a:'IMG0.png', b:'img12.png', c:'img10.png', d:'img2.png', e:'img1.png', f:'IMG3.png'}; 
natcasesort($array1);
/* Should be:
    0: IMG0.png
    4: img1.png
    3: img2.png
    5: IMG3.png
    2: img10.png
    1: img12.png
*/

// Depends on strncasecmp
function natcasesort(inputArr) { 
    var valArr=[], keyArr=[], k, i, ret;
  
    var bubbleSort = function(keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i &gt;= 0; i--) {
            for (j = 0; j &lt;= i; j++) {
                ret = strncasecmp(inputArr[j+1], inputArr[j]);
                if (ret &lt; 0) {
                    tempValue = inputArr[j];
                    inputArr[j] = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j+1];
                    keyArr[j+1] = tempKeyVal;
                }
            }
        }
    };
 
    // Get key and value arrays
    for (k in inputArr) {
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k] ;
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr);
    } catch(e) {
        return false;
    }
 
    // Repopulate the old array
    for (i = 0; i &lt; valArr.length; i++) {
        inputArr[keyArr[i]] = valArr[i];
    }
 
    return true;
}
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-22 13:10:05  
array_multisort is the only other array function left... (though some other array functions still have to support objects and maybe they need to be reviewed for missing features)...
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-22 13:12:54  
Sorry, actually my fault.... natcasesort should include strnatcasecmp (which isn't implemented yet) instead of strncasecmp... Then that one should work... :)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-22 13:36:16  
Ok, now here it is... here's strnatcasecmp and natcasesort (revised to call the former) with an example demonstration. This is based on the algorithm used by PHP, and the strnatcasecmp should include all of the credits/license at http://sourcefrog.net/projects/natsort/natcompare.js (I changed it slightly, just changing to lower case for case-insensitive comparison and shortening parts of the rest of the code somewhat

```
$array1 = {0:'IMG0.png', 1:'img12.png', 2:'img10.png', 3:'img2.png', 4:'img1.png', 5:'IMG3.png'}; 

natcasesort($array1);
whatIs($array1)
/* Should be:
    0: IMG0.png
    4: img1.png
    3: img2.png
    5: IMG3.png
    2: img10.png
    1: img12.png
*/
 
// Depends on strncasecmp
function natcasesort(inputArr) { 
    var valArr=[], keyArr=[], k, i, ret;
  
    var bubbleSort = function(keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i &gt;= 0; i--) {
            for (j = 0; j &lt;= i; j++) {
                ret = strnatcasecmp(inputArr[j+1], inputArr[j]);
                if (ret &lt; 0) {
                    tempValue = inputArr[j];
                    inputArr[j] = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j+1];
                    keyArr[j+1] = tempKeyVal;
                }
            }
        }
    };
 
    // Get key and value arrays
    for (k in inputArr) {
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k] ;
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr);
    } catch(e) {
        return false;
    }
 
    // Repopulate the old array
    for (i = 0; i &lt; valArr.length; i++) {
        inputArr[keyArr[i]] = valArr[i];
    }
 
    return true;
}
function strnatcasecmp(a,b) {
	a = a.toLowerCase();
	b = b.toLowerCase();

	function isWhitespaceChar(a) {
		return a.charCodeAt(0) &lt;= 32;
	}

	function isDigitChar(a) {
		var charCode = a.charCodeAt(0);
		return ( charCode &gt;= 48  &amp;&amp; charCode &lt;= 57 );
	}

	function compareRight(a,b) {
		var bias = 0;
		var ia = 0;
		var ib = 0;

		var ca;
		var cb;

		// The longest run of digits wins.  That aside, the greatest
		// value wins, but we can't know that it will until we've scanned
		// both numbers to know that they have the same magnitude, so we
		// remember it in BIAS.
		for (;; ia++, ib++) {
			ca = a.charAt(ia);
			cb = b.charAt(ib);

			if (!isDigitChar(ca)
					&amp;&amp; !isDigitChar(cb)) {
				return bias;
			} else if (!isDigitChar(ca)) {
				return -1;
			} else if (!isDigitChar(cb)) {
				return +1;
			} else if (ca &lt; cb) {
				if (bias == 0) {
					bias = -1;
				}
			} else if (ca &gt; cb) {
				if (bias == 0)
					bias = +1;
			} else if (ca == 0 &amp;&amp; cb == 0) {
				return bias;
			}
		}
	}

    var ia = 0, ib = 0;
	var nza = 0, nzb = 0;
	var ca, cb;
	var result;

    while (true) {
        // only count the number of zeroes leading the last number compared
        nza = nzb = 0;

        ca = a.charAt(ia);
        cb = b.charAt(ib);

        // skip over leading spaces or zeros
        while ( isWhitespaceChar( ca ) || ca =='0' ) {
            if (ca == '0') {
                nza++;
            } else {
                // only count consecutive zeroes
                nza = 0;
            }

            ca = a.charAt(++ia);
        }

        while ( isWhitespaceChar( cb ) || cb == '0') {
            if (cb == '0') {
                nzb++;
            } else {
                // only count consecutive zeroes
                nzb = 0;
            }

            cb = b.charAt(++ib);
        }

        // process run of digits
        if (isDigitChar(ca) &amp;&amp; isDigitChar(cb)) {
            if ((result = compareRight(a.substring(ia), b.substring(ib))) != 0) {
                return result;
            }
        }

        if (ca == 0 &amp;&amp; cb == 0) {
            // The strings compare the same.  Perhaps the caller
            // will want to call strcmp to break the tie.
            return nza - nzb;
        }

        if (ca &lt; cb) {
            return -1;
        } else if (ca &gt; cb) {
            return +1;
        }

        ++ia; ++ib;
    }
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-25 13:35:15  
@ Brett Zamir: Wow. Amazing work again Brett, you're an unstoppable force.

About strnatcasecmp:
I copied the full list of names for credits. The disclaimer part of the license is already covered by PHP.JS' license, I think. I made a minor change which I think will prevent the arguments to be overwritten.

Everything else is just added, tested and just plain awesome.
---------------------------------------
*[Tom](http://imp.airy.me)* on 2010-10-13 15:03:10  
Doesn't work in Chrome 6
---------------------------------------
*[Tom](http://imp.airy.me)* on 2010-10-13 15:45:38  
http://jsfiddle.net/kolor/Nt39S/

some browsers dont allow custom ordering of array elements
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-10-18 18:08:57  
@Tom: Thanks for pointing that out... For Chrome,  http://code.google.com/p/v8/issues/detail?id=164 but it seems browsers are rushing for speed over developer convenience, esp. with, as I recall, Microsoft not willing to allow a fixed iteration order into ECMAScript (their iteration order is apparently predictable until you try deleting properties).  

But we do need a note there for sure--and I think Kevin, we ought to consider supporting (maybe via ini_set) an alternative "associative array" structure, such as "[{key1:val1}, {key2:val2}]", as awkward, cumbersome and annoying as it is. Support for such a structure should be useful in itself, not to mention provide predictable cross-browser support for these functions.
---------------------------------------
