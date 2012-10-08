*[Ian]()* on 2011-05-27 13:37:16  
it darn crashes the fucking rest of most javascript finctions
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-05-28 04:04:58  
@Ian: Would you mind clarifying how or why? I don't see anything wrong with this function that would cause compilation problems if that's what you mean. Anyways, the site lets you make your own package...
---------------------------------------
*[Robert Eisele](http://www.xarg.org/)* on 2011-09-03 13:25:56  
I optimized the function in order to perform much faster than the original:

```
function tanh(x) {

	var t = Math.exp(2 * x);
	return (t - 1) / (t + 1);
}
```
---------------------------------------
