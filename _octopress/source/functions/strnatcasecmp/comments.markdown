*[Devan Penner-Woelk]()* on 2010-05-25 03:15:24  
Due to the script, when using the 'Packed' compression method, the double semi-colon (;;) on line 32:
```for (;; ia++, ib++)```
is packed into only one (1) semi-colon:
```for (; ia++, ib++)```

This causes the entire JavaScript package to fail.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-06-19 15:55:56  
@ Devan Penner-Woelk: Thanks! Fixed: http://github.com/kvz/phpjs/commit/8ccb16793597a1fa6cabd6db2ad7a2baedf504f8
---------------------------------------
*[Adrian](http://www.radio-exodus.de)* on 2011-02-05 15:07:16  
This function is broken. strnatcasecmp('2', '3') === 0
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2011-02-05 18:59:41  
@Adrian: thanks for your bug report. I commited a fix to Git repo.
---------------------------------------
*[Adrian]()* on 2011-05-25 15:32:59  
strnatcasecmp('a', 'a') --> endless loop (most recent code from git)
---------------------------------------
