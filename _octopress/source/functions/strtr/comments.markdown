*[uestla]()* on 2009-03-10 13:35:01  
In PHP the function strtr() called with three arguments (string, from, to) replaces the characters in the whole string. Shouldn't be the global modificator 'g' in your script?

Thanks for your answer, uestla (sorry for my english).
---------------------------------------
*[Jason Wang](www.carrot.org)* on 2009-05-29 09:36:38  
There is a bug for the function. For example, when using PHP strtr("abc","abc","cba") the result is "cba". But using this function, the result is "aba". Because the first character "a" is replaced by "c", however it became "a" when trying to replace all character "c" with "a". Maybe here we can use some array to store the status as well the chars in order to solve the problem. 
Good Luck
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-30 05:37:10  
Kevin fixed it in SVN...Thanks for the reports!
---------------------------------------
*[Roland Hentschel]()* on 2009-06-30 08:32:41  
An implementation for this script:

http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_chr/

```
function charmap(font) {
	document.write("<style>\n*{font-family:"
	+font+"; font-size:24pt;}\n</style>\n");
	document.write("<table>\n");
	for (x=0;x<16;x++) {
		document.write("<tr>\n");
		for (y=0;y<16;y++) {
			document.write("<td>"+chr(16*x+y)+"</td>\n");
		}
		document.write("</tr>\n");
	}
	document.write("</table>\n");
}
```
---------------------------------------
*[Frank Forte](http://thenetgen.com/)* on 2009-07-02 15:25:46  
I found the following error with the htmlspecialchars() function when doing the following:

```
el.innerHTML = htmlspecialchars('test 1 < 2 ');
```

The output (inserted into the element) was
'test 1 &lt; 2'

The htmlspecialchars function does this:
step 1  < turns to &lt;
step 2 &lt; turns to &amp;lt;

This is because the & symbol would be converted AFTER the < character was converted (or any other character for that matter)

I fixed the problem by moving the line:
```
entities['38'] = '&amp;';
```
near the top of the html_translation_table() function,
right above the the following line:

```
 if (useTable === 'HTML_ENTITIES') {
```

This would make sure that the & characters is converted first, then the rest of the charachters would be converted.

-Frank Forte
---------------------------------------
*[T.Wild]()* on 2009-07-02 22:59:55  
@Frank Forte
You may want to post your problem over at
http://phpjs.org/functions/htmlspecialchars
rather than here on strtr
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-03 13:52:01  
@ Roland Hentschel: Thanks for sharing

@ Frank Forte & T.Wild: Cool, let's continue at the page suggested by T.Wild
---------------------------------------
*[kwemart]()* on 2009-10-31 12:25:41  
hi this function is very nice but I propose an other solution , it only work with a regular expression.

```
function strtr(str,from,to)
                  {
                  var patt=str.split(from),str2="";
                  var l=patt.length,i=1;
                  while(i<=l-1){str=str.replace(from,to);i+=1;}
                  return str;
                  }
```


---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-11-07 18:50:03  
@ kwemart: Thanks for sharing. However with your code, only the 3rd example produces the expected output. The other ones fail :(
---------------------------------------
*[kwemart]()* on 2009-11-20 12:10:58  
@kevin van

yes I know my function is just for regulars expressions
it wouldn't work with ayyay but I'll update it later 

cheer .
---------------------------------------
*[jpfle]()* on 2009-12-09 22:30:16  
Hi. Thanks for this useful function. I use it in a script generating a table of contents for XHTML pages. Each title in a page is transliterated ('à' => 'a', 'é' => 'e', 'î' => 'i', etc.) with strstr() to create an anchor. However, there's a bug with Internet Explorer 6. Take this code:

```
var texte = 'çà et là';
texte = strtr(texte, {'ç': 'c', 'à': 'a', ' ': '-'});
alert(texte);
```

Firefox (3.5.5) outputs "ca-et-la", as expected, but IE6 outputs "ca-undefinedundefined-undefineda".
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-10 05:42:56  
@jpfle: Should now be fixed: http://github.com/kvz/phpjs/blob/master/functions/strings/strtr.js . Please note that I've needed to add a new dependency: ini_set(). Also, this will not work with IE5 as is, since I also added for-in filtering for hasOwnProperty (you can remove the check (or alter it to at least make sure from[fr] is a string) if you need to support IE5, but you risk interfering with other libraries that override the Object prototype; otherwise it's best to leave it as is).
---------------------------------------
*[jpfle]()* on 2009-12-11 04:25:40  
@Brett: Thanks for your answer. However, it no longer works neither on Firefox nor IE. Here's what I packaged on phpjs.org:

- `i18n_loc_get_default()`
- `i18n_loc_set_default()`
- `ini_set()`
- `krsort()`
- `strtr()`

and then I replaced `strtr()` by github's version. With the same code of my previous comment, "ça et là" is output on Firefox and IE without any translation, namely "ça et là". Firefox's Error Console is empty.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-11 12:40:42  
@jpfle: Sorry, I had also needed to update krsort() recently too. Please use the version at http://github.com/kvz/phpjs/blob/master/functions/array/krsort.js
---------------------------------------
*[jpfle]()* on 2009-12-11 16:20:54  
@Brett: it works very great now. Thanks again! :-)
---------------------------------------
*[Robert]()* on 2010-12-01 20:41:28  
What about something more like this? I saw an example of using this for urlencode and thought it would work well for strtr.

```
function strtr(base, old, n){
  return base.replace(/[A-Za-z0-9_.-]/g, function (s) {
    for (var k = 0; k < old.length; k++) {
      if (s == old.charAt(k) && k < n.length) {
        return n.charAt(k);
      }
    }
  });
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-12-02 09:55:47  
@Robert: Please try your function against the existing examples to make sure it works. Thanks...
---------------------------------------
*[odin](http://preseka.mygamesonline.com)* on 2011-03-27 23:45:26  
Hey i maid even bether one look down:
it contanis 0 loops for norma use and 1 loop for advanced use
```
function strtr(s,f,t)
{
core=function(str,from,to){//core function
str=str.split(from);//breake parts that we wan't to
str=str.join(to);//glue with new parts that we wan't to
return str;
};//end of core function
if(!t){//check if we use advanced option
r=s;
for(e in f){//loop
r=core(r,e,f[e]);//call our core function
}
return r;// end code and retun value
}
//normal use
return core(s,f,t); // just call normal core function and return
}
/*
example:
normal use:
   strtr("This string is string.","string","text");
=This text is text.

advanced use
  strtr("This string is texty.",{'texty':'text','string':'text'});
=This text is string.

advanced use WARNING!
  strtr("This string is text.",{'text':'string','string':'text'});
=This text is text.
this is not switcher it's replacer!!
*/
```
---------------------------------------
*[Breton]()* on 2011-05-10 11:24:02  
Hi, there is a new bug in IE9 with the function strtr !
This line doesn't work : "if (str.substr(i, from[j].length) == from[j]) {"
Have you got any idea ?

You can see the error here : http://imageshack.us/photo/my-images/805/bugc.jpg/

Fucking IE ! ^^'
---------------------------------------
*[Theriault]()* on 2011-05-13 10:28:09  
@Breton: I can't verify it because I don't have IE9, but my guess on a fix would be changing line 55 from...
```
tmpFrom.push(fr);
```
to...
```
tmpFrom.push('' + fr);
```
Let us know if this fixes it.
---------------------------------------
*[????? ????????](http://an3m1.com/)* on 2012-04-10 09:52:43  
Great job here. I really enjoyed what you had to say. Keep going because you definitely bring a new voice to this subject. Not many people would say what you’ve said and still make it interesting 

---------------------------------------
