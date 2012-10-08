*[Marques Johansson]()* on 2012-03-16 16:50:17  
```
str_getcsv("'one','two with escaped \' single quote', 'three, with, commas',",  ',', "'", '\\');
["one", "two with escaped ' single quote", "three, with, commas',"]
// The single quote + comma should not be included in the last part

 

```
---------------------------------------
*[Jason Butz](http://jasonbutz.info)* on 2012-06-13 23:43:29  
The following is not handled correctly.
```
str_getcsv('"0","Text 1",0,0,0,0,0,"Text2"');
```

It is parsed to
```
[
   '0',
   '"Text 1",0,0,0,0,0,"Text2"'
]
```

It should be

It is parsed to
```
[
   '0',
   'Text 1',
   '0',
   '0',
   '0',
   '0',
   '0',
   'Text2'
]
```

I am ignoring types, but I think you should get the idea. I'm not even I would consider types important.
---------------------------------------
