*[Abhijeet Bagul]()* on 2008-07-29 07:02:35  
Your all functions are nice...

It really helped me lot.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-14 02:55:24  
Hi,

I don't think that this function is working. The last line does not replace the array, since in JavaScript, as a whole object, the arrays (though their values are passed in by reference), are passed in by value (you cannot, for example, reassign or delete the passed-in array as a whole). 

You can confirm this with something like this:

```function changeArr (arr) {
    arr = [3, 2, 1];
}
var a = [1, 2, 3];
changeArr(a);
alert(a); // still 1, 2, 3```


However, you can delete and then rebuild its contents, modifying the function as such:

```function ksort(array, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: GeekFG (http://geekfg.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %          note: The examples are correct, this is a new way
    // *     example 1: data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}; 
    // *     example 1: ksort(data);
    // *     results 1: data == {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}
    // *     returns 1: true
    
    var tmp_arr = {}, keys = [], sorter = false;
    
    // For now only SORT_NUMERIC has a custom sorter
    // and SORT_REGULAR, SORT_STRING, and SORT_LOCALE_STRING
    // are all handled with the default sorter 
    if (sort_flags == 'SORT_NUMERIC') {
        sorter = function (a, b) {
            return(a - b);
        };
    }
    
    // Make a list of key names
    for (var key in array) { 
        keys.push(key);
    }
     
    // Sort key names
    try {
        if (sorter !== false) {
            keys.sort(sorter);
        } else {
            keys.sort();
        }
    }
    catch (e) {
        return false;
    }
    
    // Rebuild array with sorted key names
    for (var i = 0; i &lt; keys.length; i++) {
        key = keys[i];
        tmp_arr[key] = array[key]; 
        delete array[key];
    } 
    for (i in tmp_arr) {
        array[i] = tmp_arr[i]
    }
    return true; 
}```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-14 03:24:14  
I also used the same basic approach just mentioned in this asort() as well, but I needed a slightly different approach since I could not rely on values being unique, as keys were for ksort().

```function asort (inputArr) {
    function bubbleSort(keyArr, inputArr) {
        for (var i = inputArr.length-2; i &gt;= 0; i--) {
            for (var j=0; j &lt;= i; j++) {
                if (inputArr[j+1] &lt; inputArr[j]) {
                    var tempValue = inputArr[j];
                    inputArr[j] = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    var tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j+1];
                    keyArr[j+1] = tempKeyVal;
                }
            }
        }
    }
    var valArr = [], keyArr=[];
    for (var k in inputArr) { // Get key and value arrays
        valArr.push(inputArr[k]);
        keyArr.push(k);
        delete inputArr[k] ;
    }
    try {
        bubbleSort(keyArr, valArr); // Sort our new temporary arrays
    }
    catch(e) {
        return false;
    }
    for (i=0; i &lt; valArr.length; i++) { // Repopulate the old array
        inputArr[keyArr[i]] = valArr[i];
    }
    return true;
}
$fruits = {&quot;d&quot; : &quot;lemon&quot;,  &quot;a&quot; : &quot;orange&quot;, &quot;b&quot; : &quot;orange&quot;, &quot;c&quot; : &quot;orange&quot;};
asort($fruits); 
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
*[Brett Zamir](http://bahai-library.com)* on 2009-01-14 03:27:02  
Whoops, sorry the function just given works, but the example doesn't! (I was playing around with the values and forgot to switch back). The example section should be:

```$fruits = {&quot;d&quot; : &quot;lemon&quot;,  &quot;a&quot; : &quot;orange&quot;, &quot;b&quot; : &quot;banana&quot;, &quot;c&quot; : &quot;apple&quot;};
asort($fruits); 
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
*[Brett Zamir](http://bahai-library.com)* on 2009-01-14 03:40:31  
Lastly, while it looks like your other sort functions are fine, krsort() does need to be changed too. For that, you can use the ksort() I sent two posts before with the line &quot;keys.reverse();&quot; added after the try-catch block.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-14 04:03:14  
Sorry, I guess that wasn't all. You can also get arsort() by changing this line in asort():

```if (inputArr[j+1] &lt; inputArr[j]) {```

to

```if (inputArr[j+1] &gt; inputArr[j]) {```

And we can also trivially get usort() and uksort() by changing sort flags in the corresponding functions to callbacks (uasort() would not be as easy though, since my version presently depends on the sorter for internal uses as well):

```function usort( array, sorter ) {
    if (typeof sorter === 'string') {
        sorter = window[sorter];
    }
    if (sorter !== false) {
        array.sort(sorter);
    } else {
        array.sort();
    }   
    return true;
}
```

and

```function uksort(array, sorter) {
    if (typeof sorter === 'string') {
        sorter = window[sorter];
    }

    var tmp_arr = {}, keys = [];
        
    // Make a list of key names
    for (var key in array) { 
        keys.push(key);
    }
     
    // Sort key names
    try {
        if (sorter) {
            keys.sort(sorter);
        } else {
            keys.sort();
        }
    }
    catch (e) {
        return false;
    }
    
    // Rebuild array with sorted key names
    for (var i = 0; i &lt; keys.length; i++) {
        key = keys[i];
        tmp_arr[key] = array[key]; 
        delete array[key];
    } 
    for (i in tmp_arr) {
        array[i] = tmp_arr[i]
    }
    return true; 
}

var arr =  {&quot;d&quot; : &quot;lemon&quot;,  &quot;a&quot; : &quot;orange&quot;, &quot;b&quot; : &quot;banana&quot;, &quot;c&quot; : &quot;apple&quot;};
uksort(arr, function (a, b) {
            if (a &gt; b) return 1;
            if (b &lt; a) return -1;
            return 0;
        });
```

The only other array functions left (besides uasort() as mentioned above) now are natsort, natcasesort, and array_multisort. (Of course, we have to still support the flags on the existing ones, etc.)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-14 04:10:49  
Lastly for now (I hope), sort() and rsort() (and usort()) need to be changed along the lines of asort() (and uasort()) to allow object sorting...
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-14 11:55:24  
@ Brett Zamir: Added! You're on steroids or something? ;)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-18 04:21:16  
No, no steroids, but maybe the (healthy) mental equivalent... I was having come concentration problems, and my doctor had blood tests done which showed a borderline B12 deficiency. I started taking LIQUID vitamin B12 (16,666% percent of RDA!) and it has increased my mental endurance enormously. I've taken vitamin B6 in the past which very significantly helps my atrocious working/auditory memory, but I have to find the right balance, or otherwise, daily B6 in the regular dose really does have a counterproductive effect for me (not for B12 apparently in my experience). 

A better solution to the latter problem has been DHA (in omega-3 fatty acids, especially fish oil), and that has also been just awesome for working memory (though I think it can be a little dehydrating to take it every day). I really think there are inadequacies in our food supply, with current farming practices only replenishing the soil with the nutrients needed for mere growth (like nitrogen), from what I've heard. 

Just heard a TV special about how a particularly long-lived group of Asians lived longer due to vitamins in their soil or something (the special was in Chinese (I'm living in China), and my Chinese is still just so-so).

Now how's that for really off-topic?
---------------------------------------
*[ALastorZ]()* on 2010-05-31 16:41:04  
I've needed this useful addition:

```

	case 'SORT_STRNUMERIC': // compare items by first number in string
		    sorter = function (a, b) {
				a = Number(String(a).match(/(\d*)/)[1]);
				b = Number(String(b).match(/(\d*)/)[1]);
                return (a - b);
            };
            break;

```	
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-06-19 16:22:07  
@ ALastorZ: We won't include it as it isn't a PHP feature, but you make a good point as I think PHP doesn't care for strings when doing a SORT_NUMERIC. Fixed: https://github.com/kvz/phpjs/commit/c175338a592db72bc4140627c9b044702ceed26a

---------------------------------------
*[Lazy eyes]()* on 2010-09-24 14:38:07  
I've got a set of keys

```
[1000000] => 1
[1100000] => 1
[850000] => 5
[880000] => 2
[890000] => 4
```

it doesn't seem to work with different key lengths? Any fix for this?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-09-25 17:46:19  
@Lazy eyes: Thanks for the input! Fixed in Git. The problem was/is that while the default flag, SORT_REGULAR in PHP, by relying on original type, is able to distinguish numbers from strings, while in JS, using an object to simulate associative arrays, leads to the issue that all object keys being strings. I've now changed SORT_REGULAR to assume that any numeric string gets treated as though its original type were numeric. If you want to always treat as strings, or always treat as numbers, you can choose from the different flags instead.
---------------------------------------
