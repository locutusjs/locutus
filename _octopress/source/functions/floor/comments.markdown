*[Mogria]()* on 2010-09-05 16:37:25  
I think this function is unnecessary.
Why you don't use "Math.floor" ...
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-09-06 12:44:33  
@Mogria: You can and probably should just use Math.floor. We are trying to fully implement the PHP API, both for the sake of convenience of those familiar with PHP and moving to JavaScript, and for the sake of (usually) offering convenient features that do not always map one-to-one to a built-in JavaScript function as this one does.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-09-08 19:48:24  
@ Mogria: This can also be used as a learning reference for PHP folks trying to learn JavaScript. Besides this opens up all kinds of opportunities like the Harmony Framework
---------------------------------------
*[Andrew]()* on 2010-12-09 02:08:16  
Why don't you just have
```
floor = Math.floor;
```
Has the same functionality and it's marginally faster in all browsers too, since it bypasses the encumbered 'Math' object.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-12-09 04:31:21  
@Andrew: Yes, that works well, but 1) We're following the same functional format for the sake of familiarity to our users (and possibly also simplicity in our compiler). 2) All our functions can be used not only in a non-namespaced environment, but also in a namespaced one (which I know could be done by "floor: Math.floor" if the compiler were aware of this format). Granted, in that case, one may just as well use Math.floor directly, but as we describe somewhere in our FAQ or site, some functions are implemented just for the sake of students of JavaScript (coming from PHP backgrounds) or for those still just functioning as script kiddies who are rushing to put something together that works, and who haven't taken time yet to learn the details of the language they will hopefully eventually learn more deeply. That being said, the large majority of functions in php.js are not and cannot be mere wrappers for the limited utility set built into JavaScript since PHP is far more expressive as far as built-in utilities.
---------------------------------------
*[ejrdtykufg]()* on 2011-02-17 15:58:23  
Please add author's portrait to this function!
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-02-18 04:25:05  
@ejrdtykufg: Good joke, but if you weren't aware of the site's purpose, read the comments below yours.
---------------------------------------
*[dude]()* on 2011-06-30 15:36:32  
again... DO IT RIGHT!!!
return value|value
---------------------------------------
*[Rafa? Kukawski]()* on 2011-06-30 16:33:32  
@dude: Math.floor(value) !== value|value
floor(-10.5) === -11
(-10.5|-10.5) === -10
Your approach is only valid for positive numbers.
---------------------------------------
*[????? ?????? ? ?????](http://an3m1.com/)* on 2012-04-18 10:19:11  
I wonder how you got so good. HaHa ! This is really a fascinating blog, lots of stuff that I can get into. One thing I just want to say is that your design is so perfect ! You certainly know how to get a girls attention ! I’m glad that you’re here. I feel like I’ve learned something new by being here   

---------------------------------------
