*[T0bsn]()* on 2008-04-04 19:22:33  
replace:
```if (typeof(crc) == &quot;undefined&quot;) { crc = 0; }```
with:
```var crc;```

...and it works for every function exec. ;)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-06 10:50:51  
@ T0bsn: I've updated the function. Thanks a lot!!
---------------------------------------
*[Marco]()* on 2011-02-18 10:49:55  
I think i've found a bug for this one.
Input string: "\x49\x44\x41\x54\x08\x1d\x01\x05\x00\xfa\xff\x00\x79\x00\x00\xff\x02\xe8\x01\x79" (it's a substring of a png file).
PHP crc: -1895555446
JS crc: 756484124

---------------------------------------
*[Marco]()* on 2011-02-18 11:06:55  
This function solves the bug that i've posted: http://stackoverflow.com/questions/2647935/javascript-crc32-function-and-php-crc32-not-matching
---------------------------------------
*[Benny Nissen](beast.dk)* on 2011-03-20 12:19:10  
Passing 'null' (javascript null) gived different values on the client and server side. I pass the value as JSON so it might get 'translated' somewhere. Just to let somebody know.

Benny
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2011-03-20 16:08:55  
@Benny Nissen: thanks for your report. The problem was inside utf8_encode function, that for null value didn't return empty string. This is now fixed in git.
---------------------------------------
*[Soulcyon](http://haloindex.com)* on 2011-04-07 09:09:32  
```
        s = utf8(s);
        var t = "PUT THAT HUGE TABLE IN HERE",
            c = 0,
            i = -1,
            l = str.length - 1;
        
        c = c ^ -1;
        while( !!(i++ - l) )
            c = ( c >>> 8 ) ^ parseInt(t.substr( (c ^ s.charCodeAt(i) & 255) * 9, 8 ), 16);
        return c ^ -1;
```
---------------------------------------
*[doufu]()* on 2012-09-24 11:04:55  
thanks
---------------------------------------
