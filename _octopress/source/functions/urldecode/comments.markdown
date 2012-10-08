*[doqkhanh]()* on 2008-06-13 03:26:22  
I have a safer function:
/**
* \summary: http://kevin.vanzonneveld.net
* \author:   Original by: Philip Peterson
* 			 improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
* \example: urlencode('Kevin van Zonneveld!');
* \returns: 'Kevin+van+Zonneveld%21'                                   
*/
function urlencode( str ) {
	var errorMessage = &quot;Javascript error at urlencode() function in yourfile.js. Please contact YourCompany's site administrator.&quot;;
	
    var ret = str;
    try
    {
	    ret = ret.toString();
	    ret = encodeURIComponent(ret);
	    ret = ret.replace(/%20/g, '+');
 	}
 	catch(err)
 	{
 		alert(errorMessage);
 	}
 	
    return ret;
}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-06-16 00:14:15  
@ doqkhanh: Why do we really need this handling? Because I don't believe PHP would return such an error string, and we would like to mimic it's behavior as strict as possible, to avoid strange bugs &amp; unexpected results; and so that the PHP documentation doesn't need to be changed.
---------------------------------------
*[larry fisher]()* on 2008-07-11 15:29:45  
just want to thank you.  very useful...
---------------------------------------
*[thor s.]()* on 2008-07-20 23:18:25  
thank you a million times!!!!
---------------------------------------
*[johnrembo]()* on 2008-08-27 17:08:31  
```
function urdencode (str) {
    return decodeURIComponent(str);
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 19:31:51  
@ johnrembo: Hi John, thanks for your input again. We had some discussion about it earlier. It doesn't mimic PHP behavior enough. Differences between JavaScript's encoding functionalities can be found here: http://xkr.us/articles/javascript/encode-compare/
---------------------------------------
*[Guilherme]()* on 2008-12-31 03:59:29  
Hi, I guess your function doesn't work for some situations. Try this code (I'll appreciate if you send me the fixes):

```
&lt;?php
	$__t = '\'a\' +b+ \"c\" %d% \\\\  \\\\';
?&gt;
alert("&lt;?= $__t ?&gt;");
alert("&lt;?= urlencode($__t) ?&gt;");
alert("&lt;?= urldecode(urlencode($__t)) ?&gt;");
alert(urldecode("&lt;?= urlencode($__t) ?&gt;")); // It fails with your function!
```

---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-08 16:58:49  
@ Guilherme: Sorry your comment got stuck in the spamfilter. Akismet is a bit strict sometimes (can't really blame it, there are a lot of unrecognized words in your comment). Anyway:

You are not supposed to use php tags. This should prove to be more successful:

```
var $__t = '\'a\' +b+ \&quot;c\&quot; %d% \\\\  \\\\';
alert(urlencode($__t));
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-13 19:00:30  
Hi there...Getting tired of me yet?

The following should be added to this function  and for urlencode():

```
histogram[&quot;'&quot;]   = '%27';
histogram['(']   = '%28';
histogram[')']   = '%29';
histogram['*']   = '%2A';
histogram['~']   = '%7E';
```

And once you fix the above, you can also get rawurlencode and rawurldecode by simply removing the following line from each of the corresponding files:

```histogram['%20'] = '+';```

(That's the only difference with the raw form)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-14 11:06:32  
@ Brett Zamir: Tired? maybe. Of you? Never :) Keep 'em coming! :D
---------------------------------------
*[Lars Fischer]()* on 2009-04-07 16:20:38  
This is a wonderful Project! I'm glad, finding it today! Really good work!

For the german special-chars, this should be added to the urlencode and urldecode-function:

```
histogram['\u00DC']   = '%DC';
histogram['\u00FC']   = '%FC';
histogram['\u00C4']   = '%D4';
histogram['\u00E4']   = '%E4';
histogram['\u00D6']   = '%D6';
histogram['\u00F6']   = '%F6';
```
histogram['\u00DF']   = '%DF';
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-14 12:11:58  
@ Lars Fischer: Thanks for helping us make it better!
---------------------------------------
*[Orlando]()* on 2009-08-07 00:15:49  
I was working with norwegian characters but wasn't able to get it working for uppercase characters(Ø,Å,Æ) until I added the following lines to hashmap:

```
hash_map['\u00C6']   = '%C3%86';
hash_map['\u00D8']   = '%C3%98';
hash_map['\u00C5']   = '%C3%85';
```

I got those values when encoding at php with urlencode(). 
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-07 05:59:40  
@Orlando, thanks for pointing this out. However, if someone has some time now, could we look into solving this problem (that keeps coming up) of seeing non-ASCII characters translated correctly for all languages? There must be some algorithm we can use rather than just pasting new translations piecemeal...
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-16 15:31:34  
@ Brett Zamir: Agreed. until we do though, I'd like to add Orlando's improvements to the hash_map

@ Orlando: Thanks for sharing, fixed in SVN
---------------------------------------
*[CDuv](http://claude.duvergier.fr)* on 2009-08-17 17:35:37  
I had a "malformed URI sequence" JavaScript error in Firefox/3.5.2 (Gecko/20090729) error console when trying to url-decode : "%E7a%20plante" ("ça plante").

I read on OpenLayers bugtracker Ticket #1704 (http://trac.openlayers.org/ticket/1704) that JavaScript unescape() function could help.

So  I gave it a chance and changed```ret = decodeURIComponent(ret);```(line 90 in phpjs.org::urldecode() v908.1617)
To```ret = decodeURIComponent(unescape(ret));```
As it solved by problem I would like to share it with you :)
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-18 12:10:34  
@CDuv: The escape sequence, "%E7a%20plante" gives an invalid character in PHP as well. Are you using UTF-8 like a good netizen? :)  The urlencode() (in PHP or JavaScript) used on "ça plante" should be giving: "%C3%A7a+plante" which can then be decoded by either as well. This function needs to drop some of the code that was mistakenly added for the sake of ISO Latin--which is not used in PHP or JS, from my testing.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-22 17:14:42  
@ Brett Zamir: You are the man! :D Hands down!
---------------------------------------
*[Shamun Toha]()* on 2009-08-30 12:26:04  
```
function urldecode( str ) {
    // Decodes URL-encoded string  
    // 
    // version: 907.503
    // discuss at: http://phpjs.org/functions/urldecode
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
	// +   improved by: @Shamun Toha
	// +       note by: - Shamun: decodeURIComponent failed on many characters
    // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    // *     example 1: urldecode('Kevin+van+Zonneveld%21');
    // *     returns 1: 'Kevin van Zonneveld!'
    // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    // *     returns 2: 'http://kevin.vanzonneveld.net/'
    // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
	// *	 example 4: urldecode("%3Ctr%3E%3Ctd%3Einfo%40jquery.com%20space%20%E9%3C%2Ftd%3E%3C%2Ftr%3E");
	// *	 returns 4: <tr><td>info@jquery.com Space e</td></tr>
    
    var hash_map = {}, ret = str.toString(), unicodeStr='', hexEscStr='';
    
    var replacer = function(search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };
    
    // The hash_map is identical to the one in urlencode.
    hash_map["'"]   = '%27';
    hash_map['(']   = '%28';
    hash_map[')']   = '%29';
    hash_map['*']   = '%2A';
    hash_map['~']   = '%7E';
    hash_map['!']   = '%21';
    hash_map['%20'] = '+';
    hash_map['\u00DC'] = '%DC';
    hash_map['\u00FC'] = '%FC';
    hash_map['\u00C4'] = '%D4';
    hash_map['\u00E4'] = '%E4';
    hash_map['\u00D6'] = '%D6';
    hash_map['\u00F6'] = '%F6';
    hash_map['\u00DF'] = '%DF';
    hash_map['\u20AC'] = '%80';
    hash_map['\u0081'] = '%81';
    hash_map['\u201A'] = '%82';
    hash_map['\u0192'] = '%83';
    hash_map['\u201E'] = '%84';
    hash_map['\u2026'] = '%85';
    hash_map['\u2020'] = '%86';
    hash_map['\u2021'] = '%87';
    hash_map['\u02C6'] = '%88';
    hash_map['\u2030'] = '%89';
    hash_map['\u0160'] = '%8A';
    hash_map['\u2039'] = '%8B';
    hash_map['\u0152'] = '%8C';
    hash_map['\u008D'] = '%8D';
    hash_map['\u017D'] = '%8E';
    hash_map['\u008F'] = '%8F';
    hash_map['\u0090'] = '%90';
    hash_map['\u2018'] = '%91';
    hash_map['\u2019'] = '%92';
    hash_map['\u201C'] = '%93';
    hash_map['\u201D'] = '%94';
    hash_map['\u2022'] = '%95';
    hash_map['\u2013'] = '%96';
    hash_map['\u2014'] = '%97';
    hash_map['\u02DC'] = '%98';
    hash_map['\u2122'] = '%99';
    hash_map['\u0161'] = '%9A';
    hash_map['\u203A'] = '%9B';
    hash_map['\u0153'] = '%9C';
    hash_map['\u009D'] = '%9D';
    hash_map['\u017E'] = '%9E';
    hash_map['\u0178'] = '%9F';
	// on decodeURIComponent failure.
	hash_map['<'] 	   = '%3C';
	hash_map['>'] 	   = '%3E';
	hash_map['/'] 	   = '%2F';
	hash_map['@']	   = '%40'; 
	hash_map['e']	   = '%E9';	
	hash_map[' ']	   = '%20';
	

    for (unicodeStr in hash_map) {
        hexEscStr = hash_map[unicodeStr]; // Switch order when decoding
        ret = replacer(hexEscStr, unicodeStr, ret); // Custom replace. No regexing
    }
    
    // End with decodeURIComponent, which most resembles PHP's encoding functions
    ret = decodeURIComponent(ret);

    return ret;
}
```

Test suite:
```
// output this: <tr><td>info@jquery.com Space e</td></tr>
var a = "%3Ctr%3E%3Ctd%3Einfo%40jquery.com%20space%20%E9%3C%2Ftd%3E%3C%2Ftr%3E";
alert ( urldecode(a) );
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-09-04 19:03:29  
@ Shamun Toha: If I'm not mistaken Brett is working on a different method so that we don't have to work work with hash_maps anymore.
---------------------------------------
*[ajo]()* on 2009-10-29 03:04:53  
i love it...i just love it...
but is it 100% free to use?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-29 07:05:02  
@ajo: Yes, 100% free as in free donuts (I don't drink alcohol)... :)  You only need to add a copy of the license at http://phpjs.org/pages/license with any code you redistribute for others.
---------------------------------------
*[Rob]()* on 2010-01-01 04:42:45  
I think: ```return decodeURIComponent(str).replace(/\+/g, '%20');```

should be: ```return decodeURIComponent(str.replace(/\+/g, '%20'));```

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-01 07:56:33  
Argh--Embarrassing mistake. Thanks for the fix. Done in Git...
---------------------------------------
*[David]()* on 2010-01-07 22:54:22  
The current version works pretty well, but need of one patch to "space bug":

```
// Current
    return decodeURIComponent(str).replace(/\+/g, '%20');
// Correct
    return decodeURIComponent(str.replace(/\+/g, '%20'));
```

Bye.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-08 03:33:58  
@David, Yes, thanks for reporting; it was just recently fixed (see the comments below), but the changes haven't yet made it to the site. FYI, the "raw js source" always has the very latest version (and in this case is the same as you suggested).
---------------------------------------
*[anton]()* on 2010-09-08 21:09:55  
hey.... 

I find a bug 
Uncaught URIError: URI malformed 
```
  ret = decodeURIComponent(ret);
```


HELP ME..
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-09-08 21:33:42  
@ anton: Please provide the exact url you are passing to this function, as it looks like your input is broken.
---------------------------------------
*[anton]()* on 2010-09-09 08:41:53  
%27Musim+Depan%2C+Barca+Rekrut+Torres+%26amp%3B+Fabregas%27%3Cbr+%2F%3EAzulgrana+akan+mengeluarkan+dana+%A3100+juta.+
INPUT : 

%23%3Ca+href%3D%22%23%21%2Ftopics%2Fsports%22+%3Esports%3C%2Fa%3E+%23%3Ca+href%3D%22%23%21%2Ftopics%2Fentertainment%22+%3Eentertainment%3C%2Fa%3E+%23%3Ca+href%3D%22%23%21%2Ftopics%2Fnews%22+%3Enews%3C%2Fa%3E+%23%3Ca+href%3D%22%23%21%2Ftopics%2Fliverpool%22+%3Eliverpool%3C%2Fa%3E+%23%3Ca+href%3D%22%23%21%2Ftopics%2Fbarca%22+%3Ebarca%3C%2Fa%3E+%3Cbr+%2F%3E%3Ca+href%3D%22http%3A%2F%2Fbola.vivanews.com%2Fnews%2Fread%2F174352--musim-depan--barca-rekrut-torres---fabregas-%22+target%3D%22_blank%22%3Ehttp%3A%2F%2Fbola.vivanews.com%2Fnews%2Fread%2F174352--musim-depan--barca-rekrut-torres---fabregas-%3C%2Fa%3E
---------------------------------------
*[Tim de Koning](http://www.kingsquare.nl/)* on 2011-05-31 17:23:57  
```
urldecode('%80');
```

Result in PHP:
```
€ // in Windows-1252 character set
```

Result in JavaScript:
```
ERROR: malformed URI sequence
```

Suggested fix: revert to old version of urldecode, @
https://github.com/kvz/phpjs/blob/e81fa731a23fc07e14793796a23c5b2ebd2bb262/functions/url/urldecode.js




---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-05-31 18:01:17  
@Tim: All sites should be in UTF-8 nowadays (recommended by HTML5 also). Try this:

<?php
header('content-type:text/html;charset=utf8');
print urldecode('%E2%82%AC');
?>

and

alert(urldecode('%E2%82%AC'))
---------------------------------------
*[Tim de Koning](http://www.kingsquare.nl/)* on 2011-06-01 10:17:31  
@Brett: alert(urldecode('%E2%82%AC')) in Firefox 4.0.1 throws the same error:

```
URIError: malformed URI sequence
```

(I don't think this has anything to do with the character set, but i only pointed it out because '€' does not exist in latin1 / ISO-8859-1. So one should take that in consideration when running the mentioned test.)
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-06-01 12:24:26  
@Tim: Strange---I'm using FF 4.0.1 also and not getting an error. Character set shouldn't matter for JavaScript, but it does for PHP (i.e., %80 is not valid for UTF8 so wanted to compare apples to apples).
---------------------------------------
*[Tim de Koning](http://www.kingsquare.nl/)* on 2011-06-01 12:59:37  
@Brett: I don't get it. I get the same error in Chrome 11.0.696.71 (URIError: URI malformed) and IE 9.0.8 too. Maybe it has something to do with my locale-settings... (Dutch, so pretty straightforward)? Anyway... The old version works perfectly and uses the same decodeURIComponent() in the end!
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-06-01 19:26:11  
@Tim: Just to verify: You are using the latest version above? (essentially just a light wrapper for decodeURIComponent). And in your script you have nothing else besides this function and the alert with the call to urldecode?
---------------------------------------
*[Tim de Koning](http://www.kingqsuare.nl)* on 2011-06-01 23:25:59  
@Brett: Yes. I tested this this a Win XP and Windows 7 machine now in multiple browsers, all with the same result.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-06-02 04:53:04  
@Tim: Send me a file with your exact code to my Yahoo address : brettz9
---------------------------------------
*[Tim de Koning](http://www.kingsquare.nl/)* on 2011-06-03 11:03:00  
@Brett: done! :-)
---------------------------------------
*[Dj]()* on 2011-07-29 14:57:29  
Instead of replace '+' with '%20', replace it with an space directly, then is not redundant and decodeURIComponent() will has less characters to proccess
---------------------------------------
*[Rajiva]()* on 2012-01-24 07:51:35  
Yesterday I got same problem : malformed URI sequence. I had try all of solution that you're shown, but no one solved my problem. 
Than, I try another way that I can do for fix the problem. I solved the problem with cutting half of tag value (string) of my XML file with substr($string, 0, 3000). 

I think the browser & program can't handle and processing large string. Based on my experience, the program can work properly while the string contain maximal 3000 character. Is anyone have same experience with me?
---------------------------------------
*[Ye Lin Htun]()* on 2012-03-28 10:05:56  
I reli appreciate your tutorial.
---------------------------------------
*[????? ?????? ? ?????](http://an3m1.com/)* on 2012-04-23 14:49:42  
I wonder how you got so good. HaHa ! This is really a fascinating blog, lots of stuff that I can get into. One thing I just want to say is that your design is so perfect ! You certainly know how to get a girls attention ! I’m glad that you’re here. I feel like I’ve learned something new by being here 

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-05 11:37:22  
@Rajiva: Can you put your long sequence somewhere so we can confirm? I am not able to replicate with decodeURIComponent() (which would be giving the URI error) even with a very large sequence:

```
var arr = decodeURIComponent(new Array(101000).join('%20'));
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-05 11:39:05  
@Rajiva: In addition to my last question, what browser were you using?
---------------------------------------
