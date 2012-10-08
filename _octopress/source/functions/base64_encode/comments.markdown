*[Bayron Guevara]()* on 2008-01-04 18:01:14  
I suggest the following code, because I think is faster:

function base64_encode(data) {
    
    var b64 = &quot;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=&quot;;
    var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';
        
    do {  // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        
        bits = o1&lt;&lt;16 | o2&lt;&lt;8 | o3;
        
        h1 = bits&gt;&gt;18 &amp; 0x3f;
        h2 = bits&gt;&gt;12 &amp; 0x3f;
        h3 = bits&gt;&gt;6 &amp; 0x3f;
        h4 = bits &amp; 0x3f;
              
        // use hexets to index into b64, and append result to encoded string
        enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i &lt; data.length);
    
	switch( data.length % 3 ){
		case 1:
			enc = enc.slice(0, -2) + '==';
			break;
		case 2:
			enc = enc.slice(0, -1) + '=';
	}
	
	return enc;
}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-04 20:27:08  
@ Bayron Guevara: Thank you I've updated the function and credited you in the comments! If you have thoughts on new functions as well, let me know!
---------------------------------------
*[TXGruppi]()* on 2008-04-08 19:16:26  
Reading the functions I found the base64_encode and base64_decode in a way very complicated.

There are the functions btoa and atob in JavaScript that make this conversion.

```
var name = 'JavaScript';
var enc = btoa(name);
var dec = atob(enc);
alert(name); // JavaScript
alert(enc); // SmF2YVNjcmlwdA==
alert(dec); // JavaScript
```

Any questions send me an email: txgruppi@gmail.com

Translated by: Google Translator
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-08 23:11:54  
@ TXGruppi: Wow didn't know about that. Googling gave me the idea that this is mozilla only however. Can you confirm this? If so, we can always build in a browsercheck or a check on the existance of the btoa function and then decide which method to use
---------------------------------------
*[Howard Yeend]()* on 2008-04-09 18:54:28  
Confirmed btoa and atob working on:

* Safaru 3.0.4 under windows
* Firefox 2.0.0.13 under windows

Not working in:

* Any version of MSIE.


Instead of using a UA check, why not do this:

```
if(!function_exists(atob)) {
 function atob() {
 // funky b64 code here
 }
}

if(!function_exists(btoa)) {
 function btoa() {
 // funky b64 code here
 }
}

```
---------------------------------------
*[Howard Yeend]()* on 2008-04-09 18:55:45  
&quot;check on the existance of the btoa function and then decide which method to use&quot;

oops. just read that.
---------------------------------------
*[Thunder.m]()* on 2008-04-24 19:16:23  
This function (base64_encode and decode) is not correct for utf strings.
Here is working solution: http://www.webtoolkit.info/javascript-base64.html
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-25 10:57:48  
@ Thunder.m: Thanks, I've updated the code and added the utf dependency!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-25 11:04:08  
@ Howard Yeend &amp; TXGruppi: I've added a:
```
    // mozilla has this native
    if (typeof window['atob'] == 'function') {
        return atob(data);
    }
```
To make use of mozilla's native base64 functions.
---------------------------------------
*[Thunder.m]()* on 2008-04-30 14:22:46  
Hi, the mozilla atob function is not working well in my Firefox 2.0.0.12, there are some realy serious issues, so i think it shuld be removed, or tested more intensively.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-02 11:42:06  
@ Thunder.m: Thank you for testing it in 2.0.0.12. It appears various versions handle atob() functions differently. Doing a browser version check isn't very reliable, so I guess I will fall back to the original function which works consistently in all JavaScript browsers. The fixed version will be visible shortly.
---------------------------------------
*[Ulrich]()* on 2009-08-27 18:37:41  
I don't understand, why you are doing an utf8-encoding before encoding the data with base64. If we assume that our string "data" is just a byte array, it does not have any encoding. Base64 will work on a byte array and it shouldn't care about encoding. As far as I can see utf8-encoding is also destroying the data. If \r gets replaced by \n, for example, information is lost.

PHP example (File encoding is UTF-8):
```
<?php

$str1_1 = chr(0xc4); // iso 8859-1 "Ä"
$str1_2 = "Ä";
$str2 = "\n";
$str3 = "\r";
$str4 = "\r\n";

echo $str1_1, "\n";
echo $str1_2, "\n";
echo $str2, "\n";
echo $str3, "\n";
echo $str4, "\n";

echo "---\n";

echo base64_encode($str1_1), "\n";
echo base64_encode($str1_2), "\n";
echo base64_encode($str2), "\n";
echo base64_encode($str3), "\n";
echo base64_encode($str4), "\n";

echo "===\n";

echo utf8_encode($str1_1), "\n";
echo utf8_encode($str1_2), "\n";
echo utf8_encode($str2), "\n";
echo utf8_encode($str3), "\n";
echo utf8_encode($str4), "\n";

echo "---\n";

echo base64_encode(utf8_encode($str1_1)), "\n";
echo base64_encode(utf8_encode($str1_2)), "\n";
echo base64_encode(utf8_encode($str2)), "\n";
echo base64_encode(utf8_encode($str3)), "\n";
echo base64_encode(utf8_encode($str4)), "\n";

?>
```

RESULT:
```
$ php php_test.php

Ä





---
xA==
w4Q=
Cg==
DQ==
DQo=
===
Ä
Ã





---
w4Q=
w4PChA==
Cg==
DQ==
DQo=
```

Or does JavaScript handles strings in a different way?
---------------------------------------
*[Ulrich]()* on 2009-08-27 19:26:25  
Ok, I was a bit wrong with my previouse post...
It looks like if JavaScript is handling strings in a different way and not as byte arrays, so utf8_encode seems to be required. But I still wonder why \r has to be replaced.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-30 05:25:09  
@Ulrich: I assume the function creators were trying to just make it more convenient for themselves in handling newlines in a uniform way, but as you are correct that this is not the PHP way, and it should not be the job of this function to streamline newlines, I've applied your fix in SVN (i.e., removing the newline replaces).
---------------------------------------
*[noe](http://noe.wen9.net/)* on 2009-10-01 11:10:57  
Thank's
---------------------------------------
*[zeroneta]()* on 2010-01-05 17:33:58  
_.encode = function( a )
{
	return ( a + '' ).replace( /[^\x00-\xFF]/g, function( a )
	{
		a = a.charCodeAt();
		return a < 2048 ? _.unicode( a >> 6 | 192 ) + _.unicode( a & 63 | 128 ) : _.unicode( a >> 12 | 224 ) + _.unicode( a >> 6 & 63 | 128 ) + _.unicode( a & 63 | 128 );
	} );
},
_.base64_encode = function( a )
{
	a = _.encode( a );
	for ( var s = 0, d = a.length, f = '', r; s < d; r = a.charCodeAt( s++ ) << 16 | a.charCodeAt( s++ ) << 8 | a.charCodeAt( s++ ), f += base64.charAt( r >> 18 & 0x3F ) + base64.charAt( r >> 12 & 0x3F ) + base64.charAt( r >> 6 & 0x3F ) + base64.charAt( r & 0x3F ) );
	return ( d %= 3 ) ? d > 1 ? f.slice( 0, -1 ) + '=' : f.slice( 0, -2 ) + '==' : f;
},
---------------------------------------
*[zeroneta]()* on 2010-01-05 17:37:28  
```
_.unicode = _._.String.fromCharCode
```
---------------------------------------
*[weblink]()* on 2010-07-02 08:40:31  
I used phpjs functions serialize(), utf8-encode() and base64_encode(). This is my javascript code 
```
 var string = "„œœ„‚XSS[…„–Ž„•"
 result=serialize(string);
 alert(base64_encode(result));
```

If i use serialize & base64_encode in php functions in my php program, it is giving "czoxNToihJychIJYU1NbhYSWjoSVIjs=".

But, in the above code i am getting wrong output.

Can anyone give suggestion for this problem that i need to get the same output like php.

---------------------------------------
*[justin]()* on 2010-12-24 07:38:07  
when the raw date is chinese,the base64_encode has diff result with the php base64_encode
---------------------------------------
*[Seingh](patronum.tk)* on 2011-02-01 20:43:52  
I did not understand much code written by you, in theory, should have a javascript function to base64.
Obviously I can be wrong;-)
Sorry for my English, I'm Italian.
---------------------------------------
*[John](http://www.jj5.net/)* on 2011-07-19 21:46:11  
The line,

```
    data = this.utf8_encode(data + '');
```

is incorrect. PHP treats input to base64_encode as a binary string. I had to comment out this code in order to get compatibility with existing PHP code that uses binary strings. I'd advise removing this line altogether, it doesn't make sense, especially as the input is likely already in UTF-8 encoding, and if it's not then it's probably a binary string (or some other encoding, in any event that line shouldn't be there).
---------------------------------------
*[John](http://www.jj5.net/)* on 2011-12-27 18:31:04  
I fixed this function over at jsphp.co:

http://jsphp.co/jsphp/fn/diff/base64_encode?a=389&b=460

---------------------------------------
*[austin]()* on 2012-02-29 23:00:49  
base64_encode mangles utf8 binary data this line:
```
data = this.utf8_encode(data + '');
```
if the string is already utf8 it encodes it MORE and the resulting binary is unintelligible.
a fix i used for this is:
```
if(!isutf8)
    {
      data = this.utf8_encode(data + '');
    }
```
and i pass isutf8 as a second argument, this changes it a bit from the original but gives the option to utf8 encode it first or not.
---------------------------------------
*[Daniel Dotsenko](www.walnutcomputing.com)* on 2012-03-08 19:52:18  
Per my tests pre-splitting the string, with consequent use of array[index] lookup is 3 times faster on IE - the only browser you would use this on. (All others have btoa())

In addition to that, Closure Compiler for some reason "optimizes" the code above (long string with 4x .charAt look up in that string) into 4 fold repetition of that string within minified code. I know it's Closure's faulty "optimization" logic, but switching to array helps it do the right thing.

Here is something that behaved about 3 times faster (on IE) than the code you have above (on long 20k+ texts) in our use:

```
function base64_encode(data) {
    // use native implementation if it's present
    if (typeof btoa === 'function') return btoa(data)

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        b64a = b64.split(''),
        o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];
 
    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
 
        bits = o1 << 16 | o2 << 8 | o3;
 
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
 
        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64a[h1] + b64a[h2] + b64a[h3] + b64a[h4];
    } while (i < data.length);

    enc = tmp_arr.join('');
    var r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}
```


test is here: 
http://jsperf.com/base64-most-referred-mit-and-bsd-vs-native-btoa/2
---------------------------------------
*[????? ???](http://an3m1.com/)* on 2012-04-23 14:46:56  
I have a lot to benefit from this article and thank you for this wonderful effort to this article and will continue my many articles you have other   

---------------------------------------
