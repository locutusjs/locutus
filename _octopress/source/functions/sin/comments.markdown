*[Kambfhase]()* on 2010-01-14 00:00:36  
Instead of creating an extra function I recommend

```
var sin = Math.sin;
```

mfG Hase
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-14 00:16:09  
@Kambfhase, Good point. That would be a nice optimization to add to the compiler at some point. In the case of the namespaced version, it could similarly be assigned directly on the prototype (as with a number of the other Math methods).
---------------------------------------
