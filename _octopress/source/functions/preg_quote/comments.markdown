*[Ates Goral]()* on 2008-01-23 03:37:40  
Here's my take:

```
function preg_quote(str) {
    // *     example 1: preg_quote(&quot;*RRRING* Hello?&quot;);
    // *     returns 1: &quot;\\*RRRING\\* Hello\\?&quot;
    // *     example 2: preg_quote(&quot;\\.+*?[^]$(){}=!&lt;&gt;|:&quot;);
    // *     returns 2: &quot;\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\&lt;\\&gt;\\|\\:&quot;
    
	return str.replace(/[\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\&lt;\&gt;\|\:]/g, function(c) { return &quot;\\&quot; + c; });
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-23 08:31:52  
@ Ates Goral: There you go, 2 gold medals :)
---------------------------------------
*[Ates Goral]()* on 2008-01-23 17:58:31  
After looking at the implementation of addslashes(), I realized that this could have been simply achieved with:

```
return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\&lt;\&gt;\|\:])/g, &quot;\\$1&quot;);
```

I don't know why I chose to use a replacement function in the first place :)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-23 20:20:44  
@ Ates Goral: Kaizen principles FTW
---------------------------------------
*[Simple preg_replace_callback]()* on 2008-04-12 08:33:47  
```
function preg_replace_callback(reg, cbck, str){
	return str.replace(REGEXP, function(arguments){return window[cbck](arguments);});
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-13 12:18:46  
@ ?: Hi, thanks for the contribution. There are some things that keep me from including this in php.js. Firstly I don't know your name so I cannot credit you, Secondly, I don't know if the perl regular expressions are 100% compatible with the javascript regex engine. Do you know this?
---------------------------------------
*[Jon L.]()* on 2011-07-15 18:37:30  
PHP regex (PCRE) and JS regex (ECMA) are not 100% compatible:
http://www.regular-expressions.info/refflavors.html << see chart for differences.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-07-20 03:35:47  
@Jon. L: Yes, that's true--I guess you are talking about the fact that we escape "<" and ">"? Yeah, those could be removed, but 1) It is harmless to escape them, 2) Safer to behave like PHP in case someone is passing something back to PHP, 3) I'm hoping at some point for us to port and build upon XRegExp so that our library does support the full PCRE syntax.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-07-20 03:36:59  
In addition to my post just now, there is also the possibility of ECMAScript itself supporting the more advanced syntax (not sure if they would for reasons of backward-compatibility).
---------------------------------------
