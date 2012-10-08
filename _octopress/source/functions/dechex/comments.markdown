*[Enrique González](http://www.maciaspajas.com)* on 2008-10-03 14:10:15  
The same code could be used for decoct and decbin functions:

```
function decoct(number){
  return number.toString(8);
  }
  
function decbin(number){
  return number.toString(2);
  }
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-03 15:20:20  
@ Enrique GonzÃ¡lez: Yes it could! Added!
---------------------------------------
*[Philippe Baumann]()* on 2008-10-03 23:15:32  
This also applies the other way round:

```
function octdec(oct_string)
{
	oct_string = (oct_string+'').replace(/[^0-7]/gi, '');
	return parseInt(oct_string, 8);
}

function bindec(binary_string)
{
	binary_string = (binary_string+'').replace(/[^01]/gi, '');
	return parseInt(binary_string, 2);
}
```

Note that the PHP manual pages for octdec() and bindec() do not mention the filtering, however it does actually take place:

```
&lt;?php
echo octdec('a180'); // 'a180' -&gt; '10' -&gt; 8
echo &quot;&lt;br /&gt;&quot;;
echo bindec('c120'); // 'c120' -&gt; '10' -&gt; 2
?&gt;
```
---------------------------------------
*[Onno Marsman]()* on 2008-10-04 11:59:16  
dechex('16') does not work correctly. A fix:

```
function dechex(number) {    
    return parseInt(number).toString(16);
}
```
---------------------------------------
*[Philippe Baumann]()* on 2008-10-04 16:39:32  
Well, the specificain is
```
string dechex ( int number)
```
so it really expects an integer and only returns a string.
---------------------------------------
*[Philippe Baumann]()* on 2008-10-04 16:48:04  
Nevermind. It seems you were right and the PHP functions also accept string-type arguments. However the manual doesn't state it anywhere, so I assume it's not specially encouraged.

Also, I mistyped 'specification' in my previous comment (shame on me).
---------------------------------------
*[Philippe Baumann]()* on 2008-10-04 17:06:23  
And while we're already at it:
```
function base_convert(number, frombase, tobase)
{
	return parseInt(number, frombase).toString(tobase);
}
```
---------------------------------------
*[Onno Marsman]()* on 2008-10-05 10:05:56  
It is well known that PHP is a weakly typed language. Of course this is not mentioned at every functions page in the documentation.
And because javascript is also weakly typed I think it would be obvious to make this library also weakly typed. And with that I mean: as close to the behavior of PHP as possible, which, of course, is the main goal of this library.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 11:56:06  
@ Philippe Baumann &amp; Onno Marsman: Excellent work gentlemen. As far as the loosely typed discussion, I would have to side with Onno there.
PS, we almost have the entire unported list of the math section covered!
---------------------------------------
*[pilus]()* on 2009-06-10 20:59:18  
what about this one here : 

dechex(-1415723993) 

it returns "-54623bd9", but when tried in php and in MSWIN calc, returns AB9DC427 and FFFFFFFFAB9DC427 consecutively. anybody know what's wrong ? cause i don't ... >.<
---------------------------------------
*[pilus]()* on 2009-06-10 21:07:59  
hohoho .... using information from this link : http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript, i managed to modify the function to satisfy my needs, I'm currently porting a AES-PHP algorithm to JS, and I've been pondering my code, because there's some infinite loop there somewhere, it's because the dechex-js returned a negative hex for a negative input, whereas PHP version does not.

So, here you, hopefully it could be usefull for anyone else ... :P

```
function dechex(number) {
	if (number < 0)	{
	   return (0xFFFFFFFF+number+1).toString(16);
	}
    return parseInt(number).toString(16);
}
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-10 23:09:43  
Great, thanks, Pilus! I've fixed it in SVN and credited you for it. The only difference was I kept the 2nd argument in parseInt even though its redundant, since jslint complains about it...
---------------------------------------
*[pilus]()* on 2009-06-11 13:19:08  
actually i would like people at stackoverflow to be credited, but when i want to make a comment there, they required me to register ... and I don't want to register .... 

just so people still credit the original link, here they are : 

http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript

@Brett : thx for the credit ... :D, but the other numeric conversion function should do the same, I think, I've tried the decbin in php, it returns non negative number, but I have not tried the one in php.js ... :D
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-18 06:44:19  
Ok, I made the credit fix, but I'll hold off on the other functions for now (unless you want to indicate which ones need it, etc.)
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-05 04:01:21  
@pilus: I finally got around to updating the other related functions--to my knowledge it seems only the dec* functions needed changing, as these were the ones relying on toString() with a numeric argument (and which could have negative values (i.e., unlike bin2hex))...
---------------------------------------
*[Lokde]()* on 2009-08-11 16:30:05  
rediffmail javascript:;; error
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-16 15:20:54  
@ Lokde: Come again?
---------------------------------------
