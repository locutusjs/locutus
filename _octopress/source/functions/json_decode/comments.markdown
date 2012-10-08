*[T.J. Leahy]()* on 2009-06-17 06:04:03  
This function should check to see if the browser has native JSON decoding first (IE8, FF 3.5) and use that when available.  Would make it faster and safer then running the input against multiple regular expressions. See http://hacks.mozilla.org/2009/06/security-performance-native-json/

```
if (typeof JSON == "object" && typeof JSON.parse == "function") {
    return JSON.parse(str_json);
}
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-18 06:53:48  
Fixed in SVN. Thanks for the report!

FYI, if you reference a variable like JSON and it doesn't exist, it will cause a failure in JS, so we have to either enclose such a reference in a try-catch block (ugly) or reference it as a property of the window object--since referencing an undefined property does not give an error in JS. 

As far as why I used "this.window" ("window" would be fine for most environments), it is because this will both refer to:

1) the window object in the non-namespaced version (it resolves to "window.window" which, in JS, thankfully for our needs, happens to be a recursive reference to window), and 
2) the window attached to the object itself in the namespaced version (our namespaced version allows for the window to be set to a value other than the global "window" object for environments like JavaScript modules in Firefox extensions where 'window' is not available as a global but is passed in during object construction, and should automatically set it to the window global otherwise).
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-06-18 14:17:44  
@ T.J. Leahy + Brett Zamir: Awesome!
---------------------------------------
*[Michael White](http://getsprink.com/)* on 2009-10-18 02:34:40  
The part that uses native browser JSON objects should be contained in a try/catch block and return the proper value in accordance with how PHP handles bad JSON data.

```
try {
    return json.parse(str_json);
}
catch(err) {
    return str_json;
}

```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-18 07:18:08  
@Michael: Thanks, but is that really how PHP handles it? the docs for json_decode say "NULL is returned if the json cannot be decoded or if the encoded data is deeper than the recursion limit." Would be nice if someone could check for all possible json.parse/json.stringify errors (and the rest of the function when these are not available) to check for the type of errors also recorded by json_last_error (and to add a property to the "this.php_js" global so that json_last_error() can retrieve this info). Ditto for json_encode().
---------------------------------------
*[Michael White](http://getsprink.com/)* on 2009-10-20 03:01:11  
@kevin Hey - sorry. that's my fault. It should indeed return NULL if there's an error. My main point was that we should use the try/catch to prevent exceptions from causing the JS to just stop unexpectedly.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-25 13:49:22  
Yeah we need to look into this. Could be much better but I don't have enough time to work it myself right now. Maybe someone else reading this can have a go at it?
Would be much appreciated!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-25 14:08:36  
@ Michael White: Just now saw your comment on json_encode & implemented the fixes!

http://github.com/kvz/phpjs/commit/cae72555c08c11ec416f1c8ecfcd5e42509cb46d
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-26 00:48:57  
Have made a fix (NULL to null) and added support for json_last_error(); see commits at http://github.com/kvz/phpjs/commits/master/
---------------------------------------
*[Anes]()* on 2010-12-15 10:46:19  
Hi pals ,
I am really stuck in parsing a JSON string and take it's values. I got the json string as 
{"user":{"id":"1","firstname":"Freelogin","created":"0000-00-00
00:00:00","lastname":"Administrator","email":"fred@websecurify.com",
"usergroup_id":"1","status":"1","ip_enable":"N","priv":"0","expire":""},"data":{
"1":{"5":{"last_update":"2010-12-13
16:16:16","status":"0"},"3":{"last_update":"2010-12-13
16:41:48","status":"1"}},"2":{"6":{"last_update":"2010-12-13
16:41:48","status":"1"}}},"server_array":[{"id":"1","name":"anes.yyy.net"},{
"id":"2","name":"neseema.xxx.net"}],"service_array":[{"id":"5","name":"POP3"},
{"id":"6","name":"Cpanel"},{"id":"3","name":"SMTP"}],"sort_by":"servername",
"sort_order":"ASC","pagelinks":"","totrows":"2","offset":"0","limitvalue":"10",
"rows_monitor":2,"current":"monitor","uri":false}

Friends How to Parse this and take the Results for further
processing in javascript.... I am waiting to hear from you
Soon..

Regards
Anes P.A


---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-12-15 15:16:38  
@Anes: First make sure you don't have line breaks when you make the string. When I tried pasting your string now, it was broken into separate lines which will not work in JS. If that is fixed, then you can just use it like this:
```
var obj = json_decode('{"user":"test"}');
alert(obj.user); // 'test'
```
---------------------------------------
*[Miguel Espinoza](it4fox.com)* on 2011-06-05 04:02:27  
I ran into a situation today with Firefox 3.6.17 (didnt test with other browsers) and Firebug 1.7.1 where "this.window" was not recognized, it came from a pseudo pop up (div), I fixed this by editing line 20 from:
```
var json = this.window.JSON;
```
to:
```
var json = (typeof this.window != 'undefined' ? this.window.JSON : undefined);
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-06-05 18:16:58  
@Miguel: Could you offer your code or a snippet thereof by any chance? I really understood our namespaced version was including this.window, and that in the non-namespaced version, window.window (this.window) was recursively self-referential.
---------------------------------------
*[Pavel Kukov]()* on 2012-04-04 16:16:04  
On line: #68: eval is evil fix
```
j=new Function('return '+text); return j();
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-04-05 02:40:47  
@Pavel: 
1) Function() suffers from the same problem as eval(). So does the first argument to setTimeout or setInterval when set to a string.
2) The function comments mention that the regular expressions are already ensuring that the characters in the expression are safe for evaluation. We could use a genuine parser, as I believe exist at json.org , but I'm not sure that there is anything wrong as long as the regex we are using is fail-safe (except that a real parser should be able to give better reporting of errors).
---------------------------------------
*[Pavel Kukov]()* on 2012-04-05 20:30:28  
 •eval() evaluates a string as a JavaScript expression within the current execution scope and can affect local variables.
 •new Function() parses the JavaScript code stored in a string into a function object, which can then be called. It cannot affect local variables because the code runs in a separate scope.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-04-06 02:47:13  
@Pavel: Ok, good point, but it still suffers from the ability to set globals. So while it may be a little safer, it still doesn't solve the root problem of complete encapsulation, though if the regex are working, eval() will be equally safe. I suggest this be refactored to use a real parser if we're going to do anything about it.
---------------------------------------
