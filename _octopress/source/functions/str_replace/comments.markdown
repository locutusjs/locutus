*[sbsweb]()* on 2008-02-19 13:13:37  
Increible, ese .js es de lo mÃ¡s Ãºtil que he visto.
---------------------------------------
*[G.Paderni]()* on 2008-03-02 18:48:20  
oh, sorry there's an error please remove my last comment

this one is ok:
```
function str_replace(search,replace,subject) {
	// by: Gabriel Paderni

	if(!(replace instanceof Array)){
		replace=new Array(replace);
		if(search instanceof Array){//If search  is an array and replace  is a string, then this replacement string is used for every value of search
			while(search.length&gt;replace.length){
				replace[replace.length]=replace[0];
			}
		}
	}

	if(!(search instanceof Array))search=new Array(search);
	while(search.length&gt;replace.length){//If replace  has fewer values than search , then an empty string is used for the rest of replacement values
		replace[replace.length]='';
	}

	if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
		for(k in subject){
			subject[k]=str_replace(search,replace,subject[k]);
		}
		return subject;
	}
	
	for(var k=0; k&lt;search.length; k++){
		var i = subject.indexOf(search[k]);
		while(i&gt;-1){
			subject = subject.replace(search[k], replace[k]);
			i = subject.indexOf(search[k],i);
		}
	}

	return subject;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 19:34:09  
@ G.Paderni: Good point! Thank you for contributing!
---------------------------------------
*[Philip]()* on 2008-03-30 07:01:37  
There's only a slight problem with this code...  in PHP, each entry is replaced all at once, rather than one after another.  This creates a problem in the following example:

```
function parseInf(kyl){

kyl=str_replace([
&quot;{name}&quot;,
&quot;l&quot;
],
[
&quot;hello&quot;,
&quot;m&quot;
],
kyl);


nev=kyl.split(/\r{0,1}\n-\r{0,1}\n/);


return nev;


}

alert(parseInf(&quot;{name}, lars&quot;));
```

Theoretically, the code should return &quot;hello, mars&quot;, but instead it returns &quot;hemmo, mars&quot;.  It completes the first iteration before the second, rather than all at once.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-31 08:13:31  
@ Philip: Thanks for noticing. My first thought is to order the search array by length, ascending. This way 'l' will be searched &amp; replaced before hello will be.
Do you agree that that would solve the issue?
---------------------------------------
*[Philip]()* on 2008-03-31 08:41:24  
Not necessarily; what if a result produced by the replacement of one of the shorter strings produced the values of one of the longer searches?  Here's a code that works, but I haven't indented the part that I made yet, or commented it, and it requires a second external function... I dunno if you can fix that or not.



```
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'

function regexp_escape(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}

function str_replace(search, replace, subject)
{

    if(!(replace instanceof Array)){
        replace=new Array(replace);
        if(search instanceof Array){//If search    is an array and replace    is a string, then 

this replacement string is used for every value of search
            while(search.length&gt;replace.length){
                replace[replace.length]=replace[0];
            }
        }
    }
 
    if(!(search instanceof Array))search=new Array(search);
    while(search.length&gt;replace.length){//If replace    has fewer values than search , then an 

empty string is used for the rest of replacement values
        replace[replace.length]='';
    }
 
    if(subject instanceof Array){//If subject is an array, then the search and replace is 

performed with every entry of subject , and the return value is an array as well.
        for(k in subject){
            subject[k]=str_replace(search,replace,subject[k]);
        }
        return subject;
    }




numreplx=search.length;
numon=0;
fincods=new Array();
while(fincods.length&lt;numreplx)
{
nsub=subject;
for(x=0;x&lt;fincods.length;x++)
{
nsub=nsub.replace(new RegExp(regexp_escape(search[x]), &quot;g&quot;), &quot;[cod&quot;+fincods[x]+&quot;]&quot;);
}
for(x=0;x&lt;fincods.length;x++)
{
nsub=nsub.replace(new RegExp(regexp_escape(&quot;[cod&quot;+fincods[x]+&quot;]&quot;), &quot;g&quot;), replace[x]);
}
if(nsub.indexOf(&quot;[cod&quot;+numon+&quot;]&quot;) == -1)
{
fincods[fincods.length]=numon;
}
numon++;
}
for(x=0;x&lt;fincods.length;x++)
{
subject=subject.replace(new RegExp(regexp_escape(search[x]), &quot;g&quot;), &quot;[cod&quot;+fincods[x]+&quot;]&quot;);
}
for(x=0;x&lt;fincods.length;x++)
{
subject=subject.replace(new RegExp(regexp_escape(&quot;[cod&quot;+fincods[x]+&quot;]&quot;), &quot;g&quot;), replace[x]);
}
return subject;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-31 17:16:27  
@ Philip: A seemingly straightforward function like str_replace turns out to be more complex than e.g. mktime :) I've indented your code and included the extra function (had to 'var' it for namespacing compatibility) in str_replace.

Thanks A LOT for seriously improving this function!
---------------------------------------
*[Philip]()* on 2008-03-31 17:20:52  
No problem!

Also:  Credits to Simon Willison (http://simonwillison.net/2006/Jan/20/escape/) for the regexp_escape function.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-31 17:31:45  
@ Philip: Cool, I've included Simon as well. Thanks again.
---------------------------------------
*[Jonas Raoni]()* on 2008-04-12 17:23:37  
For the str_replace the best and fastest method I know it's:

&quot;Jonas Raoni&quot;.split(&quot;a&quot;).join(&quot;X&quot;);
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-13 12:20:22  
@ Jonas Raoni: Hi there, how have you been? Thats a brutal approach :) However the long code we have now supports some features that your approach does not. For more information see the comments here. Thanks for this insightful way though!
---------------------------------------
*[Philip Peterson]()* on 2008-04-15 08:47:18  
Hmm, I actually can see where that could come in useful though...

```

nsub = nsub.replace(new RegExp(__regexp_escape(search[x]), &quot;g&quot;), &quot;[cod&quot;+fincods[x]+&quot;]&quot;);

could work with

nsub = nsub.split(search[x]).join(&quot;[cod&quot;+fincods[x]+&quot;]&quot;);
```

and that sort of thing occurs in four places, so there's a significant drop in size, and you probably can even drop that __regexp_escape function [sorry Simon :(].  You probably should keep him in the credits though, even if you take the function out.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-15 09:03:43  
@ Philip Peterson: If you like you can now do this in SVN ;)
---------------------------------------
*[Jonas Raoni]()* on 2008-04-17 06:05:09  
I just made this code, it's using the already present is_array function.

function str_replace(f, r, s){
	var ra = is_array(r), sa = is_array(s), f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;
	while(j = 0, i--)
		while(s[i] = s[i].split(f[j]).join(ra ? r[j] || &quot;&quot; : r[0]), ++j in f);
	return sa ? s : s[0];
}

Example:

alert(str_replace([&quot;a&quot;, &quot;fb&quot;, &quot;c&quot;], [&quot;f&quot;, &quot;g&quot;], [&quot;abcd&quot;]));
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-17 13:03:01  
@ Jonas Raoni: That looks very promising :) I still have to test it but if you have reduced our function to this, preserving all of it's functionality, then you deserve 3 medals ;)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-17 13:49:50  
@ Jonas Raoni: I've updated, committed, generated, deployed, tested, reverted, commited, generated &amp; deployed ;)

And srry dude but your str_replace did not survive Peter's testcase:
```
// should return: hello, mars
str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
```

More info in the comments here.
Guess I'll be needing those medals back ;) nah just kidding :)
---------------------------------------
*[Philip Peterson]()* on 2008-04-18 02:03:15  
Wow... bravo is all I can say... that's more than 20x faster than my code, too, lol...
---------------------------------------
*[Philip Peterson]()* on 2008-04-18 02:05:20  
Woah, I didn't see comments #16 or #15... hmm, I'm surprised, it definitely has merit, though...
---------------------------------------
*[Jonas Raoni]()* on 2008-04-18 04:06:47  
I didn't looked the comments before, I just saw the code was long and made a version :)~

But it's strange... What php version are you using? The following code, on php 5, gave me as output &quot;hemmo, mars&quot;:

echo str_replace(array('{name}', 'l'), array('hello', 'm'), '{name}, lars');
---------------------------------------
*[Philip]()* on 2008-04-18 05:31:00  
That is incredibly weird... I was certain that PHP replaced all the stuff at once so as not to create overlap... ah well, I guess it's not like that after all.  It was a cool function though :P
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-18 08:21:28  
@  Jonas Raoni: That's astonishing :D The non-overlapping approach was convincing enough for me not to take the effort to test if this was the actual mechanism of PHP. It would make sense though right? Anyway, I will reinstate your version Jonas Raoni, and adjust the test case. Thanks for all of your work! You too Peter, some functions come easy, some tend to be a little of a pain. But that's the challenge &amp; learning experience, right.
---------------------------------------
*[Anton Ongsono](www.callrid.com)* on 2008-09-25 05:37:12  
i have try to use this, but i five me error in FF 2 :  
```
s[i] has no properties
[Break on this error] while (s[i] = s[i].split(f[j])....in(ra ? r[j] || &quot;&quot; : r[0]), ++j in f){};
```

so that i tried to fixed like this :
```
function str_replace(search, replace, subject) { 
    var f = search, r = replace, s = subject;
    var ra = is_array(r), sa = is_array(s), f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;
 
    while (j = 0, i--) {
		if (s[i])
		{
        	while (s[i] = s[i].split(f[j]).join(ra ? r[j] || &quot;&quot; : r[0]), ++j in f){};
		}
    };
     
    return sa ? s : s[0];
}
```
---------------------------------------
*[Anton Ongsono](http://www.callrid.com)* on 2008-09-25 05:40:09  
i have try to use this, but i five me error in FF 2.0.0.16 :
```
s[i] has no properties
[Break on this error] while (s[i] = s[i].split(f[j])....in(ra ? r[j] || &quot;&quot; : r[0]), ++j in f){};
```
so that i tried to fixed like this :
```
function str_replace(search, replace, subject) { 
    var f = search, r = replace, s = subject;
    var ra = is_array(r), sa = is_array(s), f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;
 
    while (j = 0, i--) {
    if (s[i])
    {
          while (s[i] = s[i].split(f[j]).join(ra ? r[j] || &quot;&quot; : r[0]), ++j in f){};
    };
    };
     
    return sa ? s : s[0];
}
```
---------------------------------------
*[Onno Marsman]()* on 2008-09-25 14:35:54  
Why be dependant on is_array when you could just use &quot;instanceof Array&quot; ? This probably saves a bit of performance too.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-29 12:26:31  
@ Onno &amp; Anton: Both excellent points. Function updated. Thank you!
---------------------------------------
*[T.Wild]()* on 2008-11-26 18:59:50  
I think the following line should should probably be changed from:
```
var f = search, r = replace, s = subject;
```
TO
```
var f = search+'', r = replace+'', s = subject+'';
```

Found this problem (if anyone is interested) when trying:
```
str_replace(&quot;foo&quot;,&quot;baa&quot;,location);
//You get the same problem with
str_replace(34,9,123456);
```
---------------------------------------
*[T.Wild]()* on 2008-11-26 21:34:10  
OOPS, I leaped before I looked at the code properly, this may be a better idea but I'm not the best JavaScript programmer in the world.
```
    var f = search, r = replace, s = subject;

    var ra = r instanceof Array, sa = s instanceof Array, f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;

    if(!ra){r+='';}
    if(!sa){s+='';}
    if(!(f instanceof Array)){f+='';}
```
---------------------------------------
*[Onno Marsman]()* on 2008-11-26 21:51:10  
T.Wild: I don't have time for testing right now but doesn't the following do the trick a bit better?
When you do pass an array you'd also want every element to be a string.
I don't see any need to convert r to string(s), but I could be wrong. I find the code a bit hard to read.
Why the whole variable name replacement thing anyway? I thought we have a compiler to do this. This only results in more code after compilation.

 
```
while (s[i] = (s[i]+'').split(f[j]).join(ra ? r[j] || &quot;&quot; : r[0]), ++j in f){};
```
---------------------------------------
*[Onno Marsman]()* on 2008-11-26 21:54:22  
To be clear: I've only changed the s[i] to (s[i]+'') in that line.
---------------------------------------
*[T.Wild]()* on 2008-11-26 23:15:25  
IN REPLY TO Onno Marsman.
As I said 'I'm not the best JavaScript programmer in the world.' and what I submitted worked for me (well, almost, r+='' should have been r = r+'' etc) in my limited tests, and I was having trouble seeing what the original code was doing anyway - I don't particularly  like the shorthand ways of writing ifs etc - that's why I converted s,r and f to strings to be sure.

Your code fix works fine and sorry for the trouble.
---------------------------------------
*[Onno Marsman]()* on 2008-11-27 18:39:30  
No trouble at all! I guess you've misunderstood me. Like I said I also don't like that whole shorthand stuff. It's very hard to read indeed.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-01 08:41:55  
@ Onno Marsman &amp; T. Wild: It's not my preferred coding style either, we may need to refactor it some day so it will be more consistent to other code found in php.js
---------------------------------------
*[acimeha]()* on 2009-01-22 12:29:55  
hi there !
consider this as solution for str_replace

str = str.replace(new RegExp(&quot;\n\r&quot;, 'gi'), &quot;\n&quot;);


best regards
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-22 13:05:12  
acimeha, yes, using the native JavaScript replace works fine for most cases, but this project aims to support PHP's behavior, which also allows arrays as inputs.
---------------------------------------
*[jonze]()* on 2009-01-30 09:16:49  
hello and congratulations for this article(and script also). I needed something like str_replace from php very fast done with javscript and seems that your script does that very well!

Regards!
---------------------------------------
*[avel](http://www.qespai.com/sincronia)* on 2009-02-20 12:06:38  
Thanks a lot for this blog. Is really usefull.

i'm from Barcelona and i'm a baby php programer and this php.js library look like so good.

note: my website is nearly in net.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-21 12:49:05  
@ avel: Be sure to checkout http://phpjs.org, I'm making some progress there.
---------------------------------------
*[Oleg Eremeev]()* on 2009-05-04 11:33:30  
 Hello. I downloaded yesterday php.full.js. Library is very good, thank you for proceeding. But I tried to use str_replace function. It works not properly. Function replaces all items of search array with first item of replace array found in subject string. I wrote modified function:

```
function str_replace(search, replace, subject) {
    var s = subject;
    var f = [].concat(search);
    var r = [].concat(replace);
    var l = (f.length>r.length) ? r.length : f.length;
    var i = 0;
	
    for (i=0; i<l; ++i)
    {
        s = s.split(f[i]).join(r[i]);
    }
	
    return s;
}
```

This one do all I want. I hope it is useful, but I am not sure is it correct.

Sorry for my bad English, I am schoolboy from Latvia. 
---------------------------------------
*[Oleg Eremeev]()* on 2009-05-04 11:36:14  
In previous post something wrong.

```
function str_replace(search, replace, subject) {
var s = subject;
var f = [].concat(search);
var r = [].concat(replace);
var l = (f.length>r.length) ? r.length : f.length;
var i = 0;

for (i=0; i<l; ++i)
{
	s = s.split(f[i]).join(r[i]);
}

return s;
}
```
---------------------------------------
*[Oleg Eremeev]()* on 2009-05-04 11:37:25  
Why Code is uploading not correctly???
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-04 15:41:01  
Hi Oleg,

Thanks for pointing out the bug... There was also a bug in handling the subject as an array. Should be fixed in SVN now. I think I might have also fixed the comments.

Btw, we can't just use the shorter length since the PHP behavior is to allow a longer search array to have extra items be replaced by the empty string (i.e., the extra items do get replaced (removed)).

I also added the count param...
---------------------------------------
*[Oleg Eremeev]()* on 2009-05-04 18:59:06  
Hi Brett,

My code can convert extra items to empty strings too:```
function str_replace(search, replace, subject) {
    var s = subject;
    var f = [].concat(search);
    var r = [].concat(replace);
    var l = f.length;
    var i = 0;
	
    for (i=0; i<l; ++i)
    {
        s = s.split(f[i]).join((r[i]!=undefined)?r[i]:'');
    }
	
    return s;
}
```But I forgot about count param. It's more difficult. Anyway, I don't want it. :)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-05 01:50:49  
See my changes at http://trac.phpjs.org/projects/phpjs/browser/trunk/functions/strings/str_replace.js . I've tested all the PHP examples, and they are all working. Note that count must be in string form, and must out of necessity reference a global.
---------------------------------------
*[Oleg Eremeev]()* on 2009-05-05 17:28:55  
Ok. Good job, the function is written very correctly. :) 
But why:
[...for (i=s.length-1; i >= 0; i--) {...]
not:
[...for (i=0; i <= s.length-1; i++) {...]
??? String-array will be parsed from right to left? I don't know PHP function specification, but I think count param is used to count affected symbols from left to right, it's more useful. Am I right?
---------------------------------------
*[Oleg Eremeev]()* on 2009-05-05 19:44:59  
Oh, sorry! I have read the documentation on php.net. I thought count param limits count of replaces, but it only counts replaces. I wrote a complete delusion, sorry. :)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-06 00:57:45  
@Oleg, as far as why the loop goes down, there is no good reason, except that I was kind of following the pattern that was there previously. :)  I changed it to an ascending loop to follow convention and not raise the same question for others. I also optimized the for loops a little by checking for the length at the beginning of the loop instead of upon each iteration. Thanks!
---------------------------------------
*[Oleg Eremeev]()* on 2009-05-07 20:53:27  
I am happy to help you! ;)
---------------------------------------
*[Oleg Eremeev]()* on 2009-05-07 20:59:38  
You forgot to change i-- in for() loop to i++ (or ++i - no difference :) ).
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-08 00:38:38  
Ouch! Thanks!  I fixed that, and also had a bug in the next for loop initialization. Ok now in SVN... Thanks again...
---------------------------------------
*[Erik](erikpoehler.com)* on 2009-08-10 14:43:44  
One question: JSLint complains about
```while (j = 0, i--) {
Problem at line 50 character 17: Expected ')' to match '(' from line 50 and instead saw ','.```


Any idea how to fix this and the resulting errors in JSLint? Much appreciated!
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-10 16:06:16  
@Erik: Just use the latest version here now; I recall the code had some buggy behavior, so it was fixed not too long ago.
---------------------------------------
*[Max](http://www.so-bitter.com/)* on 2009-08-12 14:25:58  
Why do you use such a complicated function?
I have this one in use and it works fine:

```
function str_replace(search, replace, subject) {
    return subject.split(search).join(replace);
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-16 15:41:40  
@ Max: It has to do with speed & PHP compliance. Your function will produce different results from PHP's in some cases. Among things, this has to do with Philip's comment from 30 Mar '08
---------------------------------------
*[Iosif]()* on 2010-09-06 16:16:17  
```
function str_replace(search, replace, subject)
{
	if(is_array(search)) 
	{
		if(is_array(replace))
		{
			for(i in search)
			{
				subject = subject.split(search[i]).join(replace[i]);
			}
		}
		else
		{
			for(i in search)
			{
				subject = subject.split(search[i]).join(replace);
			}
		}
	}
	else
	{
		subject = subject.split(search).join(replace);
	}

    return subject;
}
```
---------------------------------------
*[Iosif]()* on 2010-09-06 16:17:44  
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-09-08 19:53:13  
@ losif:  Your str_replace will produce different results from PHP's in some cases. Among things, this has to do with Philip's comment from 30 Mar '08

As for your is_array, we also want it to return true for associative arrays (which we use JavaScript objects for). So just testing for the Array constructor wil fail for:

names['first'] = 'losif';
```
if (is_array(names)) {
    // Won't reach. names is an object in JavaScript terms.
}
```
---------------------------------------
*[Ghabriel Nunes]()* on 2010-10-31 21:11:45  
Hi, I did make a preg_replace() function (it have the parameters: pattern, replacement, subject, limit) that doesn't use the eval() function (so it's better in terms of performance). I don't know if here is the right place, but I'll post it:

Example 1: preg_replace(/Kevin/,'','Kevin Kevin van Zonneveld')
Returns 1: 'van Zonneveld'

Example 2: preg_replace(/Kevin/,'','Kevin Kevin van Zonneveld',1)
Returns 2: 'Kevin van Zonneveld'


```
function preg_replace(pattern,replacement,subject,limit){
	
	if (subject.match(pattern) == null){
		return subject;
	} else {
		if (!limit){
			p = pattern + '', m = '';
			if (p.match(/\/([^/]*)\/i/) != null){
				m = 'i';
			}
			p = p.replace(/\//g,'').replace(m,'');
	
			p = new RegExp(p,(m + 'g'));
			pattern = p;
			
			return subject.replace(pattern,replacement);
		} else {
			for (i = 0; i < limit; i++){
				subject = subject.replace(pattern,replacement);
			}
			return subject;
		}
	}
}
```


---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-11-01 02:28:42  
@Ghabriel Nunes: Thanks for submitting. If you go to our functions page and see the link to the missing functions (at http://phpjs.org/unported/index ), you can see functions like preg_replace which may have already been implemented in some form (or just go to Github directly). I'm kind of holding off on doing much with these, personally speaking, until we (or someone) will incorporate the powerful XRegExp.com code into these preg_* functions. And you can see http://github.com/kvz/phpjs/blob/master/_workbench/pcre/preg_match.js for a skeleton of how I'd hoped we could eventually implement other PHP regex features not even supported yet in XRegExp: http://github.com/kvz/phpjs/blob/master/_workbench/pcre/preg_match.js . (Basically PHP regex has a lot more we'd like to see made available than JavaScript allows natively, so it's a bit of work to really get it working closer to that reality.)

@Kevin: Seems the site has lost cookies now for a while. An easy way to put that back? Also, btw, it seems like your site is now unavailable from China without a proxy because one of the scripts is loading bit.ly content apparently.
---------------------------------------
*[Ghabriel Nunes]()* on 2010-11-01 19:41:00  
So, I need to go to somewhere to post my function or someone will do it for me?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-11-02 03:45:27  
@Ghabriel: Normally, you can leave comments on the "Add Function" page as you did or if it is a modification, you can leave it on the relevant function's page. 

But in this case, my point is that our existing code in our "workbench" nor your code adequately meets our requirement of matching PHP behavior as closely as possible so we are not intending to release anything publicly until it meets the requirements I mentioned. We thank you for offering though, and you're welcome to try to meet the conditions I mentioned, but it would require quite a bit of JavaScript knowledge (and effort) in this case.

---------------------------------------
*[bajick](www.bolitbajick.com)* on 2010-12-10 02:51:10  
Thank you so much! Nice work!
---------------------------------------
*[Oziam]()* on 2011-01-22 00:28:34  
This is my equivalent to PHP str_ireplace, it will search a given string for bad characters contained in an Array and replace if found. It will strip ALL upper & lowercase instances from string.

```
// Author: Oziam

function str_ireplace(str){
var bad = new Array('cc:','to:','content-type','href','\\n+','\\r+','\\t+','%0a+','%0d+','%08+','%09+');
var replace = "";
var result = "";
var x;
var  oldi = 0;
for (x in bad){
for (i = str.toLowerCase().indexOf(bad[x]); i > -1; i = str.toLowerCase().indexOf(bad[x],i)){
result += str.substring(oldi,i);
result += replace;
i += bad[x].length;
oldi = i;}
}
return result+str.substring(oldi,str.length);
}
```

Usage:
====

var string = "Send to: cc: bcc: etc.....";

str_ireplace(string);

returns;

Send   etc.....
---------------------------------------
*[Al Newmann]()* on 2011-09-01 19:35:12  
For the very basic functionallity of the str_replace() function as shown in Example 1 there are two way easier and shorter solutions:

1) ```
     var cadena = "Cry%20of%20the%20Black%20Birds";
     cadena.split("%20").join(" ");
     // result : cadena == "Cry of the Black Birds"
    ```

2) ```
     var cadena = "Cry%20of%20the%20Black%20Birds";
     cadena.replaceAll("%20"," ");
     // result : cadena == "Cry of the Black Birds"
    ```

The code shown in the OP is very good and covers the whole functionallity of the str_replace() function, but if you are only looking for the basic of it, maybe you want to try these out.

Al.
---------------------------------------
*[Michal]()* on 2011-11-07 02:00:49  
If you like short scripts, use this modified function working same as one in PHP:
```
function str_replace (f, r, s) {f=[].concat(f), r=[].concat(r); for(var i in f){s=s.split(f[i]).join(r[r[i]!=undefined?i:0]);} return s;}
```
Note: it is evident f is search, r is replace and s is subject.
Enjoy!
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-05 11:15:47  
@Michal: Thanks--If you have any way to shorten the existing function, without losing support for all the existing arguments and functionality, let us know. 
---------------------------------------
*[zany]()* on 2012-08-30 13:07:44  
Thanks man you have solved my problem. :)
---------------------------------------
