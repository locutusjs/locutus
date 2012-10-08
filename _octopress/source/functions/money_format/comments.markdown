*[daniel airton wermann](http://wermann.com.br)* on 2009-10-14 16:45:28  
Hi!
Excuse me, but I've found a bug (or not?).
Look this: 
```money_format('%i', 134.56);```

It's returns:  ```USD ,134.56```

Anybody help me?
---------------------------------------
*[daniel airton wermann](http://wermann.com.br)* on 2009-10-14 19:09:19  
A bug occurs when use it on Internet Explorer.
I don't know what the problem, but the returns of the function in IE doesn't the same as on Firefox for example.
In IE:
```3,590.```
In FF:
```3,590.00```

Second bug, please help!
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-16 02:35:42  
@daniel: I believe I have fixed the two issues you raised. One was due to regular expression functions giving the empty string in Firefox and "undefined" in IE for missing arguments (was only checking for empty string), while the other problem was due to the fact that I was adding the thousands separator with numbers less than a thousand (thus the comma). These should now both be fixed in Git: http://github.com/kvz/phpjs/commit/2a379948ebd70f40a017f43b4e5127447484eebb .

There are two other issues possibly remaining:
1) PHP, as I recall, may differ in the default (English) locale as to whether "USD" is used for the international currency default or nothing. In our setlocale() implementation, it does. This is set in the line:
```phpjs.locales.en_US.LC_MONETARY.int_curr_symbol```
We should probably look into which locales use this and which use nothing as the "international" symbol.
2) I understood from the documentation that padding should be left to make space for alignment with numbers which have a (negative) sign, so there is a space added (perhaps in the wrong place too) at the beginning of the number, whereas in PHP, it doesn't seem to add a space. 

I only put out money_format() recently, and I didn't find the documentation out there particularly clear, so it wouldn't surprise me if there are a few bugs left to work out. Hopefully, it is close enough to be worth fixing the bugs as they're discovered.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-25 13:44:55  
@ Brett Zamir: Did I mention yet you were the man?
Well, you are.
---------------------------------------
