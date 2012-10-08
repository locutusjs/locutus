*[TXGruppi]()* on 2008-04-08 19:15:46  
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
*[TXGruppi]()* on 2008-04-23 21:33:45  
I did a test in IE and not worked the functions atob and btoa, for this reason I did another test to measure the speed of implementation of tasks in Firefox and Internet Explorer. In a loop see that in the FF functions atob and btoa are faster than the functions base64_decode and base64_encode.

The test is available in http://www.txgruppi.com/base64.html

If you can send me your e-mail, I would like to discuss some issues about things I liked in your site.

* Address of my future site.

Any questions send me an email: txgruppi@gmail.com Translated by: Google Translator
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-25 11:04:48  
@ TXGruppi: I've added a:
```
    // mozilla has this native
    if (typeof window['atob'] == 'function') {
        return atob(data);
    }
```
To make use of mozilla's native base64 functions.
---------------------------------------
*[Aman Gupta]()* on 2008-05-08 01:44:22  
This implementation is extremely slow in IE due to string concatenation. It is much faster to push onto an array and return array.join('').

In firefox, window.atob works for decoding as long as you don't pass in a large string. Over a certain size, it fails with an 'out of memory' error.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-08 21:57:55  
@ Aman Gupta: The array join tip has been implemented. As far as the atob goes, thanks for providing additional information. I think for now we should stick with a version that works everywhere until we find out exactly how to safely use the native functions among different mozilla versions.
---------------------------------------
*[Pellentesque malesuada](none)* on 2009-02-20 14:35:26  
Found an error in base64_decode function. When function receives empty string, it returns 3 characters long string filled with something.
The solution is to replace do/while method with simple while.

function base64_decode( data ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Thunder.m
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // -    depends on: utf8_decode
    // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    // *     returns 1: 'Kevin van Zonneveld'

    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof window['btoa'] == 'function') {
    //    return btoa(data);
    //}

    var b64 = &quot;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=&quot;;
    var o1, o2, o3, h1, h2, h3, h4, bits, i = ac = 0, dec = &quot;&quot;, tmp_arr = [];

    data += '';

     while (i &lt; data.length) {  // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1&lt;&lt;18 | h2&lt;&lt;12 | h3&lt;&lt;6 | h4;

        o1 = bits&gt;&gt;16 &amp; 0xff;
        o2 = bits&gt;&gt;8 &amp; 0xff;
        o3 = bits &amp; 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    }

    dec = tmp_arr.join('');
    dec = utf8_decode(dec);

    return dec;
}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-21 12:56:16  
@  Pellentesque malesuada: Thank you, I fixed it in svn, but I can't deploy at the moment. I think everything will be processed Monday!
---------------------------------------
*[zeroneta]()* on 2010-01-05 17:34:48  
```
_.decode = function( a )
{
	return ( a + '' ).replace( /[\x80-\xFF]{2,3}/g, function( a )
	{
		a = [ a.charCodeAt(0), a.charCodeAt(1), a.charCodeAt(2) ];
		return _.unicode( a[2] ? ( a[0] & 15 ) << 12 | ( a[1] & 63 ) << 6 | a[2] & 63 : ( a[0] & 31 ) << 6 | a[1] & 63 );
	} );
},
_.base64_decode = function( a )
{
	a += '';
	for ( var s = 0, d = a.length, f = '', r; s < d; r = [ base64.indexOf( a.charAt( s++ ) ), base64.indexOf( a.charAt( s++ ) ), base64.indexOf( a.charAt( s++ ) ), base64.indexOf( a.charAt( s++ ) ) ], r[4] = r[0] << 18 | r[1] << 12 | r[2] << 6 | r[3], f += r[2] == 64 ? _.unicode( r[4] >> 16 & 0xFF ) : r[3] == 64 ? _.unicode( r[4] >> 16 & 0xFF, r[4] >> 8 & 0xFF ) : _.unicode( r[4] >> 16 & 0xFF, r[4] >> 8 & 0xFF, r[4] & 0xFF ) );
	return _.decode( f );
},
```
---------------------------------------
*[zeroneta]()* on 2010-01-05 17:38:48  
```
_.unicode = _._.String.fromCharCode
```
---------------------------------------
*[jamily](http://www.bike-jersey.com)* on 2010-12-11 20:21:39  
Thank you! very good!
---------------------------------------
*[Luke Scott]()* on 2011-07-20 23:17:42  
I don't know who added the "dec = this.utf8_decode(dec);" bit, but this is NOT correct. This line causes raw binary data to be mangled. Removing this line fixes the problem.

Base64 does not, and should not, care about the charset. If you are expecting utf8 you can use utf8_decode yourself.

PHP does not do this:

```
<?php
$data = '';

for($i=0; $i < 100000; ++$i)
{
	$data .= pack('V', rand(0, 999999999));
}

header('Content-Type: text/plain');
print strlen($data) . "\n"; // ORIGONAL
print strlen( base64_decode(base64_encode($data)) ) . "\n"; // GOOD
print strlen( utf8_decode( base64_decode(base64_encode($data)) ) )  . "\n"; // WRONG!!
?>
```
---------------------------------------
*[Chris Buckley](http://cmbuckley.co.uk)* on 2011-09-01 11:35:13  
The (commented out) native Mozilla functions are the wrong way round: base64_decode === atob and base64_encode === btoa (as in, encoding = binary to ASCII).
---------------------------------------
*[Josep Sanz](http://www.saltos.net)* on 2011-09-24 11:42:57  
I'm using base64_decode to decode a binary PDF. I detect that the call to utf8_decode used at last of the function is causing problems when work directly with binary data.

What is the reason of use this utf8_decode???

I understand that play with base64_encode and base64_decode, must be as ping-pong and be independent of the contenst (UTF8 is assumed???)

The ping-pong refers to do for example base64_decode(base64_encode(BINARY_PDF_CONTENTS)) must return directly the BINARY_PDF_CONTENTS.

Thanks.

Josep.

---------------------------------------
*[Yaffle](http://hostel6.ru)* on 2011-10-13 13:55:29  
Good implementation, but doesn't work for base64 strings without padding ("==" or "=")
(From a theoretical point of view the padding character is not needed, since the number of missing bytes can be calculated from the number of Base64 digits, see http://en.wikipedia.org/wiki/Base64#Padding)
and here is my implementation: https://gist.github.com/1284012

https://gist.github.com/1284012
---------------------------------------
*[John Supplee]()* on 2011-12-13 21:25:46  
I agree with other posters that the utf8_decode in the function is a mistake and a departure from php behaviour.  I think the function should be modified to take a second boolean parameter for those who wish to invoke utf8 decoding.  The most proper way would be to leave the utf8 decoding out as a separate function.  However, there seems to be resistance to that.

```
function base64_decode (data, isUtf8) {
. . .
	if (isUtf8)
		dec = this.utf8_decode(dec);
```

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-06 09:35:24  
@John Supplee, @Josep Sanz, @Luke Scott: The ut8_decode was removed in Git. We should indeed be following PHP and UTF8-friendly behavior.
@Chris Buckley: Fixed comments in Git.
@Yaffle: I see PHP also doesn't depend on the padding (though the MIME (RFC2045) per Wikipedia requires the padding), so I guess we should add support. I will see whether I have time later.
---------------------------------------
