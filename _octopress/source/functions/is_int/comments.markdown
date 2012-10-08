*[Paulo Ricardo F. Santos]()* on 2008-11-28 23:19:12  
KISS way: just do value/type comparison with parseInt() result. :)

```function is_int(mixed_var)
{
    return mixed_var === parseInt(mixed_var * 1);
}```
---------------------------------------
*[Paulo Ricardo F. Santos]()* on 2008-11-29 01:38:03  
Note: both current/my implementation isn't PHP compliant at all, since in JS '1.0 === 1' is a True comparison.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-01 09:29:32  
@ Paulo Ricardo F. Santos: thanks. I believe that 1.0 is simplified to 1 as soon before it can be accessed by the function. if I echo mixed_var in the function's first statement, it's already 1. So if anybody knows a good way to get this example working:

```
    // *     example 3: is_int(1.0);
    // *     returns 3: false
```

please let me know!
---------------------------------------
*[Paulo Ricardo F. Santos]()* on 2008-12-03 12:47:44  
@ Kevin: Yep, the value is evaluated before it is assigned - this should occurs through the Number object constructor. A time that JS lacks different objects to Float/Integer values, I think that, unfortunately,  there's no way to match this approach. ;/
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-03 13:13:23  
@ Paulo Ricardo F. Santos: OK, I've added a note to the is_int code, we'll leave it at that then.
---------------------------------------
*[Matt Bradley](http://www.inventpartners)* on 2009-01-20 15:15:26  
This version will also work with strings

function is_int(value){
  if(parseFloat(value) == parseInt(value)){
      return true;
  } else {
      return false;
  } 
}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-25 14:13:05  
@ Matt Bradley: Thanks for you function. The current implementation did as well. But in fact, I checked the PHP manual: and that's not supposed to happen. So I've actually changed your implementation that also the type is looked at. And now all the examples in the php manual workout with our function as well.
---------------------------------------
*[Jordan]()* on 2009-09-08 13:09:10  
```
is_int('23,5') return true...
```

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-09-08 14:17:27  
@Jordan: It's false for me (as it should be)--not sure what you mean...
---------------------------------------
*[WebDevHobo](http://webdevhobo.blogspot.com)* on 2009-10-30 02:50:16  
Interesting implementation. I'm not that big with Javascript, so this is real nice.

Here's 2 functions that I usually use for this kind of stuff:

```function isInteger(value){
  return (!(value % 1));
}

function isNumber(n){
  return n != null && n != "" && typeof(n) != "boolean" && !isNaN(n);
}```

Don't know what flaws might be in them, but they sure did the trick uptill now.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-07 13:25:46  
@WebDevHobo: Thanks for pointing out those useful functions. We needed the extra checks in our is_numeric(), though I realized later (see http://github.com/kvz/phpjs/commit/eb83b48c940e4f8c5548d63c178c2fae2c0ba729 ) that we also needed to prevent arrays being treated as numeric. As far as integer checking, while we still needed our check for type (e.g., your isInteger() will return true for true), the use of modulus is I believe a sound replacement for the more complex comparison we had earlier. Fixed at http://github.com/kvz/phpjs/commit/06388a893c7a5bcb1876ada68997c04241fc6d52 . Thanks for the functions!
---------------------------------------
*[WebDevHobo](http://webdevhobo.blogspot.com)* on 2009-12-13 01:09:14  
```is_int(0.0)``` returns true

Screenshot: http://i.imgur.com/rvtAc.png
Any number of 0's may be added after the . sign, result stays true. The moment you add any other number somewhere behind the . sign, result becomes false.

Supposed bugfix: Check for the . sign and return false whenever encountered. Not sure how to do that, which is why I didn't code it myself.

That is, if we [b]want[/b] this to return false? 0.0 is the exact same as 0, far as I know.

Also: "On line: #25: Confusing use of '!'."

Far as I know, what happens here is the "order of execution". The parser will first execute that within the () and then the ! will be applied to the result, which is what is needed. Not very confusing.
---------------------------------------
*[WebDevHobo](http://webdevhobo.blogspot.com)* on 2009-12-13 01:12:01  
Also, the link to the PHP is_int function(to the official PHP docs) is broken. Apparently, not an underscore, but a minus sign is used in the link.

My guess: they want to reserve underscores for replacing spaces.
---------------------------------------
*[WebDevHobo](http://webdevhobo.blogspot.com)* on 2009-12-13 09:24:43  
Nevermind my comment on the 0.0 issue, I should read the documentation before saying stuff.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-12-14 15:54:34  
@ WebDevHobo: Thanks I fixed the link to the php docs throughout the site. As for is_int: yeah that's a real bummer. We can get close to PHP but sometimes it just isn't possible to nail it.
Did fix the jslint warning though, will disappear soon ; )
---------------------------------------
*[Enrique Melendez](http://www.ita.es)* on 2011-03-23 11:07:30  
version in one line:
```
return typeof mixed_var !== 'number' ? false : !(mixed_var % 1);
```
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2011-03-23 14:55:02  
even shorter

```return mixed_var === (mixed_var | 0);```
---------------------------------------
*[CoursesWeb](http://www.coursesweb.net)* on 2012-04-30 08:20:25  
Hi,
For is_int i use this version:
```
function is_int(n) {
  return typeof(n)==="number" && Math.round(n) == n;
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-04 17:02:04  
@CoursesWeb: Is there some case where your code catches something ours does not?
---------------------------------------
