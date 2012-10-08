*[Christoph]()* on 2009-07-21 17:49:36  
Doesn't work in IE as IE can't acces characters by array subscription - you'll have to use charAt() instead! Also, it replicates built-in functionality.

A better implementation:
```
function strpbrk(string, chars) {
    for(var i = 0, len = string.length; i < len; ++i) {
        if(chars.indexOf(string.charAt(i)) >= 0)
                return string.substring(i);
    }

    return false;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-24 12:21:52  
@ Christoph: Cool man, much shorter, no IE problems & passes testcases. So I'm happy. Thanks for the code! (will be online shortly)
---------------------------------------
