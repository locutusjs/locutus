*[Michael White]()* on 2008-03-01 07:33:49  
There is a bug in Safari - at least in Safari 3.0.4 that causes the combination of Math.abs(0).toFixed(x) where x seems to be any positive integer to provide erroneous output.

The sample code below contains problematic code at the top and a sample solution line at the end. The new code for the number_format() function actually is in a separate code block below this one.
```
var price = 0.00;
alert(Math.abs(price)); // Alerts: 0 - correct.
	
// Alerts: 0.00 in most browsers.
// In Safari 3.0.4 you get: 0.-0
alert(Math.abs(price).toFixed(2));
	
// However - If you skip the use of Math.abs() on a 0 value then the toFixed() function works correctly.
var new_price = 0;
alert(new_price.toFixed(2));
	
// Temp-fix ( I submitted this bug to Apple)
var num = 0;
var result = Math.abs(0).toFixed(1);
alert(result);
result = result.replace(/-/, 0);
alert(result);
```

Since this problem only occurs when working on a value of 0 (zero) to begin with we know that the hyphen character should be a 0 so we can simply replace it with a 0 if it is found.

```
// The easiest way to fix this is to simply modify the line that reads:
kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : &quot;&quot;);

// with the following line of code:
kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : &quot;&quot;);

// The only difference is the addition of .replace(/-/, 0) just before the slice() method is used.
// This tiny extra amount of processing should not be significant unless number_format() is run in very tight loops - and even then it can only be considered extra in browsers like IE, Opera, and Firefox since this appears to be a Safari only bug. Checking the browser seemed to be overkill in this instance.
```

I hope it helps!

Michael White - 2008
michael -a-t- crestidg.com
http://crestidg.com/
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-01 15:39:39  
@ Michael White: It sure did, thanks for taking the time to supply better code. I've updated the function!
---------------------------------------
*[Michael White]()* on 2008-03-01 17:26:33  
No problem. I love having these familiar PHP functions available. I have a sort of proposal for you, maybe you could contact me via email (michael -a-t- crestidg.com) so I can get you some more details. It probably wouldn't take too much time for us to do and it would benefit those who want to use the entire PHP.js package along side other JavaScript quite a lot.
---------------------------------------
*[Benjamin &quot;balupton&quot; Lupton]()* on 2008-03-20 05:21:49  
dec_point and thousands_sep defaults should be the other way round
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-20 15:05:56  
@ Benjamin Lupton: Thank you!
---------------------------------------
*[Allan Jensen]()* on 2008-03-28 15:57:35  
The function has a problem with negative numbers.

This:

number_format(-258.75, 2, &quot;,&quot;, &quot;.&quot;)

incorrectly gives:

-,258,75

Please help me fix this.
---------------------------------------
*[Allan Jensen]()* on 2008-03-28 23:19:53  
Fixed the problem with negative numbers myself. Function needs to look like this:

```
function number_format( number, decimals, dec_point, thousands_sep ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://crestidg.com)
    // +     bugfix by: Benjamin Lupton
	// +     bugfix by: Allan Jensen (http://www.winternet.no) (fixed formatting negative numbers)
    // *     example 1: number_format(1234.5678, 2, '.', '');
    // *     returns 1: 1234.57
 
    var i, j, kw, kd, km;
	var neg = &quot;&quot;;

	// Input sanitation &amp; defaults
	if ( isNaN(decimals = Math.abs(decimals)) ) {
		decimals = 2;
	}
	if (dec_point == undefined) {
		dec_point = &quot;.&quot;;
	}
	if (thousands_sep == undefined) {
		thousands_sep = &quot;,&quot;;
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + &quot;&quot;;
	if (i.substr(0,1) == &quot;-&quot;) {
		number = Math.abs(number);
		neg = &quot;-&quot;;
		i = i.substr(1);
	}

	if ((j = i.length) &gt; 3 ) {
		j = j % 3;
	} else {
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : &quot;&quot;);
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, &quot;$1&quot; + thousands_sep);
	//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : &quot;&quot;);
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : &quot;&quot;);
	return neg + km + kw + kd;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-29 10:39:31  
@ Allan Jensen: Wow thanks for fixing it!
---------------------------------------
*[Howard Yeend]()* on 2008-04-09 18:11:44  
yay for Allan Jensen. I just noticed the same bug he fixed. cheers dude.
---------------------------------------
*[Jonas Raoni]()* on 2008-04-12 20:10:46  
I corrected all of the bugs that I found:
- Negative numbers;
- Starting with zero;
- Rouding (when cutting the decimal places of &quot;0.9&quot; it should be 1 not 0).

And here is the last version of the code:

Number.prototype.formatMoney = function(c, d, t){
	var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? &quot;,&quot; : d, t = t == undefined ? &quot;.&quot; : t, s = n &lt; 0 ? &quot;-&quot; : &quot;&quot;,
	i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + &quot;&quot;, j = (j = i.length) &gt; 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : &quot;&quot;) + i.substr(j).replace(/(\d{3})(?=\d)/g, &quot;$1&quot; + t)
	+ (c ? d + Math.abs(n - i).toFixed(c).slice(2) : &quot;&quot;);
};
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-13 12:44:13  
@ Jonas Raoni: Thanks I've updated the function. I have one remark though. We generally compress code with packer &amp; jsmin to obtain bandwidth &amp; speed advantages, while maintaining readability so developers can more easily understand and update each others code.
---------------------------------------
*[Howard Yeend]()* on 2008-06-06 11:26:54  
just a comment; aren't the default values for dec_point and thou_sep the wrong way around?

by default it formats 12345.67 as 12.345,67

shouldn't it be 12,345.67 ?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-06-08 16:07:35  
@ Howard Yeend: Thanks for noticing. This function was revised, and that reimported a previously fixed bug. It's probably because in some countries (including my own), the dec_point and thou_sep are indeed the other way around compared to the english standard. Anyway. fixed again :)
---------------------------------------
*[Chad Smith](http://www.getasupplier.com)* on 2008-08-28 16:54:37  
Anyone else notice that if you just put in 1000 it doesn't format the number to 1,000?  But if you put in 1001 it formats correctly to 1,001.

Any idea what could make that happen?
---------------------------------------
*[Chad Smith](http://www.getasupplier.com)* on 2008-08-28 17:00:54  
Ignore my previous comment, I'm an idiot.  I was checking to see if it was larger than 1000 before it ran through the function.  Duh, sorry.

Love the script!
Chad
---------------------------------------
*[Mariusz]()* on 2008-11-04 13:05:26  
This method does not seem to work correctly with negative numbers, for example (to 2 decimal places):

-16038 returns: -160,38.00

-820 returns -,820.00
---------------------------------------
*[Mariusz]()* on 2008-11-04 13:09:18  
I take it back, got the latest version and all looks good.  Thanks to those involved with the fixes!
---------------------------------------
*[Cees](http://www.connectcase.nl)* on 2009-01-14 09:21:56  
This was so what I was looking for!!! Thanks, guys!!!
---------------------------------------
*[Memiux](http://memiux.com)* on 2009-01-15 19:45:18  
Thanks, It's so beautiful and tiny :)
---------------------------------------
*[Luke](http://lucassmith.name)* on 2009-01-16 09:31:46  
I attacked the same problem recently and came up with a similar solution
http://gist.github.com/47871

more lines, but fewer characters, and compresses (via YUI Compressor) to about 83% of the version above.  Take a look; there may be improvements to be made.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-16 22:49:57  
@ Luke: After I changed:

```
prec = !isFinite(+prec) ? 2 : Math.abs(prec);
```

To 

```
prec = !isFinite(+prec) ? 0 : Math.abs(prec);
```

..All test cases from the php manual worked perfectly. And since your code is a bit easier on the eyes as well, I'll include it in our project. Thanks a lot!
---------------------------------------
*[Diogo Resende](http://www.thinkdigital.pt)* on 2009-02-02 16:55:53  
It's not correct for numbers below 1000. It needs an else statement like this:
```
if (abs &gt; 1000) {
...
} else {
	s = abs.replace('.', ',');
}
```
---------------------------------------
*[Simon](n/a)* on 2009-02-02 16:57:38  
This does not work as is on IE6 and IE7, very simple to fix.

search 
   is not defined and ie throws an error.

so just add
var search; 
to the top of the script.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-02 23:40:32  
@ Diogo Resende: Confirmed. I've processed your fix. Thanks a lot!
---------------------------------------
*[Rival]()* on 2009-02-12 10:15:34  
- show thousand separator for number=1000
- decimal point for numbers lower than 1000 is undefined

note: for 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6

```
function number_format(number, decimals, dec_point, thousands_sep) {
    var n = number, prec = decimals;
    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep == &quot;undefined&quot;) ? ',' : thousands_sep;
    var dec = (typeof dec_point == &quot;undefined&quot;) ? '.' : dec_point;

    var s = (prec &gt; 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = Math.abs(n).toFixed(prec);
    var _, i;

    if (abs &gt;= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;
 
        _[0] = s.slice(0,i + (n &lt; 0)) +
              _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
 
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }
 
    return s;
}
```
---------------------------------------
*[Rival]()* on 2009-02-12 10:31:11  
cleanup
```
....
    var abs = Math.abs(s);
....
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-15 15:23:33  
@ Rival: Hey there, excellent work Rival! I've also added 2 test cases that cover your findings so we can't make that mistake again. Thanks!
---------------------------------------
*[Kheang Hok Chin](www.distantia.ca)* on 2009-05-22 16:32:30  
Hi, I have a question in regard to this comment: 
- bugfix by: Rival 
note 1: For 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6

Has this been fixed or does this mean that if a user using Firefox, Opera, Safari will always get the result 1000.5 when formatting the number 1000.55 to precision 1? 

While in IE it returns 1000.6 which is correct as number_format in PHP works the same way.

Is there a fix for this?
---------------------------------------
*[davook]()* on 2009-05-25 13:28:42  
Related to the last comment, i've the same problem.

It seems that "toFixed()" is the problem:
http://forums.mozillazine.org/viewtopic.php?f=9&t=99994

As a temporary, bad and ugly solution i'm using an auxiliar function replacing toFixed().

Example:
```
// Original code
n.toFixed(prec);

// New code
toFixedFix(n, prec);
```

The toFixedFix function would be like this:
```
function toFixedFix(n,prec) {
  var k = Math.pow(10,prec);
  return (Math.round(n*k)/k).toString();
}
```

Any idea how improve it?
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-01 11:19:21  
@Kheang Hok Chin, thanks for the report and @davook, thanks for the workaround! I've incorporated the workaround (and added some more test cases), and also fixed a problem when the final value was an absolute number and was thus not getting zeroes added. (FYI, the referenced discussion thread was missing a digit at the end: http://forums.mozillazine.org/viewtopic.php?f=9&t=999945 )
---------------------------------------
*[Jay Klehr]()* on 2009-06-11 17:45:25  
When using number_format to format numbers used for currency, I noticed that if the number has a single decimal followed by a zero initially, and I apply number_format to it (with 2 decimal precision) I don't get 2 decimals. It strips the trailing zero.

```
number_format('1.20', 2); // returns 1.2, should return 1.20
```

Using the above version as of this writing (906.111)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-18 06:42:58  
Thanks for the report, Jay. Should be fixed now.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-06-18 13:59:40  
@ Brett Zamir: Thanks for fixing Brett!!
---------------------------------------
*[Amir Habibi](http://www.residence-mixte.com/)* on 2009-06-18 21:59:55  
To continu with Jay's comment, if you try :

```
number_format('1.2', 2);
```

You'll still get '1.2' instead of '1.20'
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-19 00:07:40  
Ok, great, thanks Amir. Fixed and tested (Mozilla). (Also allowed precision 1 to work in all cases.)
---------------------------------------
*[Jay Klehr]()* on 2009-06-19 17:40:55  
Thanks Brett, looks good now.
---------------------------------------
*[Andras]()* on 2009-10-10 20:24:25  
This is shorter :) Feel free to change var names.
```
function number_format(amount, nDec, sDec, sTho){
	if (!sDec) sDec = ',';
	if (!sTho) sTho = '.';
	amount = (amount * 1).toFixed(nDec);
	if (isNaN(amount)) return NaN;
	amountExp = (amount + '').split('.');
	amount = amountExp[0];
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(amount)) {
		amount = amount.replace(rgx,'$1' + sTho + '$2');
	};
	if (nDec > 0){
		amount += sDec + amountExp[1];
	};
	return amount;
};
```

---------------------------------------
*[Josh]()* on 2009-10-10 23:47:44  
Thank you for the function, however it boggles my mind that you can go through 906 revisions and still can't get negative numbers right (at least in Firefox 3.5.3 or IE 8). Negative numbers are numbers that are less than 0, and yes, they do come into play occasionally in this world. I added a couple changes at the very beginning and end of the function to account for the problem:

```
//beginning
var prefix = '';
if(number < 0)
 prefix = '-';

//end
return prefix + s; 
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-11 07:26:58  
@Josh: Although I don't know what Kevin's system of numbering is about exactly, I'm pretty darn sure it wasn't 900 revisions! Please keep in mind that these functions have been posted here by different people, often with submissions which started as mere approximations of the PHP function and over time have had a few bugs fixed, some more PHP behaviors added, etc. Not all of us have the time or experience to review each function in full detail, compare it with PHP behavior and its idiosyncrasies, etc. (and functions earlier on were accepted with more loose standards than now). A lot of functions were added in good faith. We're volunteers just like you are in submitting the patch, only Kevin has done the added work of making a website, a compiler, etc., just in the hopes of it being useful. So, take it or leave it for what it's worth. We'd all love to see a comprehensive review and have the functions put through all of the test cases as used in the PHP source code, but we're not there yet. I think maybe the Duct Tape Programmer philosophy applies to our project: http://www.joelonsoftware.com/items/2009/09/23.html  :)

@Andras, Thanks very much for the function.  Before Kevin or I get a chance to look at it, could you be sure that it follows the PHP behavior at least as well as the one we have now--passing test cases, etc. and addressing Josh's issue?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-25 13:37:16  
@ Josh: as you can see this function has been revised 2 times. That means a complete rewrite. I guess what you could blame us for is regression. More specifically: not having a test case for the negative numbers.
But hey, there are over 400 functions we have to maintain and we do all of this for free so please take it or by all means - leave it.

@ Brett Zamir: I chose not to have an incremental version for each function because I felt that could easily lead to inconsistency. Instead it's the shortest form of the modification date that still makes sense.
e.g.: 906.1806 would translate to 20090618 06:00:00

---------------------------------------
*[Robert]()* on 2010-01-02 15:31:18  
thank you! You just made my life 20 times easier. 
---------------------------------------
*[Ronnie]()* on 2010-01-07 21:34:44  
I like it, but now I have to calculation on it, so I need to format the number back to a numeric format for example

from 
1,000,235.22

to 
1000235.22

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-08 04:17:45  
@Ronnie: We're really just focused here on implementing the already-existing API of PHP, and PHP doesn't have any formal way of converting back to a numeric format. Why don't you just transmit both forms together within your application? Or are you depending on user input which may include use of commas, etc.?

If the latter, you might be able to use this:

```function strtonumber( str, dec_point, thousands_sep ) {
    // +   based on: http://www.php.net/manual/en/function.number-format.php#76448
    // +      adapted by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: localeconv
    // -    depends on: str_replace
    // *     example 1: strtonumber('1,123.564', '.', ',');
    // *     returns 1: 1123.564
    // *     example 2: strtonumber('1,123', '.', ',')
    // *     returns 2: 1123

    if(typeof dec_point === 'undefined' || typeof thousands_sep === 'undefined') {
        var locale = this.localeconv();
        if(typeof dec_point === 'undefined') {
            dec_point = locale['decimal_point'];
        }
        if(typeof thousands_sep === 'undefined') {
            thousands_sep = locale['thousands_sep'];
        }
    }
    return parseFloat(this.str_replace(dec_point, '.', this.str_replace(thousands_sep, '', str)));
}
```

I was able to avoid the extra code used in the original (at the end) since JavaScript doesn't represent integers differently from floats as variable types.

Be sure to add the dependencies and also note that localeconv() also has its own dependency of setlocale() which you also will need, at least if you may rely on defaults.

But consider that the default locale set up by setlocale() was based on the default locale I obtained in my own testing which did not include a thousands separator (as one might expect the default to be ',' as English). So, unless you adapt the locale(s) inside setlocale(), you have to specify all of the arguments for strtonumber.

Hope that helps...
---------------------------------------
*[Graci Granados]()* on 2010-04-24 16:51:00  
Thanks Brother, congratulation!!!
---------------------------------------
*[](http://www.gestiondecompras.com)* on 2010-06-01 09:11:17  
Hi guys,

I think that I found a bug because I get 555,42 in that function number_format(555.425, 2, ',', '.') when the result could be 555,43

Any solution?

Thanks.

Sorry for my english
---------------------------------------
*[](http://www.gestiondecompras.com)* on 2010-06-01 12:26:32  
One posible solution. Add
```
var ajuste = n + 1/(k*10);
```
and replace the return value for this:
```
return '' + Math.round(ajuste * k) / k;
```
in the function toFixedFix declared over the line 50, leave it something like that:
```
toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            var ajuste = n + 1/(k*10);
            return '' + Math.round(ajuste * k) / k;
        };
```

Any suggestion??
---------------------------------------
*[](http://www.gestiondecompras.com)* on 2010-06-01 16:13:54  
OK, I´m wrong, because, in PHP, the result gives us 555,42 to in number_format(555.425, 2, ',', '.').

I was looking a solution to round like excel.

Anyway my "solution" works fine for "excel´s round".

Greets.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-06-19 16:25:13  
@ Rafael Martínez: Thanks for taking the time to investigate further. Appreciated

---------------------------------------
*[Amirouche]()* on 2010-07-28 14:47:56  
I can't have this:
number_en = number_format(1 000,50, 2, '.', ' ');

result:

number_en = 1000.50
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-09-08 16:45:06  
@ Amirouche: Fixed: https://github.com/kvz/phpjs/commit/3f791fd7fa196ba6a1db6c67c6e8c6f24fc0659b

---------------------------------------
*[WoofWoof](woofwoof75.com)* on 2010-12-15 03:48:41  
Nice one!

But I have problem when there's 1,000,000.00... it'll return 0, it is unable to handle such a big sum? only 1000,000.00? I'm relying on this to format $$$... but when dealing with Indonesian Rupiah... which usually of very huge sum.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-12-15 05:39:34  
@WoofWoof: It does look like a bug. I'm a little busy at the moment unless someone else can help, but in the meantime, you might try money_format() as it can handle larger numbers.
---------------------------------------
*[bmw sports](http://motorimpress.com/bmw)* on 2010-12-22 00:43:46  
This codes makes me dizzy :)
---------------------------------------
*[motor](http://www.motor.es)* on 2011-02-24 12:34:02  
Very well. Thanks you.
---------------------------------------
*[Theriault]()* on 2011-03-04 02:15:46  
@WoofWoof: This bug should now be fixed. The new source is available on GitHub, or https://github.com/kvz/phpjs/raw/master/functions/strings/number_format.js
---------------------------------------
*[Fabricio]()* on 2011-08-02 16:48:23  
Ótimo, foi de grande utilidade, alias, todas as funções são úteis.
---------------------------------------
*[Sebastian Haller]()* on 2011-08-31 17:25:22  
number_format(-5.5) returns -6 in PHP (because PHP rounds half numbers up = away from zero, while JavaScript rounds them always up). Hence I suggest changing line 66 to

```
s = ((n<0 ? '-' : '') + (prec ? toFixedFix(Math.abs(n), prec) : '' + Math.round(Math.abs(n)))).split('.');
```

and adding example 14:

```
// *    example 14: number_format('-5.5');
// *    returns 14: '-6'
```
---------------------------------------
*[Sebastian Haller]()* on 2011-08-31 19:46:54  
Sorry, my fix did not work, it should be

```s = (prec ? toFixedFix(Math.abs(n), prec) : '' + Math.round(Math.abs(n))).split('.');```

and

```return (n<0 ? '-' : '')+s.join(dec);```

---------------------------------------
*[Memo]()* on 2011-09-28 01:29:13  
Me salvo la vida xD
This save my life xD
---------------------------------------
*[Koon](-)* on 2011-09-29 09:40:56  
Thank you so mush !!
---------------------------------------
*[Nima]()* on 2012-01-07 22:28:41  
Thanks , grate job ;)
---------------------------------------
*[Haider Abbas](http://hitbiz.net)* on 2012-07-10 21:19:07  
Thanks a lot! Works just like PHP equivalent. Perfect work. Very helpful.
---------------------------------------
*[Vishwa]()* on 2012-07-17 06:36:10  
Thanks.
Works like a charm.
---------------------------------------
*[Daniel]()* on 2012-09-27 20:43:52  
how add a hundred separator?

---------------------------------------
