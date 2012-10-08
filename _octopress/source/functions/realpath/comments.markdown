*[cuisdy]()* on 2009-10-19 00:49:14  
Hi there, thanks for that script.

However, I was looking for a path resolver that would return a relative path resolved, not an absolute path resolved. I decided to do one myself and it works for me (though I haven't tested über weird inputs, so it's up for testing and improvements). Just in case someone wants it, here it is:

(hope it posts the code nicely formatted hehe)

```
function resolvePath( sPath ){
	
	sPath = sPath.replace(/\\/g,'/');		// Linux compatible
	sPath = sPath.replace(/\/\//g,'/');		// Fix double bars
	var aPathParts = sPath.split('/');		// Get parts of the path
	
	for( var i=0, letsStart, sPart ; sPart = aPathParts[i] ; i++ ){
		if( sPart != '..'  ){
			letsGo = true;
			continue;
		};
		if( letsStart && sPart == '..' ){
			aPathParts.splice((i-1),2);
			i=i-2;
		}
	};
	
	return aPathParts.join('/');
	
};
```

Does PHP have a function like this, by the way?
---------------------------------------
*[cuisdy]()* on 2009-10-19 00:52:43  
No laughing at me, please... 

Where it said "letsGo" it should say "letsStart". It's just the most silly variable name I could come up with, I know.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-25 14:01:50  
@ cuisdy: We only port actual PHP functions, but given the amount of visitors coming here, I'm sure someone will run into your function and find it useful. So thanks for the code! 
---------------------------------------
*[SoutlinK](http://www.halospain.com)* on 2010-07-27 01:03:00  
This funcion contains an error.

If you are using hash, with slash '/' it will brokes

Example

```
window.location.href = 'http://localhost/phpbb3/foros/index.php#/phpbb3/foros/viewforum.php?f=2'


var relativepath = './viewforum.php?f=2';
console.log(realpath(href));
```

Will output http://localhost/phpbb3/foros/index.php#/phpbb3/foros/viewforum.php?f=2

I thinks its a big error ;)

FIX

```
var r = this.window.location.href;
if (r.indexOf('#') != -1)
{
r.substring(0,r.indexOf('#'));
}
```
---------------------------------------
*[SoutlinK](http://www.halospain.com)* on 2010-07-27 01:12:30  
Ups I made a Mistake in fix

```
if (r.indexOf('#') != -1)
	{
		r = r.substring(0,r.indexOf('#'));
	}
```

---------------------------------------
*[friv 4 school](http://www.friv4.us/)* on 2012-02-22 03:12:03  
Nice share. Thanks a lots.
---------------------------------------
*[cutegirl](http://www.kizi.5ire.com/)* on 2012-06-12 05:43:22  
Nice share info <a href="http://www.kizi.5ire.com/>Kizi</a>
---------------------------------------
*[Kizi](http://kizi.5ire.com/)* on 2012-06-14 04:12:05  
Thank your share info!
---------------------------------------
*[Friv](http://www.friv.name)* on 2012-07-05 05:49:50  
Thanks for sharing.
I was found this coding.
---------------------------------------
*[Gazo games](http://www.gazogames.in/)* on 2012-07-19 05:02:13  
JavaScript is very important in making situation it helps programmers create web pages to help users easily share .. thank you ...!
---------------------------------------
*[Friv](http://www.frivteen.com/)* on 2012-07-20 02:58:47  
Thanks for share code
---------------------------------------
*[Huz](http://www.huz.name/)* on 2012-07-20 03:01:46  
thanks a lot, this code i was found.
---------------------------------------
*[Game gazo](http://www.gamegazo.com/)* on 2012-07-22 10:42:15  
thanks for share this code
---------------------------------------
*[Bored](http://www.boredgames.name/)* on 2012-08-03 10:13:42  
Nice share info.Thanks you..!
---------------------------------------
