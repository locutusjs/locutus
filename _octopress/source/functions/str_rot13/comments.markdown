*[Ates Goral]()* on 2008-01-22 21:11:54  
Alternative implementation that doesn't use conditionals:

```
function str_rot13(str) {
    // *     example 1: str_rot13(&quot;Hello World!&quot;);
    // *     returns 1: &quot;Uryyb Jbeyq!&quot;
    // *     example 2: str_rot13(str_rot13(&quot;Hello World!&quot;));
    // *     returns 2: &quot;Hello World!&quot;
    
	return str.replace(/[A-Za-z]/g, function (c) { return String.fromCharCode((((c = c.charCodeAt(0)) &amp; 223) - 52) % 26 + (c &amp; 32) + 65); });
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-22 21:58:53  
@ Ates Goral: I agree, it's purdy ;)
---------------------------------------
*[Eric]()* on 2009-07-30 10:14:00  
Great!, only like 3 lines of code, I like this alot and its just what I'm looking for. Why on earth is this page not listed on Google for #1 spot of "rot13 javascript"?, on Google all I could find where old rot13 implementations that has like 40 lines of code written years ago using schemes for javascript 1.0. Glad I found this website! Thanks alot.


---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-07-30 13:58:04  
Not sure why it didn't make it, though at least str_rot13 with or without JavaScript made it to the first page. Thanks to your prompting, I went ahead and did a little further SEO investigation of the site and sent the recommendations to Kevin (though he's already done a fine job of bringing his site to sometimes even rival the PHP site when you search for PHP functions)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-04 12:32:33  
@ Eric & Brett Zamir: Both sites (php.js & my blog) have a pagerank of 5 currently. I guess it's just a matter of time for PHP.JS to receive more backlinks from other sites & get a higher ranking for people who want to find our javascript snippets.
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-04-23 09:18:06  
My proposition (uses the conditional operator)

```function rot13(x){ 
   return x.replace(/[a-z]/gi,function(s){ 
      return String.fromCharCode(s.charCodeAt(0)+(s.toLowerCase()<'n'?13:-13))}) 
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-04-23 11:24:21  
@ Rafał Kukawski: Excellent work! Tests pass, we fixes jslint issue, and and function is tighter. Thanks a lot!
http://github.com/kvz/phpjs/commit/f4fcf895c16ecce83550efc9c190c82ed118c06c
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-04-23 11:24:37  
@ Rafał Kukawski: Excellent work! Tests pass, we fixes jslint issue, and and function is tighter. Thanks a lot!
http://github.com/kvz/phpjs/commit/f4fcf895c16ecce83550efc9c190c82ed118c06c
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-04-23 11:35:31  
I forgot to cast the input value to string, please change
```str.replace(/[a-z]/gi ```
to ```(str + '').replace(/[a-z]/gi```
I think it's important.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-04-23 11:43:52  
@ Rafał Kukawski: It is, thanks!
http://github.com/kvz/phpjs/commit/0341548f49543d24a4f33f3261f5d844c3e12bbb
---------------------------------------
*[????? ????? ???](http://an3m1.com/)* on 2012-04-23 14:48:44  
I agree it is a very informative article and I actually enjoy reading good stuff unlike all the crap out there on the internet  

---------------------------------------
