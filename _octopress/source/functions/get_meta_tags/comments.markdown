*[Raphael (Ao) RUDLER](- working on it)* on 2009-06-07 18:33:02  
Hi, 

I noticed warnings under ie7 under vista for this function.
I had to replace :
```fulltxt= this.file_get_contents(file).match(/^[^]*<\/head>/i);```
by 
```fulltxt= this.file_get_contents(file).match('/^[^]*<\/head>/i');```

bytheway, thanks for all that work you made.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-08 02:02:45  
Sorry, there had been several bugs in the latest versions of get_meta_tags() and file_get_contents() on which it depended. Those should all be fixed those now, so please use the latest copies for these. However, your own suggested fix will not work because that is no longer a regular expression and became instead a string (that text will no doubt never be found).

Explorer apparently has a problem if a negated character class in a regular expression is empty (e.g., [^]). We use a negated character because 1) We want to use something equivalent to the "." (any character) until we reach the text after it that we do want, but... 2) we want to reach across multiple lines (and the 'm' flag, does not, as is frequently supposed, do this). Although it doesn't look like any character is explicitly forbidden in HTML (only XHTML), since we have to add some character, I added the null control character \u0000. If someone knows another better unlikely character or approach, let us know, but I think that should be a safe bet for now.

Thanks for reporting the issue.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-08 02:18:54  
Ok, came across a better trick than the already-pretty-safe negation I was using...Just use [\s\S] which allows a single character to be either a whitespace (including newilne) or non-whitespace--in other words anything...
---------------------------------------
*[Raphael (Ao) RUDLER]()* on 2009-06-17 20:55:15  
works effectively better :)
---------------------------------------
*[????? ??????](http://www.iraqni.com)* on 2011-08-21 22:28:00  
thank you the function is good
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-08-23 06:52:33  
دردشة عراقنا: Glad you liked it!
---------------------------------------
