*[Onno Marsman]()* on 2008-10-04 11:56:57  
decbin('8') does not work correctly. A fix:

```
function decbin(number) {
    return parseInt(number).toString(2);
}
```
---------------------------------------
*[ben]()* on 2008-11-06 21:21:58  
wow!!! so cool!!!
---------------------------------------
*[nord_ua]()* on 2009-08-04 12:23:28  
```
decbin(-3)
```
-11 
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-05 03:58:58  
@nord_ua: Thanks for the report! Fixed in SVN...
---------------------------------------
*[Tim de Koning](http://www.kingsquare.nl)* on 2009-08-06 13:17:58  
Please note that there is a difference between the handling of large numbers in different browsers. e.g. 

IE8
```
>>decbin(3747030078639374300)
"1.101000000000000100000000000010000000000000001(e+61)"
```

Firefox 3.5
```
>>> decbin(3747030078639374300)
"11010000000000001000000000000100000000000000010000000000000000"
```

This is caused by the fact that Number.toString(2) doesn't work in IE for numbers written in scientific notation internally.

---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-16 15:19:18  
@ Tim de Koning: Thanks for pointing that out.
---------------------------------------
