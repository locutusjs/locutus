*[booeyOH]()* on 2008-01-21 18:35:41  
preg_quote() function for adding slashes to RegEx

Not sure if it is out there, but needed something quick, hope its helpful
```
function preg_quote( str ) {
	var quote_chars = [&quot;\\&quot;, &quot;.&quot;, &quot;+&quot;, &quot;*&quot;, &quot;?&quot;, &quot;[&quot;, &quot;^&quot;, &quot;]&quot;, &quot;$&quot;, &quot;(&quot;, &quot;)&quot;, &quot;{&quot;, &quot;}&quot;, &quot;=&quot;, &quot;!&quot;, &quot;&lt;&quot;, &quot;&gt;&quot;, &quot;|&quot;, &quot;:&quot;];
	var return_val = str;
	
	for(var i=0;i&lt;quote_chars.length;i++)
		{
		eval(&quot;var pattern = /\\&quot;+quote_chars[i]+&quot;/gi&quot;);
		return_val = return_val.replace(pattern, chr(92)+quote_chars[i]);
		}
	
	return return_val;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-22 07:40:04  
@ booeyOH: It sure is! Thank you!
---------------------------------------
*[Ates Goral]()* on 2008-01-23 18:14:03  
First, just a nitpick:

A set of characters can be used instead of the ORs:

```
return str.replace(/([&quot;'\\])/g, &quot;\\$1&quot;);
```

To add support for NUL:

```
return str.replace(/([&quot;'\\])/g, &quot;\\$1&quot;).replace(/\0/g, &quot;\\0&quot;);
```
---------------------------------------
*[Ates Goral]()* on 2008-01-23 18:18:10  
Additional test case:

```
    // *     example 2: addslashes(&quot;\&quot;'\\\0&quot;);
    // *     returns 2: &quot;\\\&quot;\\\'\\\\\\\0&quot;
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-23 20:24:09  
@ Ates Goral: Processed.
---------------------------------------
*[Martin]()* on 2008-02-27 23:47:40  
example 1 (the only one) on this page is incorrect, in that it doesn't actually add the slash. hehe.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-28 12:58:55  
@ Martin: Thanks for noticing. If you look at the source code, you see that the example is correct. But my blog probably filters out the backslash again. I'll look into it!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-01 17:02:17  
@ Martin: Fixed!
---------------------------------------
*[Jonas Raoni]()* on 2008-04-12 17:48:16  
It's missing the &quot;\&quot; escape.

return str.replace(/([&quot;'\\])/g, &quot;\\$1&quot;).replace(/\0/g, &quot;\\0&quot;)	;

Or

return str.replace(/([&quot;'\\\0])/g, function(_, n){
	return &quot;\\&quot; + (n == &quot;\0&quot; ? &quot;0&quot; : n);
});
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-13 12:34:05  
@ Jonas Raoni: I believe your proposal has the same regex, only here it's singlequoted for compatbility with Dean Edwards packer.
---------------------------------------
*[Sean Gallagher]()* on 2008-05-24 01:03:58  
Here is another quicky but good add slashes function!

P.S. I could not get your function to work.

```
function addslashes(str)
{
  // http://www.atlwebsite.com
 // By Sean Gallagher
 // Example: addslashes('what &quot;ya\'ll&quot; doing?')
 // Returns: what \&quot;ya\'ll\&quot; doing?
 str = str.replace(/'/g,&quot;\\'&quot;);
 return str.replace(/&quot;/g,'\\&quot;');
}
```
---------------------------------------
*[Dudi]()* on 2008-05-30 22:57:47  
It doesn't seem like the function works. And the example is wrong again. ;-)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-31 14:29:19  
@ Dudi: That's just my blog messing up 'addslashes'. Fixed though.
---------------------------------------
*[Nate]()* on 2008-07-22 07:41:52  
I couldn't get the function to work at first.  I made some changes, and here is what I came up with:

```
return str.replace(/([\\&quot;'])/g, &quot;\\$1&quot;).replace(/\0/g, &quot;\\0&quot;);
```

Also, the example should read,
&quot;kevin\\\'s birthday&quot; because the \' becomes '.  That is why it appears to work in the tester script.
---------------------------------------
*[Onno Marsman]()* on 2008-08-08 11:49:10  
It's probably also a good idea to convert str to a string to make sure .replace exists. 
addslashes(6) does work in PHP but not in this function

```
return (str+'').replace(/([\\&quot;'])/g, &quot;\\$1&quot;).replace(/\0/g, &quot;\\0&quot;);
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 18:10:59  
@ Nate &amp; Onno Marsman: Awesome job guys! I have been fooled by my tester for a long time. Addslashes has ben updated, and you have been credited accordingly. I've also changed the new testsuite to support addslashes behaviour.
---------------------------------------
*[Julien Paquit]()* on 2008-09-21 15:37:57  
Very useful code ! Because of some scripting needs (and compatibility), I add this portion of code to the original one :

```
return (str+'').replace(/([&quot;])/g, &quot;&amp;quot;&quot;).replace(/([\\'])/g, &quot;\\$1&quot;).replace(/\0/g, &quot;\\0&quot;);
```

Now I am able to pass recursively parameters without errors.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-21 22:01:07  
@ Julien Paquit: Thank you but I believe PHP does not do that automatically? If not, then we should not either, because we may surprise developers &amp; cause unexpected output.
---------------------------------------
*[Julien Paquit]()* on 2008-09-23 00:14:19  
Kevin : you are totally right. That was just a tip ;)
---------------------------------------
*[Denny Wardhana]()* on 2009-06-30 08:40:10  
Under "Strict Warnings" setup, 
```
/\0/g
```
produces Warning: non-octal digit in an escape sequence that doesn't match a back-reference.

How to remove that warning (and the function still working of course)?

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-06-30 11:45:20  
@Denny: Thanks for the report. I've fixed it in SVN. (use \u0000 instead--"\u" indicates a 4-digit hexadecimal Unicode sequence and \0 was a shortcut for this)
---------------------------------------
*[](http://oskar-lh.name)* on 2010-04-11 00:58:56  
Hi,
```replace(/[\\"']/g, "\\$&")```
might be faster than
```replace(/([\\"'])/g, "\\$1")```
---------------------------------------
*[](http://oskar-lh.name)* on 2010-04-11 01:00:00  
Hi,
replace(/[\\"']/g, "\\$&")
might be faster than
replace(/([\\"'])/g, "\\$1")
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-04-11 08:58:25  
@Oskar: Thanks, good point! Changed in git...
---------------------------------------
*[ball]()* on 2010-12-25 03:05:13  
thanks a lot!!!
---------------------------------------
*[Denis](www.divasbydesign.co.za)* on 2011-05-05 10:30:40  
very helpful :)
---------------------------------------
*[Denis](http://www.divasbydesign.co.za)* on 2011-05-05 10:31:29  
I found this very helpful in my coding :)
---------------------------------------
*[?]()* on 2011-07-28 11:00:22  
'

---------------------------------------
*[praveen](ajkds@ff.com)* on 2012-03-30 14:29:59  
adsdajdhadehaijdeiojni bondha
---------------------------------------
*[praveen](ajkds@ff.com)* on 2012-03-30 14:31:30  
oka mukka ardam kaledu ra yedava
---------------------------------------
*[????? ????????](http://an3m1.com/)* on 2012-05-06 09:32:18  
Great job here. I really enjoyed what you had to say. Keep going because you definitely bring a new voice to this subject. Not many people would say what you’ve said and still make it interesting 


---------------------------------------
