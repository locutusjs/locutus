*[pwoul]()* on 2009-05-09 13:25:38  
Hi, first i'd like to thank you for this very nice function.
But (there's always one :D) i have a problem using it :

```
var result = "";
var alea = array_rand(["a","b","c","d","e","f","g","h"], 8);
for(var i in alea)
	{
	result = result + tableau[i];
	}
```

This code always returns the string "abcdefgh", the order of the characters isn't random :/

Thanks for your help :)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-09 23:18:59  
@pwoul, You are referencing an array/object called "tableau" instead of the one you randomized, "alea". Change it to "alea" (if that's what you want), and the number will vary... best wishes, Brett
---------------------------------------
*[pwoul]()* on 2009-05-10 03:30:30  
thanks a lot, that's working now :)
(here's the code if someone needs it)

```
var result = "";
alea = array_rand(["a","b","c","d","e","f","g","h"], 8);
for(var i in alea)
	{
	var kikoo = alea[i];
	result = result + tableau[kikoo];
	}
```
---------------------------------------
*[Taai]()* on 2011-02-08 10:58:52  
I improved this code.

```
function array_rand(input, num_req) {
	var input_len, rand, indexes = [], ticks = num_req || 1;
	
	if (input instanceof Array === false || ticks > (input_len = input.length)) {
		return null;
	}
		
	while (indexes.length != ticks) {
		rand = Math.floor(Math.random() * input_len);
		
		if (indexes.indexOf(rand) == -1) {
			indexes.push(rand);
		}
	}
	
	return ticks == 1 ? indexes[0] : indexes;
}
```


Some (older) browsers doesn't support Array.indexOf function, so, here is a code (wich I also improved) for those older browsers (add this code at least before array_rand):

```
if (!Array.indexOf) {
	Array.prototype.indexOf = function(obj) {
		var i = 0, l = this.length;
		for (; l--; i++) if (this[i] == obj) return i;
		return -1;
	}
}
```


Have fun!
---------------------------------------
*[Eugen](http://bi3.biz)* on 2011-04-21 23:23:19  
one example here http://javascript.about.com/library/blsort2.htm
---------------------------------------
*[????? ???????](http://an3m1.com/)* on 2012-04-10 09:55:00  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas 
---------------------------------------
