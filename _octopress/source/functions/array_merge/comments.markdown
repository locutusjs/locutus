*[Nate]()* on 2008-11-19 06:14:33  
Neither &quot;ct&quot; nor &quot;retArr&quot; are declared with &quot;val&quot;, and therefore create unnecessary global variables.  I suggest that &quot;retArr&quot; be declared at the top and &quot;ct&quot; be declared after the code:
```
    if (retArr) {
        return args;
    }
```
The reason for this is because the function sometimes finishes before ever reaching the part that uses &quot;ct&quot;, and therefore, it could waste a slight amount of time declaring a variable that it didn't end up using.  The same is also true for &quot;retObj&quot;, &quot;k&quot;, and &quot;j&quot;.  But it's just a suggestion.
---------------------------------------
*[Subhasis Deb](http://weread.com)* on 2008-11-25 09:08:09  
Following is my version of array_merge (compact):

	/***
	 * Simulate php array_merge function
	 * 
	 * @param {Object/Array} arr1
	 * @param {Object/Array} arr2
	 * 	var a1 = {'aa':100, 'bb':2, 'cc':[6,7], 'dd':[12,13], 'ee':{'15':15,'16':16}};
	 *  var b1 = {'xx':101, 'bb':5, 'cc':8, 'dd':[14,15], 'ee':{'17':17,'18':18}};
	 *  var c = array_merge(a1, b1);
	 *  console.log(c) [in firebug]
	 *  Output: {'aa':100, 'bb': 5, 'cc':[6,7], 'dd':[12,13,14,15], 'ee':{'15':15,'16':16,'17':17,'18':18}, 'xx':101}		
	 */
	array_merge : function(arr1, arr2){
		if((arr1 &amp;&amp; (arr1 instanceof Array)) &amp;&amp; (arr2 &amp;&amp; (arr2 instanceof Array))){
			for (var idx in arr2) {
				arr1.push(arr2[idx]);
			}
		}else if((arr1 &amp;&amp; (arr1 instanceof Object)) &amp;&amp; (arr2 &amp;&amp; (arr2 instanceof Object))){
			for(var idx in arr2){
				if(idx in arr1){
					if (typeof arr1[idx] == 'object' &amp;&amp; typeof arr2 == 'object') {
						arr1[idx] = array_merge(arr1[idx], arr2[idx]);
					}else{
						arr1[idx] = arr2[idx];
					}
				}else{
					arr1[idx] = arr2[idx];
				}
			}
		}
		return arr1;
	},
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-25 17:07:03  
@ Nate: Thanks dude!
@ Subhasis Deb: Could you please tell us how your function would be the better implementation?
---------------------------------------
*[Subhasis](http://weread.com)* on 2008-12-01 00:15:40  
@Kevin,
actually its not the &quot;array_merge&quot; function but rather the &quot;array_merge_recursive&quot; function.. it can accept nested array/object which it will merge recursively... one 
point to walk over is it gives preference to array object.. so it wont overwrite array/objects if the master array has it... e.g 'cc':[6,8], 'cc':8;  o/p: [6,8]..

------------------------------------------
Subhasis
http://weread.com
---------------------------------------
*[Matheus]()* on 2009-09-26 15:03:01  
This funcion don't work. It's returning [object Object]
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-09-27 01:20:46  
@Matheus : That probably just means that the function is returning an object and you are trying to view it as a string (like in an alert). Why does the function return an object? In order to allow for associative arrays, we must use objects in such cases (though this function tries to return a bona fide array if possible).
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-08 21:03:45  
@ Subhasis: But don't we already have an array_merge_recursive function?
---------------------------------------
*[josh]()* on 2010-03-26 19:19:09  
this doesn't return the expected values...

arr1 = Array('zero','one','two','three');
arr2 = Array(4,5,6,7);
arr3 = array_merge(arr1,arr2);

php does this:

arr3: Array
(
	[0] => zero
	[1] => one
	[2] => two
	[3] => three
	[4] => 4
	[5] => 5
	[6] => 6
	[7] => 7
)



while js function does this:

0:
	0: zero
	1: one
	2: two
	3: three
1:
	0: 4
	1: 5
	2: 6
	3: 7


i can put two arrays into a bigger array in regular javascript...  9_9
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-03-26 21:09:06  
@josh: Thanks for pointing out the bug. Fixed in git: http://github.com/kvz/phpjs/raw/master/functions/array/array_merge.js . The code had problems when all arrays were input, but also with numeric renumbering. Sorry for the trouble on that one, but it should be working now.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-03-26 21:12:18  
@josh: And, btw, if you are only dealing with simple numeric arrays, to do that in simple JS style, just do 

```var arr3 = arr1.concat(arr2);```

See also https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/concat
---------------------------------------
