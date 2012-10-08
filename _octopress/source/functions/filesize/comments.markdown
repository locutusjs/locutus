*[Onno Marsman]()* on 2008-11-14 12:17:52  
What if the &quot;Content-Length&quot; header does not exist?

Furthermore: it's really weird to use these types of functions. Making an Ajax request which executes the filesize function server-side would be many times better. But the same goes for something like file_get_contents and this has pointed out before. I really think that in the future these types of functions (along with functions like sleep, which also nobody should use) should not remain in the main download of php.js, but optionally available.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-14 14:17:53  
@ Onno Marsman: I've made it return false if it doesn't. We've had this discussion before indeed. I know how you feel about this, and you know I agree but these functions serve a purpose of their own. We'll make sure they'll not be included by default with our future compiler. Thanks for your input Onno.
---------------------------------------
*[Onno Marsman]()* on 2008-11-14 16:21:05  
K thnx, I will not bother you with it again ;)
I hope that compiler will soon be available.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-14 21:23:17  
@ Onno Marsman: Haha, that's ok Onno! appreciated. And about the compiler... Man I'm so busy :| Will try to dedicate more time to it.
---------------------------------------
*[Jani Hartikainen](http://codeutopia.net/)* on 2008-11-17 09:12:53  
While the whole method is a bit dubious (as pointed out by Onno Marsman), it might be a general improvement to check for window.XMLHttpRequest, rather than relying on error catching. To my understanding, catching exceptions (errors?) is slow.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-18 12:23:38  
Jani Hartikainen: Fair enough!
---------------------------------------
*[Arcanis](http://www.arcanis.fr)* on 2008-12-07 19:30:51  
I think it's stupid to return false when there is no content-length, and to return an error when there is no XHR.
Both of them are errors, no ? I think you must send an error if the content-length is not specified.
---------------------------------------
*[T.Wild]()* on 2008-12-08 13:35:55  
@Arcanis
While it may be stupid not to throw an error when the content length header isn't sent; when JavaScript throws an error the script halts, just try this:
```
throw new Error('error1');
alert(&quot;FOO&quot;); //This is not called
```
You don't want your entire script to halt simply because the server fails to send the correct headers which isn't a client side error.
However the XHR is different it is an error on the client side and does warrant an error, but even then I'd rather it return false rather than throw an error since PHP returns false on any error, not halt your script.
Maybe this would work?
```
//This allows the error to be thrown while still returning false;
try{
     throw new Error('error1');
}catch(e){
    return false;
}

//In this case the error is still thrown AND the alert is called;
try{
     throw new Error('error1');
}catch(e){};
alert(&quot;FOO&quot;);
```
I know I may not be clear on what I'm saying but I hope you see what I'm getting at.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-10 17:33:31  
@ Arcanis &amp; T. Wild: Thanks for your input guys. T.Wild, I've implemented your suggestion and am curious what people will say about this approach. If the responses are good we might implement it in other cases as well.
---------------------------------------
*[Dorian](none)* on 2010-10-07 19:16:40  
i have a problem for use this function on Internet Explorer, missing:

Object doesn't support this property or method

in this line: 
```if (!req.getResponseHeader)```

broken and not continue.

¿what is the solution for this problem?

---------------------------------------
*[Prast](http://f-code.web.id)* on 2011-08-26 09:49:35  
how about error in internet explorer as Dorian mentioned before? 
---------------------------------------
