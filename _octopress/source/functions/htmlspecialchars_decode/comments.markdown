*[loonquawl]()* on 2008-05-31 10:49:39  
Shouldn't it be
```
   string = string.replace(/&amp;/g, '&amp;');
   string = string.replace(/&lt;/g, '&lt;');
   string = string.replace(/&gt;/g, '&gt;');
```

rather than

```
    string.replace('/&amp;/g', '&amp;');
    string.replace('/&lt;/g', '&lt;');
    string.replace(/&gt;/g, '&gt;')
```
?

Function (string object).replace() doesn't modify the string. It returns a new (replaced) string object.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-31 14:31:41  
@ loonquawl: Guess it should ;) thank you!
---------------------------------------
*[Mateusz &quot;loonquawl&quot; Zalega (http://loonquawl.yoyo.]()* on 2008-05-31 23:05:17  
No problem :)

There's another bug in this function. First argument of called function string.replace() is a string object '/&amp;amp;/g'. It won't work, unless it's a regular expression object (should be /&amp;amp;/g - without the apostrophes).
Here's the correct code:
```
    string = string.toString();
    
    // Always encode
    string = string.replace(/&amp;amp;/g, '&amp;');
    string = string.replace(/&amp;lt;/g, '&lt;');
    string = string.replace(/&amp;gt;/g, '&gt;');
    
    // Encode depending on quote_style
    if (quote_style == 'ENT_QUOTES') {
        string = string.replace(/&amp;quot;/g, '&quot;');
        string = string.replace(/&amp;#039;/g, '\'');
    } else if (quote_style != 'ENT_NOQUOTES') {
        // All other cases (ENT_COMPAT, default, but not ENT_NOQUOTES)
        string = string.replace(/&amp;quot;/g, '&quot;');
    }
    
    return string;
```

This is explained here:
http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:String:replace
http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:RegExp

Btw. Most people involved in php2js project have their full names in credits. So, my name's Mateusz Zalega. Just saying :)
---------------------------------------
*[Bob Palin]()* on 2008-07-27 01:50:45  
The function description says that 'quote_style' is an int and list constants, in fact the argument is a string as shown in the code and example.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-27 13:50:57  
@ Bob Palin: Thank you for noticing. It is possible to declare global constants in javascript, but that would increase the number of dependencies throughout this project.

We have deliberately chosen to implement this a bit different from the original PHP documentation to allow for more functions to be included separately.
---------------------------------------
*[Trevor]()* on 2008-09-17 19:55:32  
Issue: Doesn't decode all html escaped characters, such as &amp;#56;
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-21 21:40:22  
```
&lt;?php
echo html_entity_decode(&quot;&amp;#56;&quot;).&quot;\n&quot;;
?&gt;
```
returns 8. 

This behavior is not documented in the PHP manual though, do you know what table is used here?
---------------------------------------
*[ReverseSyntax]()* on 2008-09-25 06:57:11  
There is an error in the htmlspecialchars_decode(),
There a single quote around the regex for all params values in replace() except for &gt; the only one that works. this is in the php.min.js
---------------------------------------
*[Onno Marsman]()* on 2008-09-25 14:10:12  
There is a serious parse error in this function

```
string = string.replace(/&amp;gt;/g '&gt;');
```

should be (added a comma):

```
string = string.replace(/&amp;gt;/g, '&gt;');
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-29 12:31:25  
@ ReverseSyntax &amp;  Onno Marsman: Wow that was ugly. Sorry everyone. Fixed.
---------------------------------------
*[Liviu Mirea]()* on 2009-08-10 01:22:57  
```
htmlspecialchars_decode(' &amp;quot; '); 
```
In PHP it returns: &quot;

The Javascript function above returns: "
Basically, it first decodes "&amp;" to "&", thus resulting "&quot;". Afterward, it decodes "&quot;" but it shouldn't.
---------------------------------------
*[Liviu Mirea]()* on 2009-08-10 01:26:14  
Erm, ignore my message below, the caracters are messed up.
Here:
```
htmlspecialchars_decode(' &amp;quot; '); 
```
In PHP it returns: 
```
&quot;
```

The Javascript function above returns: "
Basically, it first decodes ```"&amp;"``` to ```"&"```, thus resulting ```"&quot;"```. It further decodes the string to a double quotation mark when it shouldn't.
---------------------------------------
*[Liviu Mirea]()* on 2009-08-10 01:31:30  
I'm sorry but the messaging system seems to be messed up and I can't post my message. What I'm trying to say is that the above function is incorrect. If you try to decode "& amp; quot;" (remove spaces) it will output a double quotation mark instead of "& quot;" (remove spaces). Hope this message will be properly posted. :/
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-16 15:38:06  
@ Liviu Mirea: I added your example as a testcase, but I was unable to reproduce the problem. 

What version & browser are you using?
---------------------------------------
*[Mailfaker](http://www.weedem.fr)* on 2009-11-25 01:05:38  
Hi everyone,
this code wasn't working for me. I have done some changes and now it runs.
The problem is that, for decoding, hash_map table must be read in descending order. Or simply, you can do so:
```
function htmlspecialchars_decode (string) {
    tmp_str = string.toString();
    tmp_str = tmp_str.split('&quot;').join('"');
    tmp_str = tmp_str.split('&lt;').join('<');
    tmp_str = tmp_str.split('&gt;').join('>');
    tmp_str = tmp_str.split('&amp;').join('&');
    return tmp_str;
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-25 12:47:32  
@Mailfaker: Thanks. I've completely redone the two htmlspecialchars functions in Git, also to handle flags and arguments: http://github.com/kvz/phpjs/commit/881de8748cf986d025ecfad5f448fbbb8ba7710e  . Btw, using replace was much faster for me (and easier) than using split and join.
---------------------------------------
*[hacksmw]()* on 2010-02-11 08:47:27  
htmlspecialchars_decode function in PHP doesn't work recursive.
but this function is too recursive.
so "&amp;#9787;" will not be converted by this function as "&#9787;"
however, it will be converted as "☻"
on the other hand, 
the function in php will convert it as "&#9787;"
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-02-13 04:39:10  
See my comment under htmlspecialchars()
---------------------------------------
*[Jerry]()* on 2010-04-27 07:20:39  
Here is my simple implementation of htmlspecialchars_decode.
I use just one replace and I have not come across a situation where an html entity is double-decoded. Comments are welcome
```
function(a,b){
var c={
     '&amp;':'&',
     '&lt;':'<',
     '&gt;':'>',
     '&quot;':'"',
     '&#039;':'\''
};
     if(b==='ENT_QUOTES'){
     return a.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g,function(a){return c[a];});
     }
     else if(b==='ENT_NOQUOTES'){
     return a.replace(/&amp;|&lt;|&gt;/g,function(a){return c[a];});
     }
     else{
     return a.replace(/&amp;|&lt;|&gt;|&quot;/g,function(a){return c[a];});
     }
}
```
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-04-27 17:19:59  
@Jerry: very short and clean solution. I just managed to replace the 3 .replace calls with just one, by choosing the regexp with a conditional expression.
```function htmlspecialchars_decode(input, quote_style){
   var c = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': '\''
   };
   return ('' + input).replace(quote_style === 'ENT_QUOTES' ? /&amp;|&lt;|&gt;|&quot;|&#039;/g : quote_style === 'ENT_NOQUOTES' ? /&amp;|&lt;|&gt;/g : /&amp;|&lt;|&gt;|&quot;/, function(a){return c[a]; });
}```

The performance of both solutions should be comparable.
And I added casting of the input to string.
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-04-27 17:27:48  
Sorry for the double comment, but now the code should be more readable

```function htmlspecialchars_decode(input, quote_style) {
	var c = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#039;': '\''
	};
	return ('' + input).replace(
		quote_style === 'ENT_QUOTES' ? /&amp;|&lt;|&gt;|&quot;|&#039;/g :
		quote_style === 'ENT_NOQUOTES' ? /&amp;|&lt;|&gt;/g :
		/&amp;|&lt;|&gt;|&quot;/,
		function (a) {
			return c[a];
		}
	);
}```
---------------------------------------
*[Jerry]()* on 2010-04-27 19:07:58  
Very nice - I think I will use your modification as its much tidier.
Don't forget the 'g' attribute on the last pattern.
---------------------------------------
*[Robert Sidlauskas](http://filesharepoint.com)* on 2010-07-10 11:23:14  
Hi its good.

<a href='http://filesharepoit.com'>Filesharepoint.com</a> 
---------------------------------------
