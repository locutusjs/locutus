*[space_marine]()* on 2008-06-23 17:56:22  
Can this function set array cookies?

```
&lt;?php
// set the cookies
setcookie(&quot;cookie[three]&quot;, &quot;cookiethree&quot;);
setcookie(&quot;cookie[two]&quot;, &quot;cookietwo&quot;);
setcookie(&quot;cookie[one]&quot;, &quot;cookieone&quot;);

// after the page reloads, print them out
if (isset($_COOKIE['cookie'])) {
    foreach ($_COOKIE['cookie'] as $name =&gt; $value) {
        echo &quot;$name : $value &lt;br /&gt;\n&quot;;
    }
}
?&gt;
```

Output:

three : cookiethree
two : cookietwo
one : cookieone
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-17 22:04:29  
@ space_marine: I haven't tried that with Jonas' code so far. Can you share your findings?
---------------------------------------
*[Andreas](http://www.andreas-haerter.de)* on 2008-10-28 21:45:53  
Usage of escape() is out-dated (isn't it?) and got some other problems (e.g. some UTF8 stuff). I think encodeURI() would be a better solution here.

However, thx for this project!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-03 10:59:23  
@ Andreas: Thank you, fixed!
---------------------------------------
*[Onno Marsman]()* on 2008-11-07 08:25:04  
The encodeURI function does not encode characters like &amp; and = . I think encodeURIComponent should be used instead.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-09 13:04:57  
@ Onno Marsman: Fixed
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-08 03:01:49  
Here's setrawcookie() (just removed encodeURIComponent())...

```
setrawcookie('author_name', 'Kevin van Zonneveld');
alert(document.cookie); // author_name=Kevin van Zonneveld
setcookie('author_name', 'Kevin van Zonneveld');
alert(document.cookie); // author_name=Kevin%20van%20Zonneveld

function setrawcookie(name, value, expires, path, domain, secure) {
    // http://kevin.vanzonneveld.net
    // *     example 1: setrawcookie('author_name', 'Kevin van Zonneveld');
    // *     returns 1: true 
    expires instanceof Date ? expires = expires.toGMTString() : typeof(expires) == 'number' &amp;&amp; (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
    var r = [name + &quot;=&quot; + value], s, i;
    for(i in s = {expires: expires, path: path, domain: domain}){
        s[i] &amp;&amp; r.push(i + &quot;=&quot; + s[i]);
    }
    return secure &amp;&amp; r.push(&quot;secure&quot;), document.cookie = r.join(&quot;;&quot;), true;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-08 10:56:27  
@ Brett Zamir: With so many lines shared, I've made setcookie depend on setrawcookie.
---------------------------------------
*[Steve]()* on 2010-11-01 11:57:28  
Thanks for this.  Just a quickie for those wanting to do the reverse: i.e.  $myVar=$_COOKIE['somecookie'];

Here's a function to read a cookie set by PHP originally from here http://www.quirksmode.org/js/cookies.html but with a correction as PHP URI encodes cookies.
```
function $_COOKIE(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length).replace(/\+/g, '%20'));
	}
	return null;
}
```
Usage:  $myVar=$_COOKIE('somecookie');  //NB the round brackets!
---------------------------------------
*[PJ Brunet](http://tomakefast.com)* on 2011-10-01 08:44:31  
@Steve Thanks, your function worked for me--reads cookies set with this function.  
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-10-06 07:04:05  
@Steve: Thanks! I've adapted the function within the experimental section as an attempt at replicating a PHP language feature (along with $_GET()).
---------------------------------------
*[ ????? ????????](http://an3m1.com/)* on 2012-04-17 15:30:43  
Great job here. I really enjoyed what you had to say. Keep going because you definitely bring a new voice to this subject. Not many people would say what you’ve said and still make it interesting


---------------------------------------
