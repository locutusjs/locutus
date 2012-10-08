*[Przemek]()* on 2008-03-31 23:07:46  
(" - double quote) also. It gives &amp;quot;. But you can fix it yourself by just moving

```
	if (useQuoteStyle != 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
 
    if (useQuoteStyle == 'ENT_QUOTES') {
        entities['39'] = '&#039;';
    }
```

at the end of the table in get_html_translation_table
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-02 13:56:16  
@ Dominique: Hi, I've added your example date and tried to reproduce it here: http://kevin.vanzonneveld.net/pj_tester.php

But the checkdate examples all give the expected output here. Is this the same for you?
---------------------------------------
*[Dominique]()* on 2008-04-03 03:43:49  
Hello Kevin,  and thank you for your answer. 
Part of my comment was mistaken, but part of it still &quot;sticks&quot;. 
In my test, I used 
```
myDate.getYear()
```
instead of 
```
myDate.getFullYear()
```
Which explains the strange value given for the year... 
But with respect to 
```
myDate.setFullYear( 2008, 03, 31);
alert(myDate.getFullYear()+ &quot; &quot; + myDate.getMonth() + &quot; &quot; +myDate.getDate());
```
giving 2008 04 01 as an answer, I persist: I definitely get that result. 
Reading the Javascript specifications it is not surprising since it states that &quot;setFullYear&quot; takes a month parameter going from 0 to 11, so it considers month 03 to be april (which has 30 days) and hence the 31st of April to be actually the 1st of May (month 04)... 
So, if the code you post is the actual checkdate code, I do not understand how it could give the right answer... I am puzzled.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-03 08:44:12  
@ Dominique: You're right it does work with ranges from 0-11. Confusingly enough, getMonth also works with ranges from 0-11, so that compensated somewhat for the behaviour. But a third bug was this:
```
return ( myDate.getMonth() != month );
```

instead of this
```
return ( myDate.getMonth() == month );
```

So that made testing unreliable. Thanks for persisting in this matter! The function is fixed now.
---------------------------------------
*[Pyerre]()* on 2008-08-14 18:04:15  
i found a bug
checkdate(1,390,2000) returns true
because setFullYear will add the 390 days to the date but the month will be the same

you can make return ((myDate.getMonth()+1) == month &amp;&amp; day&lt;32);

good trip in Amsterdam
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 18:20:45  
@ Pyerre: Thank you :) I've updated the function and also added your example in as a unit test so this can never happen again.
---------------------------------------
*[Jorge Vazquez](http://www.cheats.com.ar)* on 2009-06-22 18:38:29  
I've found an error with the code: myDate.setFullYear( year, (month - 1), day ); would only set the year, but not the month nor the day.

I passed the parameters correctly, however only the year part works. I even included leading zeroes to the months after the sustraction. Ultimately I solved it setting the date when you create the variable:

```
newmonth = (month - 1);
var myDate = new Date(year, newmonth , day);
myDate.setFullYear(year, newmonth , day);
```

I dont know why, maybe it was an error in my PC. However I tried it in many different browsers and it work in any of them.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-23 03:43:30  
@Jorge Vazquez:  When I check with the following:

```checkdate(3, 4, 2009);```

and add an alert to verify the date that has been created:

```
    var myDate = new Date();
    myDate.setFullYear( year, (month - 1), day );
alert(myDate)
```
it works correctly in Firefox, IE, Safari, Opera in showing March 4 as the date...

What test data are you using? Please show the exact code so we can identify the problem...

By the way, I added a few more checks to fit the checkdate() behavior (ensuring the month was between 1 and 12 and the year between 1 and 32767).
---------------------------------------
*[Jorge Vazquez](http://www.cheats.com.ar)* on 2009-06-23 07:33:04  
Disregard my last comment. After extensive testing, I realized this script was working fine. The problem came because I was using jscalendar (http://www.dynarch.com/projects/calendar/old/), a useful calendar wich I learned redefines the setFullYear function...

Of course it took me a while to find this out. So, great script, and I'm sorry, my bad!
---------------------------------------
*[??????? ????? ???](http://an3m1.com/)* on 2012-04-10 09:50:22  
They have done such a great job with this. This is why they are deserving of these awards. Keep up the good work 
---------------------------------------
