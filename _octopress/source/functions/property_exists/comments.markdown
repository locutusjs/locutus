*[Pete]()* on 2012-07-11 22:50:45  
I think checking if cls is 'undefined' is reasonable, and if it is, then the function should also return false.

```
if(typeof cls === 'undefined'){
   return false;
}
```
---------------------------------------
