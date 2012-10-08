*[Victor]()* on 2009-01-07 01:44:55  
A minimized version:

```
function ip2long(a){if(a.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)){var b=a.split('.');return(b[0]*16777216)+(b[1]*65536)+(b[2]*256)+(b[3]*1)}else{return&quot;WTF? 0!&quot;}}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-07 13:29:45  
@ Victor: For minified versions we have php.min.js &amp; in the near future our compiler will be able to compress a custom, smaller selection of functions for more speed &amp; less size. For the original source however, we like to keep things as readable as possible.

More info: http://trac.plutonia.nl/projects/phpjs/wiki/DeveloperGuidelines#Comments

Thanks a lot for contributing though!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-07 13:36:57  
@ Victor: That being said: I did take your idea for using fixed numbers, as I don't see any reason why not to, and it will greatly improve the speed of this function. Thx!
---------------------------------------
*[fearphage](http:/my.opera.com/fearphage/)* on 2009-08-30 06:45:27  
```function ip2long(ip_address) {
  var parts = ip_address.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  return parts
    ? parts[1] * 16777216 + parts[2] * 65536 + parts[3] * 256 + parts[4] * 1
    : false;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-09-04 18:42:52  
@ fearphage: I like it :)
http://github.com/kvz/phpjs/commit/51ac74a14bb0237b202a4a19dc455f45e92da1d5
---------------------------------------
