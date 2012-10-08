*[travc]()* on 2009-03-30 12:57:23  
Found an apparent bug...  I'll try to track it down, but I'm a javascript noob.

```
<?  print rawurldecode('-22%97bc%2Fbc'); ?>

<script type="text/javascript">
  var foo = rawurldecode('-22%97bc%2Fbc');
  alert(foo);
</script>
```

php part works fine,  js breaks.

firebug reports:
malformed URI sequence
rawurldecode("-22%97bc%2Fbc")

And, yes, this string comes from encoding in php with rawurlencode (from a big nasty db response).  
---------------------------------------
*[Brett Zamir]()* on 2009-03-30 16:19:31  
Sorry, it looks like to fully reflect PHP's behavior, you have to add this to the histogram (all of our other related functions should be converted accordingly as well):

```
histogram['\u20AC'] = '%80';
histogram['\u0081'] = '%81';
histogram['\u201A'] = '%82';
histogram['\u0192'] = '%83';
histogram['\u201E'] = '%84';
histogram['\u2026'] = '%85';
histogram['\u2020'] = '%86';
histogram['\u2021'] = '%87';
histogram['\u02C6'] = '%88';
histogram['\u2030'] = '%89';
histogram['\u0160'] = '%8A';
histogram['\u2039'] = '%8B';
histogram['\u0152'] = '%8C';
histogram['\u008D'] = '%8D';
histogram['\u017D'] = '%8E';
histogram['\u008F'] = '%8F';
histogram['\u0090'] = '%90';
histogram['\u2018'] = '%91';
histogram['\u2019'] = '%92';
histogram['\u201C'] = '%93';
histogram['\u201D'] = '%94';
histogram['\u2022'] = '%95';
histogram['\u2013'] = '%96';
histogram['\u2014'] = '%97';
histogram['\u02DC'] = '%98';
histogram['\u2122'] = '%99';
histogram['\u0161'] = '%9A';
histogram['\u203A'] = '%9B';
histogram['\u0153'] = '%9C';
histogram['\u009D'] = '%9D';
histogram['\u017E'] = '%9E';
histogram['\u0178'] = '%9F';
```

and then add this line right before the call to decodeURIComponent():

```
ret = ret.replace(/%([a-fA-F][0-9a-fA-F])/g, function (all, hex) {return String.fromCharCode('0x'+hex);}); // These Latin-B have the same values in Unicode, so we can convert them like this
```

---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-03 13:33:35  
@ travc & Brett Zamir: Fixed in SVN: Thanks!
---------------------------------------
*[Joris van der Wel]()* on 2009-09-29 16:14:40  
Incase anyone is interested, here is a version with full UTF-8 support written without decodeURIComponent or any maps.

```
function rawurldecode(url)
{
	// This function mimmicks PHP's rawurldecode under UTF-8
	// Any percentage notation is converted to its UTF-16 character.
	// Only tested on Mozilla browsers (Firefox 3.5)
	// Does NOT use any of decodeURIComponent, decodeURI, unescape, etc
	// Supports 4 byte characters (so unicode characters 0x0000 through 0x10FFFF)
	//
	// Original by Joris van der Wel
	var chr, a, len, ret, c, c2, c3, c4, hi, low;
	
	ret = '';
	for (a = 0, len = url.length; a < len; a++)
	{
		chr = url.charAt(a);
		if (chr != '%')
		{
			ret += chr;
			continue;
		}
		
		c = parseInt(url.charAt(a+1) + url.charAt(a+2), 16);
		if (isNaN(c))
		{
			ret += '%'; // If php comes across something invalid, it just shows it without parsing 
			continue;
		}
		
		a += 2; // skip 2
		
		ret += String.fromCharCode(c);
	}
	
	// second pass, convert UTF-8 to UTF-16 (Strings in javascript (ECMA-262 to be exact) are UTF-16)
	url = ret;
	ret = '';
	for (a = 0, len = url.length; a < len; a++)
	{
		c = url.charCodeAt(a);
		
		//        c & 1000 0000  === 0000 0000
		if(      (c &      0x80) === 0        ) // 0xxxxxxx
		{
			ret += url.charAt(a);
		}
		//        c & 1110 0000  === 1100 0000
		else if ((c &      0xE0) ===      0xC0) // 110y yyxx	10xx xxxx
		{
			a++;
			c2 = url.charCodeAt(a);
			ret += String.fromCharCode(
					((c  & 0x1F) << 6) | 
					((c2 & 0x3F) << 0)
				);
		}
		//        c & 1111 0000  === 1110 0000
		else if ((c &      0xF0) ===      0xE0) // 1110 yyyy	10yy yyxx	10xx xxxx
		{
			a++;
			c2 = url.charCodeAt(a);
			a++;
			c3 = url.charCodeAt(a);
			ret += String.fromCharCode(
				       ((c  & 0x0F) << 12) |
				       ((c2 & 0x3F) << 6 ) |
				       ((c3 & 0x3F) << 0 )
			       );
		}
		//        c & 1111 1000  === 1111 0000
		else if ((c &      0xF8) ===      0xF0) // 1111 0zzz	10zz yyyy	10yy yyxx	10xx xxxx 
		{
			a++;
			c2 = url.charCodeAt(a);
			a++;
			c3 = url.charCodeAt(a);
			a++;
			c4 = url.charCodeAt(a);
			
			c =	((c  & 0x07) << 18) |
				((c2 & 0x3F) << 12) |
				((c3 & 0x3F) << 6 ) |
				((c4 & 0x3F) << 0 ) ;
			
			if (c >= 0x10000) // split it up using surrogates
			{
				c -= 0x10000;
				
				hi  = (c & 0xFFC00) >> 10; // first 10 bits
				low = c & 0x003FF; // last  10 bits
				
				hi  += 0xD800; // high surrogate range
				low += 0xDC00; // low surrogate range
				ret += String.fromCharCode(hi, low);
			} 
			else
			{
				ret += String.fromCharCode(c);
			}
		}
	}
	
	return ret;
}
```
You could probably rewrite it to use only one loop, but that would turn into spaghetti code very fast

Gr.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-26 01:07:41  
@Joris: Sorry I haven't gotten to your post yet; that looks great! I'd like to test it out a little first and then commit, if you can bear with me a little...
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-28 02:32:00  
@Joris: Thanks for your code (it's helpful to have here for reference and makes a good complement to the previous code for urlencode and reposted just now in the comments at http://phpjs.org/functions/urlencode ), but I went ahead with the faster use of decodeURIComponent().
---------------------------------------
*[???? ????????](http://an3m1.com/)* on 2012-04-17 15:33:39  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas 

---------------------------------------
