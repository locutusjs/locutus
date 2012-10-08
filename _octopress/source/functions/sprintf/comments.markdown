*[David Portabella]()* on 2008-11-04 20:03:40  
Hello,

Congratulations for this great library!!

one question,
Is it possible to specify a thousand separator for sprintf?

something like 
sprintf('%,.2f&quot;, 1234567.89) =&gt; &quot;1,234,567.89&quot;


Regards,
DAvid
---------------------------------------
*[Mike]()* on 2008-11-09 12:57:29  
If you want to serialize strings with multibyte chars (special chars) you must replace this line:

val = "s:" + mixed_value.length + ":\"" + mixed_value + "\"";

with these:

var stringLen = encodeURIComponent(mixed_value).replace(/%../g, 'x').length
val = "s:" + stringLen + ":\"" + mixed_value + "\"";
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-09 14:28:59  
@ David Portabella: I did some testing and as far as I can tell PHP itself does not support that notation. And a general rule of thumb for us is: if php doesn't do it, we don't either. This ensures maximum compatibilty. If I'm in error on this, let me know.
Otherwise, the function: number_format might be what you're looking for.
---------------------------------------
*[Paulo Ricardo F. Santos]()* on 2008-11-28 11:53:19  
Hey, the current implementation misses the custom padding character:

```printf(&quot;[%'#10s]\n&quot;,  $s); // use the custom padding character '#'```

;)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-01 09:13:31  
@ Paulo Ricardo F. Santos: Fixed it, thanks for pointing that out.
---------------------------------------
*[ejsanders](http://cantorion.org)* on 2009-01-08 12:29:19  
Here is the related function vsprintf, which takes the arguments as an array (can be useful):

```
function vsprintf(format, args) {
	return sprintf.apply(this, [format].concat(args));
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-08 17:03:36  
@ ejsanders: Very well, thank you!
---------------------------------------
*[Sandro Franchi](http://alegua.com.ar)* on 2009-08-29 17:48:32  
In Line 054

```
if (precision != null) {...
```

should be changed to 
```
if (precision) {...
```

because precision (when not used) is "undefined", not null, also this helps to make the script validated by jslint.



---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-30 04:59:41  
@Sandro Franchi: Good catch... But shouldn't it be:

```if (precision !== undefined) {```

? If it is as you had it, 0 will also be ignored.
---------------------------------------
*[kernel](http://www.btcomic.net/)* on 2010-10-09 18:35:14  
please consult this project, that will be helpful

http://www.diveintojavascript.com/projects/javascript-sprintf
---------------------------------------
*[Dj]()* on 2011-01-14 00:07:29  
A suggest:

check the result of parseInt() function, and set it to 0 if is NaN

```
case 'd':
                number = parseInt(+value, 10);
if (isNaN(number) {
    number = 0;
}
```

so when a %d is replaced with a non integer value, the result is 0 instead of NaN like PHP do.

Example without check NaN:
result = sprintf('Number is: %d', 'non numeric');
//result is: 'Number is NaN'


Example checking NaN:
result = sprintf('Number is: %d', 'non numeric');
//result is: 'Number is 0'

try it in php and compare

---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2011-01-14 07:46:33  
@Dj: Thanks for your feedback. I will add the fix today. 

BTW. The same can be done without the need to call parseInt and isNaN.

```number = (+value) | 0;```
+value casts the data to Number, | 0 drops floating point part and if the +value gives NaN, changes it to 0.
---------------------------------------
*[Brent]()* on 2011-09-29 02:49:33  
As far as adding a thousands separator, I don't think it is currently in the sprintf function code above.

However, this regex does it:
```
s/\d{1,3}(?=(\d{3})+(?!\d))/$&,/g
```

This javascript code (based on the regex) does it:
```

    function thousands (a){
    
     return a.replace (/\d{1,3}(?=(\d{3})+(?!\d))/g,"$&,");
     
    }
```

The only flaw is that it will happily keep adding commas every three characters to the right of the decimal point as well as to the left.  So you have to apply it to only the integer side of the number.  It works fine as-is for integers and, for example, currency (which only has max 2 decimal places).

If you want to use another separator character than "," make the change in the second argument to a.replace. 

I can't quite see how to easily add this to the sprintf function (and also the usual flag to add the thousands separator is ', which is used for something else in the code above) but there is a start for anyone who like to do it.

Regex source is from: http://remysharp.com/2007/10/19/thousand-separator-regex/
---------------------------------------
*[Dj]()* on 2012-08-08 23:28:13  
Note that the regexp does not include the char "F" (uppercase), so expressions like "%01.2F" will not works.
The function is already done to process it, but it just was missed in the regexp so it is not captured.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-09-18 16:28:11  
@Dj: Fixed in Git, thanks!
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-09-19 03:23:45  
@Brent: Sorry for the very late reply, but is the functionality you seek already a part of PHP? You are free to share extension ideas here, but we really try to stick with PHP behavior to maintain limits on our project scope.

@kernel: Thank you for the reference, but is there some functionality present in the other implementation which is not in ours?
---------------------------------------
