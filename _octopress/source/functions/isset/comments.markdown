*[[FremyCompany] Can be maked quicker :]()* on 2008-04-16 18:28:10  
```function isset() {
  var a=arguments; var l=a.length; var i=0;
  while (i!=l) {
    if (typeof(a[i])=='undefined') { return false; } else { i++; }
  }
  return true;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-17 12:48:15  
@ FremyCompany: Updated, thank you!
---------------------------------------
*[Onno Marsman]()* on 2008-08-11 11:02:44  
1. should return false also on null values like in php
2. should throw an error when no arguments are provided
3. should throw an error when passed arguments are not variables, like in both examples. They would give an error in PHP. Not sure if this is possible or needed by anyone.

Implementation for 1. and 2.  :
```
function isset() {
    var a=arguments; var l=a.length; var i=0;
    if (l==0) { throw new Error('Empty isset'); }
    while (i!=l) {
        if (typeof(a[i])=='undefined' || a[i]===null) { return false; } else { i++; }
    }
    return true;
}
```
I made up an error message because I thought:

Parse error: syntax error, unexpected ')', expecting T_STRING or T_VARIABLE or '$'

Would be pushing it ;)

The check for l==0 could be placed after the while to make it a littlebit more efficient in the case it would return false, but I think this is more readable.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 18:17:25  
@ Onno Marsman: Another great attribution to our project! Thank you so much!
---------------------------------------
*[Maxim]()* on 2009-01-27 14:23:10  
```
var a=1;
delete a;
isset(a);
```
throws:
ReferenceError: a is not defined
---------------------------------------
*[Maxim]()* on 2009-01-27 14:30:57  
sorry, it doesn't work in Firebug console, 
but works properly in firefox itself.

thanks for good function :)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-01 21:55:58  
@ Maxim: :)
---------------------------------------
*[mk.keck]()* on 2009-03-06 17:00:12  
Function isset() does not work?
I've done follow test:
```
if (!isset(a)) { // a does'nt really exists
    alert('Var \'a\' is undefined');
} else {
    alert('Var \'a\' = &quot;' + a + '&quot;');
}
```
I get an Error from browser 'a is undefined'.
If I use isset('a') I get alwasy true ... ?

I've changed the function isset():
```
function isset() {
    var a = arguments;
    if (a.length &gt; 0) {
        var i = 0;
        while (i !== a.length) {
            if (typeof(a[i]) === 'object') {
                if (typeof(a[i]) === 'undefined' || a[i] === null) {
                    return false;
                } else {
                    i++;
                }
            } else if (typeof(a[i]) === 'string') {
                if (typeof(window[a[i]]) === 'undefined' || window[a[i]] === null) {
                    return false;
                } else {
                    i++;
                }
            }
        }
        return true;
    }
    return false;
}
```
Now I get the correct answer from function isset
---------------------------------------
*[abc](www.gmail.com)* on 2010-05-14 12:39:46  
puriyala
---------------------------------------
*[iia](http://www.aquaregiafx.com)* on 2010-07-27 16:23:58  
Thank you, you guys are great!
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-07-28 08:35:14  
IMO, the if statement can be changed to

```if (a[i] == null)```
it will throw a lint warning, but only null and undefined equals null, so the == operator is used on purpose and the warning can be ignored.
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-07-28 08:37:39  
Sorry for the double comment, but wanted to add, that the else clause can be removed. Just leave the i++;
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-07-28 20:06:39  
@Rafał: Thanks for the ideas. I've applied your latter change, but in my view at least, while more succinct (and getting jslint to be quiet--which actually _is_ a pragmatic goal despite what some people say, given that a minimum of jslint complaints helps spot real errors), I do like the specificity of spelling it out, as it communicates that the issue was considered and addressed.
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-07-28 23:18:25  
@Brett Zamir:
I agree that lint helps in many cases and should be respected in as many cases as possible, and strict rules are good for complex projects where many developers are involved, but sometimes we come across situations where a problem can be solved better when using non-lint compliant solutions. That is why IMO some exceptions should be allowed, especially when the developer is 101% sure of what he is doing (and a good example is the isset function, where it can be improved by using only _core features_ of javascript). But, if being lint compliant is priority for phpjs project than I have to accept your point of view and I'll try to avoid lint warnings in future improvements.

Below another approach to isset. The idea is to declare a var that holds undefined and compare arguments to null and to the undef variable. It might be slower (comparing to current solution) when checking only one argument, but should get faster when checking two or more variables, cause we are avoiding string comparison.

```function isset(){
   var a=arguments, l=a.length, i=0, undef;

   [...]
      if(a[i] === null || a[i] === undef)
   [...]
}```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-07-30 13:17:25  
@Rafał Kukawski: I agree with you that certain items should be allowed (my pet peeve is switch case fall-throughs which I'd like to allow "fall-through" comments to insist it was intentional though not requiring even that comment if cases are on the same line). 

The real solution here I think is for someone to confirm whether JSLint is open source or not (I couldn't see that it was, though one site claimed it was BSD); if it isn't, we also need a good open source JS parser. Then configure it to make the exceptions we believe in. But since I'm short of time to do this now, I for one hope we will stick with a mostly JSLint-compliant set-up so we don't get used to too many warnings and then miss out on actually useful warnings.

Btw, I took your nice optimization as it is shorter, but as far as timing goes, Firefox testing seemed to have it perform about the same for each no matter the number of arguments. Still, a little less bandwidth wouldn't hurt.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-09-08 16:52:49  
@ Rafał Kukawski: I agree that exceptions can be made, but not in this case. Altough == is shorter and equal in functionality here, developers reviewing your code really have to be in it to see that.

Being more explicit will make it clear what you mean and will benefit maintenance in the long run.

Other than that: Thanks for your wonderful work. I'm impressed.
---------------------------------------
*[dededd deded de deded](dedded)* on 2011-06-29 15:54:44  
dededde
---------------------------------------
*[carlos](http://www.xim5.com)* on 2012-01-02 07:21:05  
Is this function only checking if a variable has been set or is it actually working like in PHP where you can check something like this:
```
if(isset($_GET['var']))
{
   ...code...
}
```
???
---------------------------------------
