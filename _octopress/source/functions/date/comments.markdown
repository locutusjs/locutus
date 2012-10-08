*[Adam]()* on 2008-02-12 03:06:56  
I have been trying to use this date function in a project of mine using JScript, and have encountered a few difficulties.

The first problem I encountered was that when using either F or M for a month, The function will show the month in advance. m still shows the correct numerical value however. The reason this happens is that the array created with the constants for the months is zero-based. Adding an empty sting before &quot;January&quot; fixes this.
```    var txt_months =  [&quot;&quot;,&quot;January&quot;, &quot;February&quot;, &quot;March&quot;, &quot;April&quot;,
        &quot;May&quot;, &quot;June&quot;, &quot;July&quot;, &quot;August&quot;, &quot;September&quot;, &quot;October&quot;, &quot;November&quot;,
        &quot;December&quot;];```

Next problem was that P was giving me an error ```Error: Object doesn't support this property or method (code: -2146827850)
       File: php.date.js. Line: 197.
```
Line 197 is &quot;var O = jsdate.O();&quot; within the function for P. First, jsdate.O() should be f.O(). Then comes the problem that the function O does not output the correct output. I have re-written the function for O so it produces the correct output:
```O: function(){
   var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
   if (jsdate.getTimezoneOffset() &gt; 0) t = &quot;-&quot; + t; else t = &quot;+&quot; + t;
   return t;
}```

Finally, the function U is missing the return keyword.


Cheers,
Adam
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-12 08:14:13  
@ Adam: Thanks a lot for not only pointing this out, but also for taking the extra effort to provide the fixes. Appreciated!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-12 21:52:34  
@ Adam (MeEtc): I've updated the credits!
---------------------------------------
*[Michael White]()* on 2008-03-02 04:14:53  
The example results are incorrect for this function ( I double checked it by running it in PHP itself).

The new examples are:

```
		// *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
		// *     returns 1: '03:09:40 m is month'
		// *     example 2: date('F j, Y, g:i a', 1062462400);
		// *     returns 2: 'September 1, 2003, 8:26 pm'
```

http://crestidg.com
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 11:53:23  
@ Michael White: Tried to reproduce the behavior, but wasn't able to:
http://kevin.vanzonneveld.net/test.php
---------------------------------------
*[Michael White]()* on 2008-03-02 18:16:10  
VERY strange.... I bet it has something to do with the PHP version installed on different servers. I have tested on my local server as well as on a shared host (both are PHP5).

The one hosted on the shared host is here:

http://sprinkit.net/aether/test.php

```
&lt;?php

echo &quot;date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400)&quot;;
echo &quot;&lt;br /&gt;&quot;;
echo date('H:m:s \m \i\s \m\o\n\t\h', 1062402400);#09:09:40 m is month
echo &quot;&lt;br /&gt;&quot;;


echo &quot;mktime( 14, 10, 2, 2, 1, 2008 )&quot;;
echo &quot;&lt;br /&gt;&quot;;
echo mktime( 14, 10, 2, 2, 1, 2008 );


?&gt;
```

That is the exact code I used to duplicate your test.php page. I assume it is identical as far as process.

Anyway - I noticed these on the php.js test page because they turned red when I ran them. The whole page fails to run in IE 7, IE 6, and Safari 3; it just hangs. It runs in Opera 9 and FF2 (win &amp; mac) and in all three browser where it works I get red box with the output matching that of my PHP test page. When I ran my own tests while creating the namespaced version I found that IE 7, IE 6, and Safari 3 also produce the same output (matching my PHP test page).
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 19:22:59  
Here's mine:
```
&lt;?php
echo &quot;date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400)&quot;.&quot;&lt;br /&gt;&quot;;
echo date('H:m:s \m \i\s \m\o\n\t\h', 1062402400).&quot;&lt;br /&gt;&quot;;

echo &quot;mktime( 14, 10, 2, 2, 1, 2008 )&quot;.&quot;&lt;br /&gt;&quot;;
echo mktime( 14, 10, 2, 2, 1, 2008 ).&quot;&lt;br /&gt;&quot;;
?&gt;
```

This boggles me, could it have anything to do with timezones &amp; locales?
---------------------------------------
*[Michael White]()* on 2008-03-03 15:09:23  
I believe it just might... but it shouldn't... should it?

My Time Zone is GMT -5 (Eastern Standard Time) I live in Atlanta, Georgia (United States of course). What's your timezone? I noticed it was quite a bit different from mine because I posted a comment around 8 PM on March 2nd and it posted as March 3rd.

Ah! Actually, I have an idea. When I get a chance I am going to calculate the difference between your timezone and mine in seconds since the epoch. Then we can check that difference against the difference we get out of this function to make sure it is just a timezone difference and not a bug.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-03 17:07:39  
Michael White: I'm Amsterdam GMT +1 CET. 
So that seems to be the 6 hours difference we're experiencing! I had never realized that this would have impact on UNIX epoch. Apparently it does :(
---------------------------------------
*[Michael White]()* on 2008-03-04 01:04:17  
Now to figure out how to write a test scenario that isn't affected by differences from the GMT.... If it even makes sense to do so, which it may not since the functions that rely on the UNIX epoch seem to work correctly other than the actual time difference between locales. It seems to me as if the UNIX epoch ignores timezones itself so that it calculates the correct date/time anywhere around the world at an exact moment in time rather than a relative moment in time (relative to a timezone). I hope I am making sense here.
---------------------------------------
*[Brad Touesnard]()* on 2008-03-04 19:58:12  
There's a bug in the f.M() function.  It should be t = f.F(); instead of t = f.n();

Great project, keep it up!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-04 23:23:16  
@ Michael White: epoch is seconds since januari 1st  1970 00:00. I think for you, that moment (epoch) happened that's 6 hours later than for me. Time is relative so epoch is too. I hope I make sense as well ;)

@ Brad Touesnard: Thanks alot I will process your fix tomorrow!
---------------------------------------
*[Michael White]()* on 2008-03-05 02:26:05  
I'm not sure about that (but I could be wrong). The reason is because if the epoch was relative to time zones then the seconds since that time would not be affected by the time zones. Example: If epoch 0000000 were based on time zones then 50000 seconds after that would have the same exact date and time output no matter what time zone you were in. However, if the epoch is a single point in time across the entire world regardless of time zone then 50000 seconds after the epoch for your time zone would then be 6 hours different (date/time wise) than 50000 seconds after the epoch in my time zone. I think that's logically correct but this topic is bending my brain a little bit. Maybe I should just Google it. :)
---------------------------------------
*[Michael White]()* on 2008-03-05 02:33:18  
Haha! Yay for Google and Wikipedia: http://en.wikipedia.org/wiki/Unix_time


In the first paragraph on that page it says that the epoch is &quot;the number of seconds elapsed since midnight Coordinated Universal Time(UTC) of January 1, 1970, not counting leap seconds&quot; which means that the epoch is in fact a single, non-relative point in time rather than a point in time relative to the time zones (since UTC time is always UTC time even if you are in Australia). I think the definition is a hundred percent more clear than my jumbled explanation of it! haha
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-05 17:29:05  
@ Michael White: Google FTW indeed :) Still curious why we're experiencing the difference then though.
---------------------------------------
*[Michael White]()* on 2008-03-05 17:56:58  
According the epoch definition it makes complete sense that our time zones would affect the output of what appears to be the same date. Explanation below.


For our purposes: UTC = GMT &amp;&amp; GMT = UTC // They never differ by more than 0.9 seconds


If the epoch was set in UTC time then UTC +1 = CET (your time zone). That means that 00000 seconds in UTC time is equal to 03600 seconds in CET time.


That also means that 00000 seconds in UTC time is equal to -18000 seconds in EST (my time zone).


The final result is that any given point in UNIX epoch time is exactly 21600 seconds different between our time zones (6 hours) which will yield a different date for the same epoch second depending on your time zone.


Layman's terms: UNIX epoch uses UTC zone as &quot;home&quot;. If you &quot;travel&quot; outside that zone then you have to take that difference into account. When it was midnight January 1st, 1970 in the UTC zone it was still December 31st here in my time zone. Therefore the &quot;0&quot; second of the UNIX epoch will represent the date Dec. 31, 1969 for EST and will read correctly for you since it was already Jan. 1st 1970 in CET when the unix epoch was set.


I think that out of those explanations you should find one that makes sense to you.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-05 23:24:12  
Yeah it does. That's actually what I meant before but the UTC being a 'Universal Time' got me all confused again ;) Time problems tend to do that to me :)
---------------------------------------
*[Michael White]()* on 2008-03-06 07:52:05  
Haha, that's ok. I can't pretend that it isn't confusing. I guessed correctly the first time way back at the beginning of this saga but it took me a little while and a bit of research into the subject before I really was able to wrap my head around it. :)
---------------------------------------
*[Tim Wiel]()* on 2008-04-11 03:49:41  
Calling ```$PHP_JS.date(); ``` doesn't return todays date in Mozilla Firefox 2.0.13 on Ubuntu Linux

To fix it I changed the line reading 

```jsdate = new Date(timestamp ? timestamp * 1000 : null);```

to read 

```jsdate=((timestamp) ? new Date(timestamp*1000) : new Date())```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-11 12:08:18  
@ Tim Wiel: Thanks alot for sharing your improvement Tim!
---------------------------------------
*[Bob]()* on 2008-05-21 23:11:44  
Very interesting project. I came across your date function while looking for an easy way to detect a user's local timezone abbreviation. But your timezone options don't appear to work yet. Is that a known issue? Any other suggestions?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-22 08:00:21  
@ Bob: Thanks. Maybe you could use js' native getTimezoneOffset()/60 ?
---------------------------------------
*[Bryan Elliott]()* on 2009-01-06 16:30:46  
Implementation of I:
```
I: function(){
	var 
		DST = (new Date(jsdate.getFullYear(),6,1,0,0,0)),
		DST = DST.getHours()-DST.getUTCHours(),
		ref = jsdate.getHours()-jsdate.getUTCHours();
	return ref!=DST?1:0;
},

```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-06 17:24:41  
@ Bryan Elliott: Thanks a lot Bryan!
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-07 02:16:07  
Two small additions:

```
           u: function(){
                return pad(jsdate.getMilliseconds()*1000, 6);
            },
```
```
            Z: function(){
               var t = -jsdate.getTimezoneOffset()*60;
               return t;
            },
```

Note also that your chart should change the description of 'u' from &quot;milliseconds&quot; to &quot;microseconds&quot; per the current PHP documentation for date().
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-07 02:34:47  
Here's one more...

Thanks for the idea to check the source code. It gave this one away...

            ```r: function(){
                return f.D()+', '+f.d()+' '+f.M()+' '+f.Y()+' '+f.H()+':'+f.i()+':'+f.s()+' '+f.O();
            },```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-07 03:49:49  
Here's 'o' with some tests confirming it works (I tested the others too) 
```alert(date('Y W o', Date.UTC(2008,11,28)/1000)) // normal 
alert(date('Y W o', Date.UTC(2008,11,29)/1000)) 
alert(date('Y W o', Date.UTC(2011,0, 3)/1000))
alert(date('Y W o', Date.UTC(2010,0, 3)/1000))
alert(date('Y W o', Date.UTC(2010,0, 4)/1000)) // normal
```

```o: function(){
                if (f.n() === 12 &amp;&amp; f.W() === 1) {
                    return jsdate.getFullYear()+1;
                }
                if (f.n() === 1 &amp;&amp; f.W() &gt;= 52) {
                    return jsdate.getFullYear()-1;
                }
                return jsdate.getFullYear();
            },```

Now, it looks like we only have the timezone identifiers, 'e' and 'T' left to do.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-07 05:49:57  
Despite my comment just now about not porting list(), if you can make a small exception for working around the desire to copy PHP behavior perfectly, the following will work if the last argument is the array to be assigned to list() instead of as an assignment (list is a language construct and not a function anyways):

```
// Only works in global context
list('drink', 'color', 'power', ['coffee', 'brown', 'caffeine']);
function list () {
    var arr = arguments[arguments.length-1]
    for (var i=0; i &lt; arr.length; i++) {
        this[arguments[i]] = arr[i];
    }
}
alert(drink +' is '+color+' and '+power +' makes it special.\n'); // Example from PHP manual
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-07 05:50:57  
Sorry, meant to post my last comment over at PHP JS Namespaced instead...
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-07 14:17:21  
@ Brett Zamir: Excellent Work Brett, amazing that we have the date function almost complete! Thx
---------------------------------------
*[David Randall]()* on 2009-01-10 05:28:40  
Rather than strictly adhering to the PHP version for the 2nd argument, I suggest checking for the Javascript Date() object. Consider the following:

```
date('Y m d'); // 2009 01 09
date('Y m d', time()); // 2009 01 09
date('Y m d', new Date()); // 40996 08 16
date('Y m d', (new Date()).getTime()/1000); // 2009 01 09
(new Date()).getTime()/1000; // 1231560959.38
time(); // 1231560959
```

The third line doesnâ€™t produce the correct value because date() is expecting an integer as the 2nd argument. To make this easier for Javascript dates, I suggest changing the following

```
var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
```

to 

```
var a, jsdate=(
        (typeof(timestamp) == 'undefined') ? new Date() : // Not provided
        (typeof(timestamp) == 'number') ? new Date(timestamp*1000) : // UNIX timestamp
        new Date(timestamp) // Javascript Date()
    );
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-13 00:04:36  
@ David Randall: I had no issues running your 3rd example in our testsuite. Maybe it's browser-specific? I've added your code anyway, because it doesn't hurt any other testcase, and I agree that your 3rd example should work. Thanks for contributing!
---------------------------------------
*[Paul]()* on 2009-07-21 22:33:32  
I try this function and it doesn't work like the php's function, at least in my test.
```
date('d/m/Y', 1247788516)
```
it return: NaN/NaN/NaN

and php's function return: 16/07/2009

Regards
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-24 12:26:05  
@ Paul: I wasn't able to reproduce that. Are you using the latest version? Which browser/interpreter are you testing this in?
---------------------------------------
*[majak]()* on 2009-08-12 10:17:03  
This line:
```
$P.date('W', $P.strtotime('2005-01-01'));
```
returns 0 instead of 53.
(Verified in PHP. Problem is in function date, not strtotime.)
I used the latest minified and namespaced version.
---------------------------------------
*[majak]()* on 2009-08-12 14:40:46  
I found another bug. Format character 'N' doesn't work according to the specification.
It is easy to fix. Just replace "return f.w() + 1;" on line 92 
with "return f.w() ? f.w() : 7;" or something in that manner.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-16 16:01:35  
@ majak: Great stuff! Thanks so much. I've fixed it in SVN
---------------------------------------
*[Alex]()* on 2009-09-18 02:55:30  
Having the same issue as Paul

```
date('Y-m-d',data.ts)
```

is returning NaN-NaN-NaN
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-09-18 05:45:54  
@Alex: As Kevin asked Paul, are you using the latest version? What browser? Have you tried placing alerts within the date() function to see at least where things go wrong?
---------------------------------------
*[Alex]()* on 2009-09-18 05:47:09  
I altered the code from the above code (marked as version 909.322 (had the same issue in code marked 2.91)) by deleting lines 37-41 and inserting at line 37:

```
var jsdate = new Date();
jsdate.setTime(timestamp * 1000);
```
---------------------------------------
*[Alex]()* on 2009-09-18 05:53:37  
I should mention that I first encountered this issue in Chrome 3, and tested my fix in Chrome 3, FF 3.5, IE8, Safari 3.2.2, and Opera 9.64 all on Windows XP.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-09-18 08:37:33  
@Alex: Thanks. Now, what data did you have in "data.ts" and what type (Number, Date object?). And though I don't think it would matter in this case, are you using a Unix timestamp as in seconds (as in PHP), or a JavaScript value in milliseconds?
---------------------------------------
*[Alex]()* on 2009-09-18 20:09:23  
@Brett It was a standard unix timestamp in seconds. (meant to indicate that in my inital post). It appears that the original source code handled a conversion (line 39 in v909.322).

I imagine that was written this way in the first place to handle PHP defaulting to mktime() if the 2nd argument isn't set, but I don't see anywhere where that actually happens, thus if the typeof(timestamp) fails there is no value when the JS Date() methods are called.
---------------------------------------
*[Alex]()* on 2009-09-18 20:26:43  
@Brett Don't think it would matter, but my timestamp comes from JSON obtained by jQuery.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-09-19 04:31:44  
@Alex: The issue should be fixed now. Our date functions were only accepting "undefined" (or missing) timestamps, numeric timestamps, or JavaScript Date() object timestamps. If they were expressed as a string or other non-object types, there was no attempt to auto-convert them (as PHP does). It seems therefore that your JSON was returning timestamps as strings and not numbers, thus causing a mismatch. However, the latest version in git can handle the strings now too: http://github.com/kvz/phpjs/commits/master/functions/datetime/date.js/8a428dccc64253a59b84b692fbfe323f5e9d29c9 . FYI, you might want to check out https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Operators/Special_Operators#conditional_operator to understand what the code at the beginning of the function is doing when assigning timestamp to a Date object, if you were not clear. Have fun!
---------------------------------------
*[Theriault]()* on 2009-10-25 14:26:29  
'B' could be simplified to:

```
return pad(Math.floor(((t.getUTCHours() * 36e2) + (t.getUTCMinutes() * 60) + t.getUTCSeconds() + 36e2) / 86.4) % 1e3, 3);
```
---------------------------------------
*[Theriault]()* on 2009-10-25 14:34:13  
't' could be shortened to:

return (new Date((f.n() + 1) + '/0/' + f.Y())).getDate();
---------------------------------------
*[Theriault]()* on 2009-10-30 19:02:27  
I found a bug with 'W'. For 2010, week 52 runs from 12/27/2010 to 12/31/2010 (only 5 days), then 1/1/2011 is week 53, then 1/2/2011 to 1/3/2011 are the last two days of week 52. Then week 1 is 1/4/2011 to 1/9/2011 (only 6 days). It seems to happen on other dates, too, with some weeks having only 6 days and some having 8 days.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-11-07 18:13:35  
Hey Theriault, thanks for your improvements. I've just added them to the repo.
http://github.com/kvz/phpjs/commit/0a830484289ece0cebdbf6d2fafe849b9308284b

As for the W: issue, I've added a testcase (#8) that confirms we stray from PHP's behavior there () (but it seems PHP in turn strays from my System's calendar ; ), this will require a quiet sunday afternoon of tesing & fixing though..
If anyone is up for a challenge, that would rock! :D
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-07 18:20:47  
Does anyone know whether the technique of setting a date to '0' to get the last day of the month (as used in Theriault's 't' implementation) part of the ECMAScript spec or is it just a browser convention?
---------------------------------------
*[Theriault]()* on 2009-11-08 04:17:48  
@Brett: I was unsure, but after reviewing ECMA-262, it is a part of the ECMA standards. The standards state that date arguments are to be treated as finite integers and they all support values outside the ranges (such as 13, 1000, or even -500 for the month). The date argument formula is:

Day(Result(7)) + Result(4) − 1.

Day(Result(7)) returns the computed days since Jan 1, 1970 for the current time's year and month, Result(7), plus Result(4) which is the integer date argument, so 0 would add no days to the first of the calculated month and year, then it subtracts one day to account for the first day of the month which was included in the calculation of Result(7), so that would be the previous month's last day.

I would have to say that the algorithm's that ECMA has laid out for date handling are the best I've seen out there; very flexible. To think that Date.setDate(Date.getDate() - 7) subtracts one week exactly, or Date.setMonth(Date.getMonth() - 6) can subtract half a year is fantastic, no matter the date.

However, the way I did it is incorrect. A string argument being passed to the Date constructor may be handled differently by all browsers. 't' should be changed to use 3 integers in the constructor instead:
```
return (new Date(f.Y(), f.n() + 1, 0).getDate();
```

I believe I have found the solution to 'W', also. The following should work after reviewing ISO-8601 algorithms for calculating the week. I have confirmed it works from Jan 1 1900 to Dec 32 2100, which is likely enough testing:
```
return 1 + Math.round(((c = new Date(d.Y(), d.n() - 1, d.j() - d.N() + 3)) - (new Date(c.getFullYear(), 0, 4))) / 864e5 / 7);
```
---------------------------------------
*[Theriault]()* on 2009-11-08 05:10:04  
The return function at the bottom could be shortened to one line using a ternary operator:
```
return format.replace(/\\?([a-z])/gi, function (t, s) {return f[t] ? f[t]() : s;});
```

"I" could not rely on the _dst function up top and be shortened to one line:
```
return 0 + (t.getTimezoneOffset() < Math.max((new Date(d.Y(), 0, 1)).getTimezoneOffset(), (new Date(d.Y(), 6, 1)).getTimezoneOffset()));
```

And a bunch of little nitpicky fixes that I can suggest:

txt_weekdays at the top could remove the repeat of 'day' 7 times and just add 'day' to the 'l' (lowercase-L) function:
```
var txt_weekdays = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];

return txt_weekdays[f.w()] + 'day';
```

'N' could be like 'g' and use the OR operator to make it a little shorter:
```
return f.w() || 7;
```

'S' could also use the OR operator to make it a bit shorter:
return txt_ordin[f.j()] || 'th';

'o' (lowercase O) could be shortened to one line:
return f.Y() + (f.n() == 12 && f.W() < 9 ? -1 : (f.n() == 1 && f.W() > 9 ? 1 : 0));

'M' could be one line:
```
return f.F().slice(0, 3);
```

'D' could be one line:
```
return f.l().slice(0, 3);
```

Thanks. Keep up the good work PHP.JS.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-11-08 16:42:37  
Hey there Theriault!

Blown away by your expertise & quality of code. Let me try to reach you by mail and see if you'd like to append the code  another way ; )

If you haven't received my mail drop another line here, ok?
---------------------------------------
*[Felix Blaschke]()* on 2009-11-12 15:09:48  
The "W" function is wrong. For example for the 2nd january 2005 it returns the wrong weak number. I correct it myself with another algorithm:

```
        // Week
            W: function () {
            	var x = (new Date(jsdate.getFullYear(), 0, 4))
            	var a = new Date(jsdate.getFullYear(), 0, 4-(x.getDay()==0 ? 7:x.getDay()-1))
        		for (var w=0; w <= 53; w++) {
            		var b = new Date(a.getFullYear(), a.getMonth(), a.getDate()+(w-1)*7, 0,0,0,0)
            		var c = new Date(a.getFullYear(), a.getMonth(), a.getDate()+w*7, 0,0,0,0)
            		if (jsdate >= b && jsdate < c) {break;}
            	}
            	if (w >= 1 && w <= 52) {return w;}
            	if (w >= 52 && w != ((new Date(jsdate.getFullYear(),0,1)).getDay() == 4 ? 53 : 52)) {return 1;}
            	return ((new Date(jsdate.getFullYear(),0,1)).getDay() == 4 ? 53 : 52);
            },
```
---------------------------------------
*[Felix Blaschke]()* on 2009-11-12 15:12:18  
Sorry for repost: I mean 2nd january 2006 returns wrong week number.
```
php.date("W", new Date(2006,0,2)) // correct result would be "1"
```
---------------------------------------
*[Thomas Beaucourt](http://www.webapp.fr/)* on 2009-11-26 13:16:25  
The "z" function is buggy.
It doesn't account for daylight saving time when doing :
```
(jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5
```

thus it returned 2 days more for '2009-10-25' than for '2009-10-24'.

My fixed function is :
```
            z: function (){
				var m = f.n();
				var z = 0;
				for (i=1; i<m; i++) z+= f.t(i);
				return z + f.j();
            }
```

Which uses an improved t function accepting a parameter :
```
            t: function (n) {
                if (n == undefined) n = jsdate.getMonth() + 1;
                if ( n == 2 ) return 28 + f.L();
                if ( n & 1 && n < 8 || !(n & 1) && n > 7 ) return 31;
                return 30;
            }
```


Thanks for the good work !
---------------------------------------
*[Theriault]()* on 2009-11-30 09:13:53  
@Felix: The 'W' function has been updated with a new algorithm. Thank you for your contribution.

@Thomas: I cannot seem to reproduce the bug you are experiencing. What is your system's current timezone offset and what browser are you using? Also, does the following code also fix the problem:
```
z: function () {
    return Math.round((new Date(f.Y(), f.n() - 1, f.j()) - new Date(f.Y(), 0, 1)) / 864e5);
},
```
---------------------------------------
*[JT]()* on 2009-12-01 09:00:14  
Great work on an incredibly useful function, guys.

Seems like repeatedly declaring the regEx and all of those inner functions every time the date function is called would be pretty inefficient, though. Have you considered doing something like this?

```
var date = (function () {

    function pad(n, c) {
        ...
    }

    var that      = this,
        formatChr = /\\?([a-z])/gi,
        txt_words = [ ... ],
        txt_ordin = { ... },
        f = {
            w : function (d) {
                return d.getDay();
            },
            ...
        };

    return function (format, timestamp) {
        // Just for clarity :$
        if (timestamp) {
            jsdate = (timestamp instanceof Date) ? new Date(timestamp) : new Date(timestamp * 1000);
        } else {
            jsdate = new Date();
        }

        return format.replace(formatChr, function (t, s) {
            return f[t] ? f[t](jsdate) : s;
        });
    };
}());
```

JT
---------------------------------------
*[JT]()* on 2009-12-01 09:05:15  
Might help if I had declared jsdate as a var in my post below, I suppose  =)

JT
---------------------------------------
*[Thomas Beaucourt](http://www.webapp.fr/)* on 2009-12-19 01:22:33  
@Theriault :
Current timezone is Paris GMT+1 (winter / DST off)
Your variant works, provided you throw in a +1 :
```
z: function (){
    return Math.round((new Date(f.Y(), f.n() - 1, f.j()) - new Date(f.Y(), 0, 1)) / 864e5) + 1;
}
```
---------------------------------------
*[Rafal Kukawski](http://blog.kukawski.pl)* on 2010-04-23 08:16:47  
My proposition for checking for leap years would be

```
L: function(){
   return new Date(jsdate.getFullYear(), 1, 29).getMonth()==1|0;
}
```

It uses the JS engine to calculate the correct month for February 29 for given year.
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-04-23 08:42:54  
IMO in U() we should do Math.floor instead of Math.round, cause we shouldn't add 1 sec to the result when the millisecond part is just over 500. If you agree, my proposition is

```U: function () { // Seconds since UNIX epoch
   return Math.floor(jsdate.getTime() / 1000);
}```
or even
```U: function () { // Seconds since UNIX epoch
   return jsdate.getTime() / 1000 | 0;
}
U: function () { // Seconds since UNIX epoch
   return jsdate / 1e3 | 0;
}```
if you accept less self-explaining code.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-04-23 11:19:56  
@ Rafał Kukawski: I think I agree. As long as it's 10:00:00 (.9), it still is 10:00:00 and not 10:00:01 implemented your fix, thanks a lot! http://github.com/kvz/phpjs/commit/c3cd2f82d214c4b11edac89d14162fcad3a5675e
---------------------------------------
*[clinisbut]()* on 2010-08-02 18:52:47  
Hi, I'm having an issue with date function. 
Starting from a timestamp, I'm adding seven days and converting to string using date() function. Rarely, when I add seven days to 2010-10-31 it gives me 2010-11-6 instead of 2010-11-7.
This is my code
```
$P = new PHP_JS();
timestamp = $P.mktime( 0, 0, 0,month, day, year );

temp = timestamp + (60*60*24*7);

string_date = $P.date('d-m-Y', temp));
```

Other dates work fine... is this a bug?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-09-08 17:18:28  
@clinisbut: Tested it, but our output exactly matches PHP's.

Here, this snippet runs both in PHP as in the unnamespaced php.js version:

$timestamp = mktime(0, 0, 0, 10, 31, 2010);
$temp = $timestamp + (60*60*24*7);
$string_date = date('d-m-Y', $temp);
print($string_date);
---------------------------------------
*[clinisbut]()* on 2010-09-19 00:26:24  
@Kevin: Thanks, I found the problem: It relates with daylight saving time. So that was my fault. sorry.
---------------------------------------
*[Nox]()* on 2010-11-30 14:29:22  
Hi, just send you an email with a few changes I recommend.

The first one was already made by @JT:
```
var date = (function() { ... return function(date, timestamp)
```

The second one is just a way to honor JS...
```
Date.prototype.format = function (format) {return date(format, this); };
```

And last but not least I changed to access to the day-strings and month-strings to make it more customizable.
```
        /*...*/
        F: function () { // Full month name; January...December
            return date.i18n.months[12 + f.n()];
        }
        /*...*/

date.lang = { eng: {
		days: [ /* days start with 0 */ ],
		months: [null, /* months start with 1 */],
		ordin: { /* ... */ }
	}
};
date.i18n = date.lang.eng; // select english
```

Hope this is useful. If anyone needs my code send me an email.

Thanks for the code, I'm using it serverside on node.js like I was using PHP-date before,
Nox
---------------------------------------
*[Nox]()* on 2010-11-30 14:33:53  
... Actually I just can't figure out where I should send the modified version... If you like to get it, just send me an email...
Thanks again
Nox
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-12-02 08:14:24  
@Nox: Thanks for the submissions. As far as JT's change, I don't have time right now to review; anyone else? As far as Date.prototype, we don't like to pollute the native prototype objects, though I know it can be convenient. As far as internationalization, as per PHP's recommendation (since date() is not localized), we use strftime & setlocale for localization of dates instead (as it provides a clear "PHP way" for us to implement it following the same API and behavior).
---------------------------------------
*[saturn ]()* on 2011-01-10 09:44:22  
In line 147 the code not right.
date('o-W',1293840000);
 the result return 2012-52 , php function will return 2010-52.
maybe the code can change to 
return Y + (n === 12 && W < 9 ? -1 : n === 1 && W > 9? -1 : 0);
thanks
---------------------------------------
*[saturn ]()* on 2011-01-10 09:54:46  
if the W value less than 9 the value eq X(9>=x>0) can not display 0X(PHP can do);
---------------------------------------
*[Matthew Ralston](www.mralston.com)* on 2011-02-27 14:15:34  
Looks like there's a bug in date() when using Firefox. It's certainly present on version 4.0b7 on Mac OS X, not sure about other versions.

```
<script type="text/javascript" src="php.full.min.js"></script>
<script type="text/javascript">

window.onload=function() {
	var myDate='1970-01-01 00:00:00';
	var myTimestamp=strtotime(myDate);
	var myFormattedDate=date('d/m/Y H:i:s', myTimestamp);
	
	alert('myDate: ' + myDate + '\n' + 'myTimestamp: ' + myTimestamp + '\n' + 'myFormattedDate: ' + myFormattedDate);
}

</script>
```

After applying date(), it incorrectly reports that the hour is 01, instead of 00.

Doesn't seem to be an issue in Safari.
---------------------------------------
*[Martin]()* on 2011-03-21 14:41:41  
Be aware that this implementation will emit non-zero-padded numbers when using "W" whereas php's native implementation does pad the lower numbers.

---------------------------------------
*[Matteo]()* on 2011-04-05 17:30:50  
I think I found a problem with this function:

```
date('d-m-Y', strtotime("2012-02-04 +6 WEEK"));
```

returns 17-05-2011 insted of 17-03-2012 as it should. Or am I doing something wrong?
---------------------------------------
*[Alex Wilson]()* on 2011-04-07 16:57:02  
A shorter implementation:

https://gist.github.com/raw/899179/40ef949f244fdbf4103804b870c515e134b611ec/php.date.js
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-04-08 17:37:29  
@Alex Wilson: Thanks very much for the implementation, but by relying on "new Function", it runs a bit more slowly, as well as has some eval-ish concerns. 
---------------------------------------
*[Theriault]()* on 2011-04-11 04:48:37  
@Martin: Thanks. Fixed.
---------------------------------------
*[]()* on 2011-05-29 01:08:37  

---------------------------------------
*[Frederik Hannibal]()* on 2011-06-22 11:10:21  
FYI: Test #5 fails in node.js 
---------------------------------------
*[]()* on 2011-07-07 05:47:52  

---------------------------------------
*[]()* on 2011-07-17 19:08:48  

---------------------------------------
*[]()* on 2011-07-18 19:14:39  

---------------------------------------
*[]()* on 2011-07-20 19:31:50  

---------------------------------------
*[omid]()* on 2011-09-18 10:04:18  
O return incorrect format
for example return +0350 instead of  +0330
code must change to
```
var a = jsdate.getTimezoneOffset();
return (a > 0 ? "-" : "+") + _pad(Math.floor(Math.abs(a) / 60) * 100 + Math.abs(a) % 60, 4);
```
---------------------------------------
*[Rafa? Kukawski]()* on 2011-09-18 16:58:17  
@omid: thanks for your bug report. The function is now fixed on Github (https://github.com/kvz/phpjs/commit/97aa7a53befc80544cd4bdc681deab041cfee779)
---------------------------------------
*[Gotibandhu]()* on 2011-09-23 15:21:24  
Hello Everyone,
We can use Date () object to manipulate dates in java script. Whenever we want to access current date of the system or want to set new date in java script then we can use appropriate java script method of date function. In this demonstration we learn how to work with function of date object.........
For more details check this link.....
http://mindstick.com/Articles/c18de1aa-fd9c-433a-80ea-93c14522c856/?Implementing%20Date%20object%20in%20Java%20Script

Thanks !!!!
---------------------------------------
*[ZERONETA]()* on 2011-09-26 16:37:57  
```
var date = function( a, s )
{
	var d = isNaN( s *= 1000 ) ? new date() : new date( s ), f = d.getTime();
	return ( '' + a ).replace( /a|A|d|D|F|g|G|h|H|i|I|j|l|L|m|M|n|s|S|t|T|U|w|y|Y|z|Z/g, function( a )
	{
		switch ( a )
		{
			case 'a' : return d.getHours() > 11 ? 'pm' : 'am';
			case 'A' : return d.getHours() > 11 ? 'PM' : 'AM';
			case 'd' : return ( '0' + d.getDate() ).slice(-2);
			case 'D' : return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ][ d.getDay() ];
			case 'F' : return [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ][ d.getMonth() ];
			case 'g' : return ( s = ( d.getHours() || 12 ) ) > 12 ? s - 12 : s;
			case 'G' : return d.getHours();
			case 'h' : return ( '0' + ( ( s = d.getHours() || 12 ) > 12 ? s - 12 : s ) ).slice(-2);
			case 'H' : return ( '0' + d.getHours() ).slice(-2);
			case 'i' : return ( '0' + d.getMinutes() ).slice(-2);
			case 'I' : return (function(){ d.setDate(1); d.setMonth(0); s = [ d.getTimezoneOffset() ]; d.setMonth(6); s[1] = d.getTimezoneOffset(); d.setTime( f ); return s[0] == s[1] ? 0 : 1; })();
			case 'j' : return d.getDate();
			case 'l' : return [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ][ d.getDay() ];
			case 'L' : return ( s = d.getFullYear() ) % 4 == 0 && ( s % 100 != 0 || s % 400 == 0 ) ? 1 : 0;
			case 'm' : return ( '0' + ( d.getMonth() + 1 ) ).slice(-2);
			case 'M' : return [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][ d.getMonth() ];
			case 'n' : return d.getMonth() + 1;
			case 's' : return ( '0' + d.getSeconds() ).slice(-2);
			case 'S' : return [ 'th', 'st', 'nd', 'rd' ][ ( s = d.getDate() ) < 4 ? s : 0 ];
			case 't' : return (function(){ d.setDate(32); s = 32 - d.getDate(); d.setTime( f ); return s; })();
			case 'T' : return 'UTC';
			case 'U' : return ( '' + f ).slice( 0, -3 );
			case 'w' : return d.getDay();
			case 'y' : return ( '' + d.getFullYear() ).slice(-2);
			case 'Y' : return d.getFullYear();
			case 'z' : return (function(){ d.setMonth(0); return d.setTime( f - d.setDate(1) ) / 86400000; })();
			default : return -d.getTimezoneOffset() * 60;
		};
	} );
};
```
---------------------------------------
*[Chris](www.devotis.nl)* on 2011-12-29 09:46:01  
The o for ISO-8601 year is wrong!

date,        W,     o,     o should be
2007-12-31, 52,  2006,  2008
2010-01-01, 52,  2011,  2009
2011-01-01, 52,  2012,  2010
2012-01-01, 52,  2013,  2011
2001-12-31,  1,  2000,  2002

Change function for 'o' to:
```
o: function () { // ISO-8601 year
  var n = f.n(), W = f.W(), Y = f.Y();
  return Y + (n === 12 && W < 9 ? +1 : n === 1 && W > 9 ? -1 : 0);
}
```
---------------------------------------
*[Dick Olsson]()* on 2012-05-07 12:57:50  
There's a bug in regards to the "c" (ISO-8601) format. I'm not sure where to submit patches, but here's the simple fix:

```
@@ -882,7 +882,7 @@

       // Full Date/Time
       c: function () { // ISO-8601 date.
-          return 'Y-m-d\\Th:i:sP'.replace(formatChr, formatChrCb);
+          return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
```
---------------------------------------
*[Andrew Ensley](http://andrewensley.com/)* on 2012-06-15 22:25:23  
Is there a way to use this function without exposing it globally? I'm trying to add it as a private function inside a closure, and for some reason, it's still exposed in the global namespace (tested in Firefox 13). I'm not enough of a javascript guru to understand why this is happening.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-16 04:10:54  
@Andrew Ensley: While most functions in php.js are stand-alone (though some interact with or set a "php_js" global if you are not using the namespaced version of phpjs), this one was optimized to avoid re-building the "f" object, etc. each time the function was run. 

"this.date = ..." is where it sets "date" as a global property since "this" is treated like "window" in browsers when the function is not called with "new". The reason we use "this.date" instead of just setting "date" alone is because we want the function to be the same if you add date() as a method of an object (like our own namespaced version does). When date() is inside of an object, the function will not redefine "date" as a global but will redefine the method. 

You can modify the function fairly easily by changing the two "this.date" references to "_date" or you could wrap date() into an object and call that object.
---------------------------------------
*[Andrew Ensley](http://andrewensley.com/)* on 2012-06-21 20:25:41  
@Brett: Thank you for that explanation! Just learned something new about javascript.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-04 16:04:30  
@Dick Olsson: I see your change has already been made in Git. Thanks!
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-05 14:58:14  
@Chris: I have applied your fix to Git. Thanks!
---------------------------------------
*[Bernard Lapera]()* on 2012-08-27 21:39:04  
I just used this function to test something in the client side.  It seems the date is off by a full day, the PHP generated date is what I was expecting.  Same with other tested dates.
Thanks for all you guys do!

JS:
```
date('Y-m-d', 1364774400) = 2013-03-31
```

PHP:
```
date('Y-m-d', 1364774400) = 2013-04-01
```
---------------------------------------
