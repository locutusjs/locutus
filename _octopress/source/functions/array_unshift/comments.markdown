*[jmweb]()* on 2010-05-26 12:33:31  
Note that the array_unshift() implementation given here prepends the array arguments in the wrong order.

As an example:
```
var names=['van', 'Zonneveld'];
array_unshift(names,'Kevin','Tim')
// returns 4
//names is now ['Tim','Kevin','van', 'Zonneveld']
```

The function should be altered to:
```
function array_unshift(/* assumes at least 1 argument passed - the array */){
var i=arguments.length;
     while(--i!==0){
     arguments[0].unshift(arguments[i]);
    }
return arguments[0].length;
}
```

As an example:
```
var names=['van', 'Zonneveld'];
array_unshift(names,'Kevin','Tim')
// returns 4
//names is now ['Kevin','Tim','van', 'Zonneveld']
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-06-19 16:04:03  
@ jmweb: Thanks, fixed: https://github.com/kvz/phpjs/commit/fc87874f1823862ae2e4b006f9b4316401c65f33

---------------------------------------
