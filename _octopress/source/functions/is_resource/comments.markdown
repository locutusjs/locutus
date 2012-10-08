*[Luis Salazar](www.freaky-media.com)* on 2009-05-28 19:51:05  
Hi, great!!

Just one thing. Is there any special reason for using the brackets in this case, or can we just do :

```
return !(!handle || typeof handle !== 'object' || !handle.constructor || handle.constructor.name !== 'PHPJS_Resource');
```

Thanks a lot!! 
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-29 00:38:57  
Good one!  Changed in SVN.
---------------------------------------
