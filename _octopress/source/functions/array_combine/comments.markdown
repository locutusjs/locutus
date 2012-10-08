*[Fred P]()* on 2012-05-16 07:42:38  
You can fix line #21 permanently like this:

```
    var new_array = {},
         keycount = (keys && keys.length) || 0,
         i = 0;

then this will always work properly, 
since keycount does not have to be falsy 0, but REALLY zero.

    if (keycount !== values.length) {
        return false;
    }

```

---------------------------------------
