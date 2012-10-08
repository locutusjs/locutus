*[Brett Zamir](http://bahai-library.com)* on 2009-01-16 11:52:56  
Here's sort(), rsort(), and usort() which now support objects (though no additions of sorting types for sort() or rsort()):

```function sort (inputArr, sort_flags) {
    var valArr = [], keyArr=[];
    for (var k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        delete inputArr[k] ;
    }

    var sorter = false;
    
    // For now only SORT_NUMERIC has a custom sorter
    // and SORT_REGULAR, SORT_STRING, and SORT_LOCALE_STRING
    // are all handled with the default sorter 
    if (sort_flags === 'SORT_NUMERIC') {
        sorter = function (a, b) {
            return(a - b);
        };
    }
    if (sorter !== false) {
        valArr.sort(sorter);
    } else {
        valArr.sort();
    }

    for (i=0; i &lt; valArr.length; i++) { // Repopulate the old array
        inputArr[i] = valArr[i];
    }
    return true;
}
$fruits = {&quot;d&quot; : &quot;lemon&quot;, &quot;a&quot; : &quot;orange&quot;, &quot;b&quot; : &quot;banana&quot;, &quot;c&quot; : &quot;apple&quot;};
sort($fruits);

var $output = '';
for (var $key in $fruits) {
    $val = $fruits[$key];
    $output += $key+' = '+$val+&quot;\n&quot;;
}
alert($output);
/*
0 = apple
1 = banana
2 = lemon
3 = orange
*/```

```
function rsort (inputArr, sort_flags) {
    var valArr = [], keyArr=[];
    for (var k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        delete inputArr[k] ;
    }

    var sorter = false;
    
    // For now only SORT_NUMERIC has a custom sorter
    // and SORT_REGULAR, SORT_STRING, and SORT_LOCALE_STRING
    // are all handled with the default sorter 
    if (sort_flags === 'SORT_NUMERIC') {
        sorter = function (a, b) {
            return(b - a);
        };
    }
    if (sorter !== false) {
        valArr.sort(sorter);
    } else {
        valArr.sort();
        valArr.reverse();
    }

    for (i=0; i &lt; valArr.length; i++) { // Repopulate the old array
        inputArr[i] = valArr[i];
    }
    return true;
}
$fruits = {&quot;d&quot; : &quot;lemon&quot;, &quot;a&quot; : &quot;orange&quot;, &quot;b&quot; : &quot;banana&quot;, &quot;c&quot; : &quot;apple&quot;};
//$fruits = [&quot;lemon&quot;, &quot;orange&quot;, &quot;banana&quot;, &quot;apple&quot;];
// $fruits = {&quot;d&quot; : &quot;3&quot;, &quot;a&quot; : &quot;1&quot;, &quot;b&quot; : &quot;11&quot;, &quot;c&quot; : &quot;4&quot;};
rsort($fruits);
// rsort($fruits, 'SORT_NUMERIC');

var $output = '';
for (var $key in $fruits) {
    $val = $fruits[$key];
    $output += $key+' = '+$val+&quot;\n&quot;;
}
alert($output);
/* 
0 = orange
1 = lemon
2 = banana
3 = apple
*/```


```function sort (inputArr, sorter) {
    var valArr = [], keyArr=[];
    for (var k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        delete inputArr[k] ;
    }
    try {
        valArr.sort(sorter);
    } catch (e) {
        return false;
    }
    for (i=0; i &lt; valArr.length; i++) { // Repopulate the old array
        inputArr[i] = valArr[i];
    }
    return true;
}

$stuff = {&quot;d&quot; : &quot;3&quot;, &quot;a&quot; : &quot;1&quot;, &quot;b&quot; : &quot;11&quot;, &quot;c&quot; : &quot;4&quot;};
sort($stuff, function (a, b) {
            return(a-b);
});

var $output = '';
for (var $key in $stuff) {
    $val = $stuff[$key];
    $output += $key+' = '+$val+&quot;\n&quot;;
}
alert($output);
/*
0 = 1
1 = 3
2 = 4
3 = 11
*/
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-16 11:54:44  
Sorry, forgot to rename the last one to usort()!
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-16 13:05:41  
Actually, please just use this one for usort() instead, as I needed to allow the callback as string. There's also another array implementation: uasort().

```function usort (inputArr, sorter) {
    if (typeof sorter === 'string') {
        sorter = this[sorter];
    }
    else if (sorter instanceof Array) {
        sorter = this[sorter[0]][sorter[1]];
    }
    var valArr = [], keyArr=[];
    for (var k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        delete inputArr[k] ;
    }
    try {
        valArr.sort(sorter);
    } catch (e) {
        return false;
    }
    for (i=0; i &lt; valArr.length; i++) { // Repopulate the old array
        inputArr[i] = valArr[i];
    }
    return true;
}
 
$stuff = {&quot;d&quot; : &quot;3&quot;, &quot;a&quot; : &quot;1&quot;, &quot;b&quot; : &quot;11&quot;, &quot;c&quot; : &quot;4&quot;};
usort($stuff, function (a, b) {
            return(a-b);
});
```


```function uasort (inputArr, sorter) {
    if (typeof sorter === 'string') {
        sorter = this[sorter];
    }
    else if (sorter instanceof Array) {
		sorter = this[sorter[0]][sorter[1]];
    }	
    var valArr = [], keyArr=[], tempKeyVal, tempValue, ret;

    var sorterNew = function (keyArr, valArr) {
		for (var i=valArr.length-2; i &gt;=0; i--) {
			for (var j=0; j &lt;= i; j++) {
				ret = sorter(valArr[j+1], valArr[j]);
				if (ret &lt; 0) {
					tempValue = valArr[j];
					valArr[j] = valArr[j+1];
					valArr[j+1] = tempValue;
					tempKeyVal = keyArr[j];
					keyArr[j] = keyArr[j+1];
					keyArr[j+1] = tempKeyVal;
				}
			}
		}
    }

    for (var k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k] ;
    }
    try {
        sorterNew(keyArr, valArr); // Sort our new temporary arrays
    }
    catch(e) {
        return false;
    }
    for (i=0; i &lt; valArr.length; i++) { // Repopulate the old array
        inputArr[keyArr[i]] = valArr[i];
    }
    return true;
}
 
$fruits = {&quot;d&quot; : &quot;lemon&quot;, &quot;a&quot; : &quot;orange&quot;, &quot;b&quot; : &quot;banana&quot;, &quot;c&quot; : &quot;apple&quot;};
uasort($fruits, function (a, b) {
  if (a &gt; b)
    return 1;
  if (a &lt; b)
    return -1;
  return 0;
});
var $output = '';
for (var $key in $fruits) {
    $val = $fruits[$key];
    $output += $key+' = '+$val+&quot;\n&quot;;
}
alert($output);

/*
c = apple
b = banana
d = lemon
a = orange
*/
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-16 13:10:05  
Grrrr. Sorry, the 'i' for loop (in sort(), rsort(), and usort() need to have 'var' added in front)--accidental globals...  Thx, Brett
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-16 23:48:30  
@ Brett Zamir: What a beautiful moment it  is, when I paste one of your functions, write a testcase, click on 'Play', and see:

```
Test result
===========================================================================
array/uasort.js                          results#1    OKAY 
```

That word 'OKAY' is like a little present :) You are awesome Brett.
---------------------------------------
*[????? ????????](http://an3m1.com/)* on 2012-04-04 14:32:54  
Great job here. I really enjoyed what you had to say. Keep going because you definitely bring a new voice to this subject. Not many people would say what you’ve said and still make it interesting


---------------------------------------
