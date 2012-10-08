*[Michael Grier](http://mgrier.com/te5t/uniqid-source.txt)* on 2009-04-14 17:53:59  
Here's the 5.2.9 source for uniqid.c and lcg.c

http://mgrier.com/te5t/uniqid-source.txt
(you can click my name for same page)

Here's the short version of "more_entropy"

```
/*
 * combinedLCG() returns a pseudo random number in the range of (0, 1).
 * The function combines two CGs with periods of 
 * 2^31 - 85 and 2^31 - 249. The period of this function
 * is equal to the product of both primes.
 */
```
---------------------------------------
*[Brett Zamir]()* on 2009-04-15 03:18:29  
Hi Michael, 

While it's great to use heavier algorithms, such as in the PHP source, I think our initial focus is on replicating the PHP API regardless of implementation--if you can make any implementations more robust (and/or speed them up), go for it! :)
---------------------------------------
*[Michael Grier]()* on 2009-04-15 15:42:46  
That wasn't my point. Kevin just mentioned in the comments of the function that "we need to checkout the PHP source to find out how they generate this exactly," so since nobody else "seemed" to have done this (there are no other comments here about it), I looked for and posted the source.
---------------------------------------
*[Brett Zamir]()* on 2009-04-16 00:14:07  
Aha...Gotcha...Thanks
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-19 23:26:43  
@ Michael Grier: That was exactly what I needed :D great. I will process the C code when I find the time. Thanks a lot, I'll make sure to mention your name in the final version.
---------------------------------------
*[Kankrelune](http://www.webfaktory.info/)* on 2009-05-29 23:34:31  
I did the conversion. It works correctly, there are some collisions when more_entropy is false, but nothing really bad + / - 50 or 60 per 10,000 id created with the same prefix ...

-> http://img33.imageshack.us/img33/1899/testsa.png

```
// uniqid( [ str prefix, [ bool more_entropy ]])
// Generate a unique ID 
// +     original by: Kankrelune (http://www.webfaktory.info/)
// -     depends on: sprintf
// *     example 1: uniqid();
// *     returns 1: 4a2027b600c14
// *     example 2: uniqid( time());
// *     returns 2: 12436214644a20285a07b3f
// *     example 3: uniqid( time(), true);
// *     returns 3: 12436214644a20285b1cd361.31879087
function uniqid( prefix, more_entropy)
{
    if(typeof prefix == 'undefined')
        prefix = "";
        
    var now, sec, usec;
    now = new Date().getTime()/1000;
    sec = parseInt(now,10);
    usec = Math.round((now-sec)*1000)/1000;
    
    if(more_entropy) // for more entropy we add a float lower to 10
        return sprintf("%s%08x%05x%s",prefix,sec,(usec*(Math.random()*999999)),(Math.random()*10).toFixed(8));
    
    return sprintf("%s%08x%05x",prefix,sec,(usec*(Math.random()*999999)));
}
```

@ tchaOo°
---------------------------------------
*[Kankrelune](http://www.webfaktory.info/)* on 2009-05-31 15:07:29  
Updated version without sprintf() dependencie and a lower collisions ratio (30/10.000)...

```
// uniqid( [ str prefix, [ bool more_entropy ]])
// Generate a unique ID 
// +     original by: Kankrelune (http://www.webfaktory.info/)
// *     example 1: uniqid();
// *     returns 1: 4a2027b600c14
// *     example 2: uniqid( time());
// *     returns 2: 12436214644a20285a07b3f
// *     example 3: uniqid( time(), true);
// *     returns 3: 12436214644a20285b1cd361.31879087

function uniqid( prefix, more_entropy)
{
    if(typeof prefix == 'undefined')
        prefix = "";
    
    var now, sec, usec;
    var formatBase = function(value, reqWidth) {
        value = (value >>> 0).toString(16);
        
        if (reqWidth > value.length)
            return Array(1 + (reqWidth - value.length) >>> 0).join('0') + value;
        if (reqWidth < value.length)
            return value.slice(0,reqWidth);
        
        return value;
    };
    var getRandSeed = function() {
        return [
                0xa524,0x11f9b,0x11c3a,0x7f5e,0xbe31,0x585a,0xc9c9,0xbee7,0x6a0f,0x8cb2,
                0x713e,0x11b99,0x4b7f,0x81f9,0x5e8d,0x15f34,0x57a9,0x10658,0x300d,0xa5da,
                0x13150,0xdf23,0x31b5,0x16fbc,0x17260,0xda84,0x15d13,0x17dc4,0x6263,0x11909,
                0x147ab,0x99b0,0xacf1,0x10da2,0xeb0f,0x9616,0x3e5b,0xd8dd,0x9331,0x13cb4,
                0x6701,0x148e3,0x139a4,0x4e74,0x6e6c,0x1230a,0x73e9,0x4b87,0x49c2,0x1357a,
                0x96cb,0x5010,0x9bc6,0x4588,0x9306,0x18107,0x1599f,0x7c97,0x16229,0x441c
            ][Math.floor( ( Math.random( ) * this.length ) )];
    };
    var makeSeed = function(seed) {
        return seed * ((((Math.random() * getRandSeed()) * (Math.random() * getRandSeed())) * getRandSeed()) * getRandSeed());
    };
    now = new Date().getTime()/1000;
    sec = parseInt(now,10);
    usec = Math.round((now-sec)*1000)/1000;
   
    if(more_entropy) // for more entropy we add a float lower to 10
        return prefix+formatBase(sec,8)+formatBase(makeSeed(usec),5)+(Math.random()*10).toFixed(8);
    
    return prefix+formatBase(sec,8)+formatBase(makeSeed(usec),5);
}
```

@ tchaOo°
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-05-31 19:24:20  
@ Kankrelune: Thanks a lot for investing your time! I would really like to have the implementation like PHP, but it still needs some work. Checkout comments here:

http://trac.plutonia.nl/projects/phpjs/browser/trunk/functions/misc/uniqid.js
---------------------------------------
*[Kankrelune](http://www.webfaktory.info/)* on 2009-05-31 20:44:20  
Hi... i have allredy think to store the ids and re generate if collision but i don't like this idea... and i don't like the 3rd parameter... .. . :o)

On the last test i have 20/35 collisions for 10.000 ids generate with the same prefix... for me 0.2% of collision it's more like PHP than a 3rd parameter... .. . ;o)

I know where is the problem... i work on when i have time... .. .
@ tchaOo°

ps: sorry for my english
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-05-31 21:01:29  
@ Kankrelune: Agreed but I believe the way it's set up now it will only generate a new number every second. If this function is used in a loop, you may get many iterations ( ids ) per second, and so there's nothing really unique about those.

If we fix the bug it will be much better, for now I have to leave the current implementation in tact though.
---------------------------------------
*[Kankrelune](http://www.webfaktory.info/)* on 2009-06-01 11:28:24  
Hi... you're revisited version don't work...

on start replace 

```
prefix +=  '';
```

by the original code...

```
if(typeof prefix == 'undefined')
    prefix = "";
```

i have made this for a simple cause... an undefined var is casted to a string she's transformed to a string with for contents "undefined" and after the ids is malformed...

undefinded4a2027b600c14

I think it's not a good idea to use an uniqid var on the uniqid function... it's a risk to dev confusion and namespace collision (? i speak english same as a spanish cow lol)

rename he to id or other is better... same for...

```
return this.uniqid(prefix, more_entropy, reduce_collision);```

>>

```
return uniqid(prefix, more_entropy, reduce_collision);
```

Bye
---------------------------------------
*[Kankrelune](http://www.webfaktory.info/)* on 2009-06-01 16:32:23  
Final version without collisions...

```
function uniqid( prefix, more_entropy)
{
    // string uniqid( [ str prefix, [ bool more_entropy ]])
    // Generates a unique ID  
    // 
    // version: 
    // discuss at: http://phpjs.org/functions/uniqid
    // +   original by: Kankrelune (http://www.webfaktory.info/)
    // *     example 1: uniqid();
    // *     returns 1: 'a30285b160c14'
    // *     example 2: uniqid('foo');
    // *     returns 2: 'fooa30285b1cd361'
    // *     example 3: uniqid('bar', true);
    // *     returns 3: 'bara20285b23dfd1.31879087'
    if(typeof prefix == 'undefined')
        prefix = "";
    
    var retId;
    var formatSeed = function(seed, reqWidth) {
        seed = parseInt(seed,10).toString(16); // to hex str
        if (reqWidth < seed.length) { // so long we split
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) { // so short we pad
            return Array(1 + (reqWidth - seed.length)).join('0')+seed;
        }
        return seed;
    };
    
    // BEGIN REDUNDANT
    if (!this.php_js) {
        this.php_js = {};
    }
    // END REDUNDANT
    if (!this.php_js.uniqidSeed) { // init seed with big random int
        this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    this.php_js.uniqidSeed++;
    
    retId = prefix; // start with prefix, add current milliseconds hex string 
    retId += formatSeed(parseInt(new Date().getTime()/1000,10),8);
    retId += formatSeed(this.php_js.uniqidSeed,5); // add seed hex string
    
    if(more_entropy) // for more entropy we add a float lower to 10
        retId += (Math.random()*10).toFixed(8).toString();
    
    return retId;
}
```

tested on 500.000 ids generated with the same prefix... .. . ;o)

@ tchaOo°
---------------------------------------
*[Kankrelune](http://www.webfaktory.info/)* on 2009-06-01 16:35:15  
the code is not complete... it's a strange bug i have the same when i post version_compare()

http://www.webfaktory.info/uniqid.txt

@ tchaOo°
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-06-02 10:52:38  
@ Kankrelune: Great job! Added!

(ps: I don't see a difference between the text file you uploaded and the source below, seems ok? am I not seeing it or was it different before?)
---------------------------------------
*[Kankrelune](http://www.webfaktory.info/)* on 2009-06-02 16:18:30  
Yes me to... i don't see the difference today but the code is not the same than yesterday... a cache problem or i don't know... i was not drunked yet... lol... .. .

@ tchaOo°
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-06-10 14:38:03  
@ Kankrelune: Ok must be a caching issue then. I will try and see if I can reproduce it.
---------------------------------------
*[Mehmet Hazar Artuner](hazarartuner.com / under construction)* on 2011-12-18 23:10:53  
thank you so much, you saved my life :D :D
---------------------------------------
