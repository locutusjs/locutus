*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-03 11:34:51  
@ Paulo Ricardo F. Santos: In my test suite: phpjstest.php, readyState would stay at 1, I had to build a condition &lt; 3 to avoid the function from crashing. Very strange, because the file_exists function uses the same code and that works ok.
---------------------------------------
*[Paulo Ricardo F. Santos]()* on 2008-12-03 12:56:47  
@ Kevin: Hmm, great idea, I forgot this possible abnormal behavior! &gt;.&lt;

Ah!, man, I don't understood your example. Why it should returns 123? o.O
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-03 12:58:34  
@ Paulo Ricardo F. Santos: Well I haven't got it working yet, so that's why the examples are still in a copy-pasted state.
---------------------------------------
*[Paulo Ricardo F. Santos]()* on 2008-12-03 13:26:51  
@ Kevin: Ah! Well... how you are testing? AFAIK, there's no way to test it locally or request a cross-domain address. I've tested it on my test domain, requesting a file from same server. ;)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-03 14:14:46  
@ Paulo Ricardo F. Santos: I'm testing from console using the ./phpjstest.php file in the _tools directory in svn. But what's strange is that code from file_size (which I thought was identical) does not break.
---------------------------------------
*[Paulo Ricardo F. Santos]()* on 2008-12-04 14:54:40  
Oops, sorry for the inconvenient - it's a bit buggy and I don't know how it worked before.

This snippet should fixes all the problems:

```    tmp = req.getAllResponseHeaders().split('\n');
    tmp.pop();
    headers = [req.status + ' ' + req.statusText];
 
    for (i in tmp) {
        if (format) {
            pair = tmp[i].split(':');
            headers[pair.splice(0, 1)] = pair.join(':').replace(/^\s+|\s+$/g, '');
        } else {
            headers[headers.length] = tmp[i];
        }
    }```

Here's a temporary demo - working as expected: http://www.ceciliadassi.com/get_headers.html

[]'s
---------------------------------------
*[Paulo Ricardo F. Santos]()* on 2008-12-04 16:17:03  
Hmm, might be useful replace

```tmp.pop();```

to

```tmp = array_filter(tmp, function (str) { return str.replace(/^\s+|\s+$/g, '') != ''; });```

to avoid any unexpected problem. ;)
---------------------------------------
*[Paulo Ricardo F. Santos]()* on 2008-12-04 16:51:53  
Ah! This line:

```headers[pair.splice(0, 1)] = pair.join(':').replace(/^\s+|\s+$/g, '');```

might be only this, there's no difference:

```headers[pair.splice(0, 1)] = pair.join(':');```

And as far I've noted, to work properly in Opera, the AJAX request should be asynchronized, as here: http://www.ceciliadassi.com/get_headers2.js. Synchronized requests returns false in the most of times. ;/
---------------------------------------
*[Paulo Ricardo F. Santos]()* on 2008-12-04 23:20:01  
OMG! Sorry for the flood and ignore my last 2 comments (#7 and #8 - I was quite confused). Here's the function with corrections:

```
function get_headers(url, format) {
    var req = window.ActiveXObject ? new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;) : new XMLHttpRequest();
    if (!req) throw new Error('XMLHttpRequest not supported');
    var tmp, headers, pair, i;
 
    req.open('HEAD', url, false);
    req.send(null);

    if (req.readyState &lt; 3) {
        return false;
    }

    tmp = req.getAllResponseHeaders();alert(tmp);
    tmp = tmp.split('\n');
    tmp = array_filter(tmp, function (value) { return value.substring(1) != ''; });
    headers = [req.status + ' ' + req.statusText];
 
    for (i in tmp) {
        if (format) {
            pair = tmp[i].split(':');
            headers[pair.splice(0, 1)] = pair.join(':').substring(1);
        } else {
            headers[headers.length] = tmp[i];
        }
    }

    return headers;
}
```
About the Opera problem, I don't know how to fix it. In my tests, Opera 9.62 returned a empty string in statusText property and getAllResponseHeaders() function - only status property returned as expected. Both Firefox 3 and IE 7 worked perfectly. :)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-10 16:46:24  
@ Paulo Ricardo F. Santos: hehe, no problem! Thanks for giving the final function complete though, makes my job a little easier :)
---------------------------------------
*[Joey]()* on 2010-11-21 15:27:04  
I have a problem whit the http header the page give 303 see other, but i need the headers of tha page! But the function don't show how to fix.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-11-22 07:25:13  
@Joey: Due to security restrictions in JavaScript, this function can only work if the script you are trying to get is on the same domain (or if the site you are targeting is granting HTML5 CORS access and browsers support it).
---------------------------------------
*[T.Wild]()* on 2012-01-27 18:03:15  
This should be marked as having a dependency on array_filter (line 23) or be recoded.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-16 06:52:05  
@T.Wild: Forgot to let you know the dependency line was added. Thanks!
---------------------------------------
