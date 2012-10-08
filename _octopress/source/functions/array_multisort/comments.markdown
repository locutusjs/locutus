*[Jason B](http://jasonbutz.info)* on 2011-09-09 23:11:02  
A warning to people: If you are using this to sort an associative array/object your results will be inconsistent between Chrome and Firefox. I didn't compare these two with IE.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-09-10 10:49:01  
@Jason B: Yes, sorry but with the fact that newer browsers on the scene disregarded the Firefox convention of preserving object iteration order (it's only implementation-dependent per the ECMAScript spec)--and since IE hadn't supported it with perfect fidelity anyways (if you ever deleted properties anyways), we have started adding an option to the array functions to use a more awkward construction to build associative arrays ("{key1:value1}, {key2:value2}, ..."), but it has not been fully deployed. See the array() source code for the PHPJS_Array class begun to offer this support. I've unfortunately been too busy to do much documentation or expansion of it.
---------------------------------------
*[????? ????? ????](http://an3m1.com/)* on 2012-04-11 15:37:16  
This is a very informative article. I was looking for these things and here I found it. I am doing a project and this information is very useful me. Some things in here I have not thought about before
 
---------------------------------------
