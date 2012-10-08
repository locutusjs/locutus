*[Sakimori]()* on 2008-05-16 00:58:35  
In PHP, strlen(45) returns 2. With the above JS implementation, strlen(45) returns undefined (numbers have no &quot;length&quot; property).
 
You might consider changing it to:
```
return String(string).length;
```
... or maybe even:
```
return (&quot;&quot; + string).length;
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-16 16:45:47  
@ Sakimori: Cool, thank you for improving our project!
---------------------------------------
*[Kirk Strobeck](http://weareinto.com)* on 2008-09-06 01:29:38  
There is one problem, this returns NULL if empty, it should return 0, so you can test in an if statement without an error.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-08 00:20:19  
@ Kirk Strobeck: I've added some code that I think would make it better. But if you could provide the code that breaks it, that would help greatly, we can then also add it to the examples so it will be tested thoroughly.

Thank you!
---------------------------------------
*[Onno Marsman]()* on 2008-10-04 17:19:21  
The l variable doesn't seem to do much. As far as I can see this function is exactly the same as the following:

```
function strlen (string) {
    return (string+'').length;
}
```

This is already suggested by Sakimori but for some reason his code didn't make it into the function. I think it should.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 12:05:25  
@ Onno Marsman: I guess sakimori's change slipped through. He did make it into the comments.
I believe the reason for the if statement is that you want to have strlen return 0, even if it returns false. What do you think about this implementation?
---------------------------------------
*[Onno Marsman]()* on 2008-10-06 15:34:12  
This was already covered.
(string+'') is always a string so (string+'').length always is an integer and can never result into false.
So the || 0 can be removed.

There is some behavior that doesn't correspond to PHP behavior and that is when you apply strlen to an array or object. But I don't think there will be a need to check this, and Javascripts behavior can be considered to be better. (calling .toString() on an object when the concatenation occurs)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 16:21:23  
@ Onno Marsman: Very well, I will leave it at 
```
return (string+'').length;
```
then.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-15 02:15:26  
While the following may look like overkill, in order to be truly faithful to handling all Unicode characters and to this function in PHP which does not count the number of bytes but counts the number of characters, something like this is really necessary:

```
// Form a string with a form of the Han character for &quot;you&quot; surrounded by the letters A and Z
var str = 'A\ud87e\udc04Z'; // Including two &quot;surrogates&quot; which are used to form a single character in Unicode (so the count of this should be 3, not 4 as str.length will give)
// var str = 'Að¯ „Z'; // If your blogging software won't mess with the Unicode, you can try this equivalent example as well (should be 3, not 4 as str.length will give)

alert(
  strlen(str)
);

// Note that the exceptions will only be thrown if the string is poorly formed Unicode (something unlikely unless it was deliberate--e.g., try taking out one of the surrogate pairs above).
// Also note that although it will indeed be rare, especially for Western scripts, that str.length would not handle the situation correctly, in order to support handling of all languages that can be expressed in Unicode, the following is necessary.

function strlen (str) {
	function getWholeChar (str, i) {
		var code = str.charCodeAt(i);
		if (0xD800 &lt;= code &amp;&amp; code &lt;= 0xDBFF) { // High surrogate(could change last hex to 0xDB7F to treat high private surrogates as single characters)
			if (str.length &lt;= (i+1))  {
				throw 'High surrogate without following low surrogate';
			}
			var next = str.charCodeAt(i+1);
			if (0xDC00 &gt; next || next &gt; 0xDFFF) {
				throw 'High surrogate without following low surrogate';
			}
			return str[i]+str[i+1];
		}
		else if (0xDC00 &lt;= code &amp;&amp; code &lt;= 0xDFFF) { // Low surrogate
			if (i === 0) {
				throw 'Low surrogate without preceding high surrogate';
			}
			var prev = str.charCodeAt(i-1);
			if (0xD800 &gt; prev || prev &gt; 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
				throw 'Low surrogate without preceding high surrogate';
			}
			return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
		}
		return str[i];
	}
	for (var i=0, lgth=0; i &lt; str.length; i++) {
		if ((chr = getWholeChar(str, i)) === false) {continue;} // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
		lgth++;
	}
	return lgth;
}```

(By the way on an unrelated note, I see shuffle() and possibly some other array functions also need to be made to work with associative arrays (just correcting myself about only a few needing it).)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-15 02:22:19  
Oh sorry, in order to convert to string, you can add the line 

```str = str+'';```

as the very first line in strlen() (before getWholeChar()).

By the way, I do see that your blogging software does not convert the character in my 2nd example into entities, so you can try that example too.  Best, Brett
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-15 11:39:59  
@ Brett Zamir: wow. I don't usually have to deal with these things. more kuddos to you, man.
---------------------------------------
