*[Shannon]()* on 2010-02-12 21:17:39  
Am I doing some thing wrong? Using your example I get the following:
```<script>
var arr1 = {'color': {'favorite': 'red'}, 0: 5},
    arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}};
result = array_merge_recursive(arr1, arr2);
// result = {0:10,color:{0:blue,favorite:green}}
</script>```

I downloaded the full package so I should have all the dependencies. 
---------------------------------------
*[Shannon]()* on 2010-02-12 21:23:36  
Sorry I included the script tags without thinking.

```
var arr1 = {'color': {'favorite': 'red'}, 0: 5}, arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}};
result = array_merge_recursive(arr1, arr2);
// result = {0:10,'color':{0:'blue','favorite':'green'}}
---------------------------------------
*[????? ????](http://an3m1.com/)* on 2012-04-10 09:55:43  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas 
---------------------------------------
*[Demosthenes Koptsis]()* on 2012-07-16 18:07:20  
There is a bug i think.
```
arr1 = {'color': {'favourite': 'read'}, 0: 5};
arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}};

Result = {0=10, 'color':{'favourite': 'read', 'favorite':'green', 0='blue'}}
```
value: 5 is lost!
---------------------------------------
*[Demosthenes Koptsis]()* on 2012-07-17 23:34:20  
This code overwrite keys with the same index. Does not preserve these values. Value 5 has key 0 same with value 10. The result is  the value 10 overwrites 5.
---------------------------------------
