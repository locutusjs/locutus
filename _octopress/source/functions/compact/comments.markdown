*[Karol Kowalski]()* on 2008-02-06 15:04:39  
This version is not recursive as it should be acc to the php manual. Try run following example (taken from the manual, too):

```
var city  = &quot;San Francisco&quot;;
var state = &quot;CA&quot;;
var event = &quot;SIGGRAPH&quot;;

var location_vars = new Array(&quot;city&quot;, &quot;state&quot;);

var result = compact(&quot;event&quot;, &quot;nothing_here&quot;, &quot;location_vars&quot;);

console.log(result)
```

What you get is an object with event property and location_vars property which is an Array. What should be returned is a 'flat' object with event, city and state properties (because location_vars) should be searched inside.
---------------------------------------
*[Brett Zamir]()* on 2008-12-03 17:53:53  
Again, adapting the PHP manual's examples, here is an equivalent for extract():

```var size = &quot;large&quot;;
var var_array = {&quot;color&quot; : &quot;blue&quot;,
                   &quot;size&quot; : &quot;medium&quot;,
                   &quot;shape&quot; : &quot;sphere&quot;};
extract(var_array, 'EXTR_PREFIX_SAME', &quot;wddx&quot;);

alert([color, size, shape, wddx_size].join()); // blue,large,sphere,medium```


```// Only works on global variables

function extract (arr, type, prefix) {
    for (var i in arr) {
        switch (type) {
            case 'EXTR_PREFIX_SAME' || 2:
                if (window[i] !== undefined) {
                   window[prefix+'_'+i] = arr[i];
               }
               // Fall-through
            case 'EXTR_SKIP' || 1:
               if (window[i] === undefined) {
                   window[i] = arr[i];
               }
               break;
            case 'EXTR_PREFIX_ALL' || 3:
               window[prefix+'_'+i] = arr[i];
               break;
            case 'EXTR_PREFIX_INVALID' || 4:
               if(i.match(/^[_a-zA-Z$][\w|$]*$/) != null) { // Refine regexp to allow JS 1.5+ Unicode identifiers
                   window[i] = arr[i];
               }
               else {
                   window[prefix+'_'+i] = arr[i];
               }
               break;
            case 'EXTR_IF_EXISTS' || 6:
               if (window[i] !== undefined) {
                   window[i] = arr[i];
               }
               break;
            case 'EXTR_PREFIX_IF_EXISTS' || 5:
               if (window[i] !== undefined) {
                   window[prefix+'_'+i] = arr[i];
               }
               break;
            case 'EXTR_REFS' || 256:
               throw 'The EXTR_REFS type will not work in JavaScript';
               break;
            case 'EXTR_OVERWRITE' || 0:
                // Fall-through
            default:
                window[i] = arr[i];
                break;
          }
    }
}```
---------------------------------------
*[??????? ????? ???](http://an3m1.com/)* on 2012-04-17 15:28:17  
They have done such a great job with this. This is why they are deserving of these awards. Keep up the good work. 

---------------------------------------
