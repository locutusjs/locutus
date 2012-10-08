*[Mike]()* on 2012-06-18 15:25:11  
I found bug with count of parameters for this function. So if we set over than 2 arguments - function returns empty object.
You can test own example with colors on this page. 

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-21 21:01:12  
@Mike: Are you talking about this example?

```$array1 = {'a' : 'green', 0:'red', 1: 'blue'};
$array2 = {'b' : 'green', 0:'yellow', 1:'red'};
$array3 = ['green', 'red'];
$result = array_intersect($array1, $array2, $array3);
```

What do you get if you add this to iterate over the properties?

```
for (var i in $result) {
  alert(i+'::'+$result[i])
}```

What browser are you using? I am seeing the alert() in the code above run twice with the given example as it should--i.e., it is not empty.
---------------------------------------
