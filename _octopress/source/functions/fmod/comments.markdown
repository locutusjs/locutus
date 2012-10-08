*[Enrique González](http://www.maciaspajas.com)* on 2008-10-01 13:52:45  
Two simple functions that translate deg to rad and viceversa:

```
function deg2rad(angle)
  {
  //*        example 1 : deg2rad (180)
  //*        returns 1 : 3.141592653589793
  return (angle/180)*Math.PI;
  }
  
function rad2deg(angle)
  {
  //*        example 1 : deg2rad (pi())   
  //*        returns 1 : 3.141592653589793
  return (angle/Math.PI)*180;
  }
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-01 14:24:56  
@ Enrique GonzÃ¡lez: Thank you so much!
---------------------------------------
*[Enrique González](http://www.maciaspajas.com)* on 2008-10-01 15:00:56  
The example 1 at rad2deg is wrong. It should be something like:

rad2deg (3.141592653589793)
returns 180
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-01 15:18:10  
@ Enrique GonzÃ¡lez: Whoops, my bad.
---------------------------------------
*[Onno Marsman]()* on 2008-10-05 17:50:26  
The following comments should be removed, they are not true:

// %          note: Examples in PHP &amp; JS return: 0.8, but according 
    // %          note: the PHP-manual's it should be 0.5. PHP manual seems to be incorrect?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 12:25:55  
@ Onno Marsman: Sharp, thanks again Onno.
---------------------------------------
*[Kutsy]()* on 2011-03-09 08:42:04  
```
php: fmod(5,10) => 5
js: fmod(5,10) => 10  !!! Must be "5"!
```

---------------------------------------
*[Lord_t](hrabstwo.net)* on 2012-02-08 21:38:57  
It doesn't work!
---------------------------------------
*[lord_t](hrabstwo.net)* on 2012-02-08 22:14:48  
```
Math.fmod = function(x, y) {
    // Returns the remainder of dividing x by y as a float  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/fmod    // +   original by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +   bugfixed by: Pawel 'lord_t' Maruszczyk 
    // *     example 1: fmod(5.7, 1.3);
    // *     returns 1: 0.5    
    var tmp, tmp2, p = 0,
        pY = 0,
        l = 0.0,
        l2 = 0.0;
     tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
    p = parseInt(tmp[2], 10) - (tmp[1] + '').length;
    tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
    pY = parseInt(tmp[2], 10) - (tmp[1] + '').length;
     if (pY > p) {
        p = pY;
    }
 
    tmp2 = (x % y); 
    if (p < -100 || p > 20) {
        // toFixed will give an out of bound error so we fix it like this:
        l = Math.round(Math.log(tmp2) / Math.log(10));
        l2 = Math.pow(10, l); 
        return (tmp2 / l2).toFixed(l - p) * l2;
    } else {
        return tmp2;
    }
}
```
---------------------------------------
*[lord_t](http://hrabstwo.net)* on 2012-02-08 22:16:42  
```
Math.fmod = function(x, y) {
    // Returns the remainder of dividing x by y as a float  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/fmod    // +   original by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +   bugfixed by: Pawel 'lord_t' Maruszczyk (http://hrabstwo.net)
    // *     example 1: fmod(5.7, 1.3);
    // *     returns 1: 0.5    
    var tmp, tmp2, p = 0,
        pY = 0,
        l = 0.0,
        l2 = 0.0;
     tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
    p = parseInt(tmp[2], 10) - (tmp[1] + '').length;
    tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
    pY = parseInt(tmp[2], 10) - (tmp[1] + '').length;
     if (pY > p) {
        p = pY;
    }
 
    tmp2 = (x % y); 
    if (p < -100 || p > 20) {
        // toFixed will give an out of bound error so we fix it like this:
        l = Math.round(Math.log(tmp2) / Math.log(10));
        l2 = Math.pow(10, l); 
        return (tmp2 / l2).toFixed(l - p) * l2;
    } else {
        return tmp2;
    }
}
```
---------------------------------------
*[kirilloid]()* on 2012-03-06 12:32:42  
Hm-hm. Why not use this?
```function fmod (x, y) {
    return  x % y;
}```
---------------------------------------
