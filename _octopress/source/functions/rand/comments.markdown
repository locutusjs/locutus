*[taith](divinedesigns.ca)* on 2009-02-01 14:01:09  
```
function range(start, stop, step) {
 if (!arguments.length) return [];
 var min, max, step;
 if (arguments.length == 1) {
  min = 0;
  max = arguments[0]-1;
  step = 1;
 }else{
  min = arguments[0];
  max = arguments[1];
  step = arguments[2] || 1;
 }
 if (step &lt; 0 &amp;&amp; min &gt;= max) {
  step *= -1;
  var tmp = min;
  min = max;
  max = tmp;
  min += ((max-min) % step);
 }
 var a = [];
 for (var i = min; i &lt;= max; i += step) a[i] = i;
 return a;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-01 23:14:36  
@ taith: Sorry I don't have a lot of time to really dig in the sources. It would be great if your could explain what makes your implementation better than the one provided by Waldo?
---------------------------------------
*[rtretretetert]()* on 2010-04-12 10:26:52  
th
---------------------------------------
*[test]()* on 2010-11-04 19:46:43  
```
your_stuff('here');
```
---------------------------------------
*[Nathan]()* on 2011-05-09 18:05:28  
The code given here does not support negatives or floats, nor does it support an input of max,min instead of min,max. All of which the PHP version does support.

I made some minor tweaks to get proper support for those "features", not that I am not a JS pro and there is probably a better way to go about this.

```function rand (min, max) {
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
	
	if (min > max) { var mint = min; min = max; max = mint; }
	
	var result = Math.random() * (max + Math.abs(min) + 1) - Math.abs(min);
	
	if (Math.round(min) == min || Math.round(max) == max)
		return Math.floor(result);
	else
		return result;
}```
---------------------------------------
*[Nathan]()* on 2011-05-09 18:14:40  
Sorry, the correct code would be 

```function rand (min, max) {
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
	
	if (min > max) { var mint = min; min = max; max = mint; }
	
	if (min >= 0)
		return Math.floor(Math.random() * (max - min + 1)) + min;
	else {
		var result = Math.random() * (max + Math.abs(min) + 1) - Math.abs(min);
		
		if (Math.round(min) == min || Math.round(max) == max)
			return Math.floor(result);
		else
			return result;
	}
}```

Only use new code if min is negative.
---------------------------------------
