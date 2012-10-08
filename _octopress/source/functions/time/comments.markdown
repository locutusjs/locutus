*[metjay]()* on 2008-07-28 19:47:20  
This goes even shorter:

```
function time() {
    return Math.round(new Date().getTime()/1000);
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 16:35:02  
@ metjay: fair enough, thank you!
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-03-13 16:33:10  
For the record, I thought I'd try returning "Date.parse(new Date())/1000;" which is technically shorter, but it turns out quite a bit slower (parsing time I guess)

---------------------------------------
*[HKM]()* on 2009-09-04 17:40:29  
It have 1 second error because the milliseconds will be counded. Therefore, the code should be changed to that.
```
function time () {
    return Math.floor(new Date().getTime()/1000);
}
```

---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-09-04 19:06:12  
@ HKM: Thanks for supplying the fix! Will be online shortly. Until then review at:
http://github.com/kvz/phpjs/commit/459b16b6d454d4e30386729ee2640d0013449578
---------------------------------------
*[Jawad Shuaib](http://jawadonweb.com)* on 2009-11-24 16:59:56  
I love you guys, PHP.js has vastly improved my ability to ship code fast.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-11-29 23:38:19  
Thanks Jawad, that's always nice to hear!
---------------------------------------
*[Nuked]()* on 2010-07-08 18:50:14  
Just to say thanks.
---------------------------------------
*[OMA]()* on 2010-07-14 15:23:52  
Just to let you know the getTime function is pretty innacurate in Fresco (a browser used in some devices such as TV set top boxes).

For example, the date 2011/03/03 22:59:00, when converted in Firefox is correctly translated to 1301864340, but in Fresco, it gets translated to 1301871540, which is really 2011/04/03 17:59:00 (a month off!).

So maybe, for accuracy's sake in all browsers, the date to timestamp conversion should be done manually instead of relying in getTime()
---------------------------------------
*[OMA]()* on 2010-07-14 15:48:46  
Sorry, I think I messed up the example timestamps in my previous posts, but the accuracy problem remains...
---------------------------------------
