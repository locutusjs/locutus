*[Tod Gentille](www.syncorsystems.com)* on 2008-11-13 19:51:02  
I would suspect it would be more efficient to use the Javascript constant Math.LN10, the body of the  function is then
```
return Math.log(arg)/Math.LN10;
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-13 23:23:32  
@ Tod Gentille: I think so too. Thank you very much for pointing that out!
---------------------------------------
