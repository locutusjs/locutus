*[Jason Wong](carrot.org)* on 2009-05-29 10:12:42  
This function seems can not work properly in IE but works fine in firefox. For example, strrchr("java.js","."), it will always return false. The reason is that the needle is currently a string, however, needle[0] is undefined. 
Good Luck.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-29 19:03:22  
Thanks, Jason...Fixed in SVN (using needle.charAt(0)).
---------------------------------------
