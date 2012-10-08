*[Will]()* on 2008-04-24 08:38:57  
Great job!
Very happy to see that is your recently post.
I am lucky, because of you!
---------------------------------------
*[John](www.whatsmyip.org)* on 2009-08-30 09:05:15  
Cool idea. But this doesn't work. If you use ip2long in php, and get the result of that and pass it to this long2ip javascript function, what you get is NOT the original IP you started with. If you add (256^4)/2 to the long, you'll get the 2nd, 3rd and 4th sections correct but the first section of the IP will still be off.

long2ip/php accepts the signed int, but apparently the javascript version is looking for an unsigned int
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-09-04 19:00:26  
@ John: That will happen if you try to move around IPs in long notation between systems anyway, cause the max integer size isn't fixed:

On 64 bits system ip2long ONLY RETURNS POSITIVE VALUES

so

<?php
echo ip2long('200.200.200.200');
?>

will output -926365496 on a 32 bits system and 3368601800  on a 64 bits system

So basically only use this in the confinement of 1 process, or use a methods to get consistent numbers like sprintf('%u') before transporting to database/client/whatever
---------------------------------------
*[Oscar Broman]()* on 2011-11-15 10:56:04  
Correction/improvement:
```
function long2ip(ip) {
	return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-05 11:21:34  
@Oscar Broman: Can you integrate at least as comprehensive argument checking as we have in our existing version, following PHP behavior without losing the performance benefits of your new version?
---------------------------------------
*[Oscar Broman](https://github.com/oscar-broman/)* on 2012-07-24 22:15:08  
@Brett Zamir: I'm not entirely sure whether that was rhetorical. Anyway, here you go:
```
function long2ip(ip) {
	if (!isFinite(ip))
		return false;
	
	return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
}
```

The boundary checking being done in the original function isn't what the PHP function does - it simply converts the input to a long. Therefore, negative values (which some systems dealing with IPs as signed integers will give you) will be treated correctly.
Where is this done in JS, one might ask? Bitwise operators in JS treat their operands as 32 bit integers, so the given number will essentially be implicitly casted to one.
---------------------------------------
