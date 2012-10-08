*[speedmax]()* on 2008-01-30 01:29:09  
I been coding php for 7 years, good work but why the hell would you want to do that.. ?


javascript is a better language, its more of a functional language with array/hash shortcut, iterator, closure for free. 

try to do this in php

['you','and','me'].map(function(item){ 
         return item.toUpperCase() 
}).join(' ')
---------------------------------------
*[speedmax]()* on 2008-01-30 01:35:29  
that was showing lamda in the work,  here is one liner to the purist. 

Beauty and the Beast
```
['you','and','me'].map(String.toUpperCase).join(' ')
```

```
implode(' ', array_map('strtolower', array('you', 'and', 'me')))
```
---------------------------------------
*[Abraham Estrada]()* on 2008-01-30 05:16:21  
Sorry guys but I think you are reinventing the wheel
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-30 08:11:43  
@ Abraham Estrada: Yep, but sometimes you need a different set of wheels right?

@ speedmax: 
About the PHP vs JS stuff.. I'm not trying to port or emulate the entire language or control structures of PHP. Indeed I don't see the need because Javascript seems to have more elegant features in that category anyway.

However in my eyes, PHP does provide a large set of standard functions that make developing very easy, and some of them don't have good standard Javascript implementations, though they often would be great to have client-side.

So in this project by also providing the functions separately, I hope to keep people from inventing the wheel and give them a head start.
---------------------------------------
*[saulius]()* on 2010-01-06 11:35:09  
var i = (haystack+'').lastIndexOf( needle, offset );
return i >= 0 ? i : false;
//strrpos(somepage.com, '.', false); returns false


if (offset)
{
    	var i = (haystack+'').lastIndexOf(needle, offset);
}
else
{
    	var i = (haystack+'').lastIndexOf(needle);
}
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-07 07:31:04  
I don't have time to test myself now, but there is also this issue:

```var_dump(strrpos("canal", "a", 3)); // PHP and php.js gives 3
var_dump(strrpos("canal", "a", 4)); // PHP gives false while php.js gives 3
```

Seems the offset behaves differently, maybe from the opposite direction. So before adding saulius' changes, someone please take a look.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-08 11:07:08  
@saulius, thanks again, I've now incorporated your fix and the issue I mentioned: http://github.com/kvz/phpjs/raw/master/functions/strings/strrpos.js . The problem is that the 2nd argument to lastIndexOf() works very differently from strrpos's offset argument (see the comments for an explanation).
---------------------------------------
*[$client = new SoapClient("some.wsdl"); $client->SomeFunction](354)* on 2012-08-24 21:48:16  
545
---------------------------------------
