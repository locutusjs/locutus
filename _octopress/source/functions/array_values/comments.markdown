*[Ates Goral]()* on 2008-01-22 05:08:02  
Here's array_count_values():

```
function array_count_values(array) {
    // *     example 1: array_count_values([ 3, 5, 3, &quot;foo&quot;, &quot;bar&quot;, &quot;foo&quot; ]);
    // *     returns 1: {3:2, 5:1, &quot;foo&quot;:2, &quot;bar&quot;:1}
    // *     example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: &quot;foo&quot;, p5: &quot;bar&quot;, p6: &quot;foo&quot; });
    // *     returns 2: {3:2, 5:1, &quot;foo&quot;:2, &quot;bar&quot;:1}
    // *     example 3: array_count_values([ true, 4.2, 42, &quot;fubar&quot; ]);
    // *     returns 3: {42:1, &quot;fubar&quot;:1}

    function countValue(value) {
        switch (typeof(value)) {
        case &quot;number&quot;:
            if (Math.floor(value) != value) {
                return;
            }
        case &quot;string&quot;:
            if (value in this) {
                ++this[value];
            } else {
                this[value] = 1;
            }
        }
    }
    
    var ret = new Object();
    
    if (array instanceof Array) {
        array.forEach(countValue, ret);
    } else if (array instanceof Object) {
        for (var key in array) {
            countValue.call(ret, array[key]);
        }
    }
    
    return ret;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-22 08:57:02  
@ Ates Goral: Great dude!
---------------------------------------
*[Surya Adi Sapoetra](www.namakusurya.com)* on 2010-05-30 03:39:41  
i really like phpjs.. thanks...
---------------------------------------
*[???? ????](http://an3m1.com/)* on 2012-03-22 13:54:45  
News and new recipes world famous in the world of Eve 
---------------------------------------
