*[Ty](http://www.thedarkproject.de)* on 2009-05-20 15:31:09  
Hi,

the function strtok() does NOT work as the PHP equivalent!!
My example:
```
String = "@@abcdef# @#tzererff#";
result = strtok(substr(stristr(String, "@@"), 2), "#");
```
==> abcdef# @#tzererff#
--------
In PHP the same command line results in:
==> abcdef

What am I doing wrong??

Cheers Ty
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-20 16:04:41  
It's working fine for me. I presume you have the equivalents already for substr and stristr? Are you using regular client-side JavaScript? Did you check your results already for substr and stristr (those are executed before it gets to strtok).  Did you check the error console? What browser?

If you downloaded the namespaced version (e.g., calling the function like $P.strtok()), then I do see there is a bug (just fixed in Subversion), but otherwise, it seems we need more info, because it's working fine to return 'abcdef' for me.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-20 16:06:46  
Also, while it shouldn't affect this situation, you probably don't want to be using "String" as a variable name (at least capitalized like that), since you are overwriting the built-in String() constructor.
---------------------------------------
*[Ty](http://www.thedarkproject.de)* on 2009-05-20 16:16:50  
Hehe... I do not use String... It is just an example. I just wanted to show what commands I use.

For your questions:
Yes I tested the other outputs. They're working as expected. Only strtok() does NOT do what it should.

Here's the original code:
```
fpSubject = fldRef[fldTitles[i]]['subject'][0];
if(stristr(fldRef[fldTitles[i]]['category'][0], "@@")) {
  fpCategory = strtok(substr(stristr(fldRef[fldTitles[i]]['category'][0], "@@"), 1), "#");
} else fpCategory = fldRef[fldTitles[i]]['category'][0];
```

fldRef[fldTitles[i]]['category'][0] contains: "Subarea=authorisation\nModule/Category=Create\nTask=ERP @@xxy_yzaaddcc# @#qeq_reerfdfe#"

As the result I get:
"xxy_yzaaddcc# @#qeq_reerfdfe#"

But it should be:
"xxy_yzaaddcc"

Only stristr gives:
"@@xxy_yzaaddcc# @#qeq_reerfdfe#"

And with substr: See above... ;-)

Any clues?

Ty
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-20 19:53:34  
My other questions:
1) Are you using regular client-side JavaScript?
2) What browser are you using?
3) Did you check the error console for your browser for any warnings?
4) Did you download the namespaced version of PHP.JS or just copy-paste the function/use the non-namespaced version?
5) How long ago did you copy the code?

As I said I tested it myself just now in Firefox 3.0.10 as follows:

```var str = "Subarea=authorisation\nModule/Category=Create\nTask=ERP @@xxy_yzaaddcc# @#qeq_reerfdfe#";
result = strtok(substr(stristr(str, "@@"), 2), "#");
alert(result); // ```

And it gives 'xxy_yzaaddcc' in Firefox. 

Or to make it simpler for our testing:

```var sub = "xxy_yzaaddcc# @#qeq_reerfdfe#";
result = strtok(sub, "#");
alert(result); // gives 'xxy_yzaaddcc' in Firefox```

---------------------------------------
*[Ty](http://www.thedarkproject.de)* on 2009-05-26 10:21:10  
Ah...

Now I can see the error... In Firefox (3.5b4 and 3.0.10) it works fine.
But in Internet Explorer 7 it does NOT work. That's bad, because I will need it mainly for IE. :(

Any suggestions?
---------------------------------------
*[Ty](http://www.thedarkproject.de)* on 2009-05-26 10:38:52  
Ok... It solved it in another way. I cannot use strtok() in IE.
But as you see below, this works.

```
var str = "Subarea=authorisation\nModule/Category=Create\nTask=ERP @@xxy_yzaaddcc# @#qeq_reerfdfe#";
result = strtok(substr(stristr(str, "@@"), 2), "#");
alert(substr(result, 0, result.indexOf("#")));
```

This results the expected string. So I changed the code of the strtok() function, as follows.

```
function strtok (str, tokens) {
	// Tokenize a string 
	//
	// version: 905.2020
	// discuss at: http://phpjs.org/functions/strtok
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// %        note 1: Use tab and newline as tokenizing characters as well
	// *     example 1: $string = "\t\t\t\nThis is\tan example\nstring\n";
	// *     example 1: $tok = strtok($string, " \n\t");
	// *     example 1: $b = '';
	// *     example 1: while($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
	// *     example 1: $b
	// *     returns 1: "Word=This\nWord=is\nWord=an\nWord=example\nWord=string\n"
	if (!this.php_js) {
		this.php_js = {};
	}
	
	if (navigator.appName == "Microsoft Internet Explorer") {
		return str.substr(0, str.indexOf(tokens));
	}
	
	if (tokens === undefined) {
		tokens = str;
		str = this.php_js.strtokleftOver;
	}
	if (str.length === 0) {
		return false;
	}
	if (tokens.indexOf(str[0]) !== -1) {
		return this.strtok(str.substr(1), tokens);
	}
	for (var i=0; i < str.length; i++) {
		if (tokens.indexOf(str[i]) !== -1) {
			break;
		}
	}
	this.php_js.strtokleftOver = str.substr(i+1);
	return str.substring(0, i);
}
```

This works very well in IE 6, 7 and 8. :)

Thanks for your help!

PS: Maybe you can integrate these change in your version? ;-)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-26 15:07:24  
Okay, I see... I only learned this recently, as I tend to live in the comfortable bubble of not needing to write for older IE browsers... :)  Your solution will not solve the problem either because that is not progressively tokenizing the string. What should solve it for IE and still work in other browsers is to change our accessing the strings by index (as though it were an array) and instead use charAt(). 

You can therefore replace your code with the code we now show for strtok. I also fixed this problem in a few other functions, though I'm afraid there could be others besides these:
sql_regcase, str_shuffle, strcspn, strlen, convert_cyr_string

Sorry I didn't pick up on it earlier. For future reference, it really helps if you can boil down the problem to just one function and the smallest example possible, and even the exact line within the function, since it is easy to do this with our mostly self-contained functions. But anyhow, thanks very much for sticking through it, and I'm very glad you found this problem for us...It will be a big help for cross-browser compatibility...
---------------------------------------
*[???? ????](http://an3m1.com/)* on 2012-04-11 15:45:25  
Write more, that’s all I have to say. Literally, it seems as though you relied on the video to make your point. You clearly know what you’re talking about, why waste your intelligence on just posting videos to your blog when you could be giving us something enlightening to read 
---------------------------------------
