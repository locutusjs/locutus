*[Lorenzo Pisani]()* on 2010-03-30 17:07:35  
this fails on some urls

in PHP I can do this:
```
parse_url('hello/world', PHP_URL_PATH) // gives me back hello/world
```

but I simply get /world back from php.js because it thinks hello is the host
---------------------------------------
*[radekk]()* on 2010-10-19 09:15:34  
You didn't mentioned that it's doesn't work correctly when you use variables like (in GET):

- scheme
- host
- user
- path
... and so on.

I think that parameters should be separated and enclosed in an second object to not collide with each other. That's my opinion.
---------------------------------------
*[Tony]()* on 2011-03-11 13:37:52  
This fails with a simple code like this :

var url = "page.html"

it shows that host is page.html
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-03-12 01:08:11  
@radekk: Can you clarify?
@Tony & @Lorenzo Pisani: Finally getting to this. The issue was simply that the loose mode had been chosen by default. This should probably work more like PHP now, and I also cleaned up the function a bit and allowed custom ini settings to change the parsing mode (e.g., "loose" mode (set by "phpjs.parse_url.mode") is more useful when trying to guess at a user's imperfect input, but faulty as you found out; "strict" follows the same as the default "php" mode, but offers more properties, including parsing the query string further).
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-03-12 01:09:31  
@Tony & @Lorenzo Pisani: Also, I should mention, the fix is available in Git (raw js source URL).
---------------------------------------
*[Aaron](ajgwin.com)* on 2011-03-25 22:30:19  
I've been using this script for two years.  I just switched to FF4 and it now fails.  Error: "regular expression too complex" fails here in firebug "var m = parser[mode].exec(str)," only on a web server.  Works fine locally.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-03-27 13:46:34  
@Aaron. Can you provide more details? I tried on Apache, and it works fine. Or did you mean you tried in SSJS? What regex and sample are you using? One thing you can try is replacing the various "()" marks used in the php mode regex with the equivalent but longer, "(.{0})". Maybe Firefox4's new regex parser doesn't properly handle "()" under some conditions. If that doesn't work, let me know if changing by default to "strict" or "loose" mode instead of "php" (see the code on line 25 with "|| 'php'").
---------------------------------------
*[????? ???](http://an3m1.com/)* on 2012-03-22 13:50:56  
New and exclusive news on the gate Yes 
---------------------------------------
*[Patrick](http://www.netzaffin.de)* on 2012-05-11 14:29:17  
Hey guys! parse url saved my day. That easy, that great. I will include phpjs in my projects <3 thank you
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-16 07:50:50  
@Patrick: Thanks for the feedback! Most of the credit goes to Steven Levithan: http://blog.stevenlevithan.com
---------------------------------------
