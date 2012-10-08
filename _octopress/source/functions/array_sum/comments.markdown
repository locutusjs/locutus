*[Nosredna]()* on 2008-08-05 00:10:13  
I don't like that array_sum uses for/in. Makes the loop slow and leads to other properties of the array besides the numbered elements being picked up. For arrays, a normal for loop is more appropriate. I'm curious why for/in was chosen. To deal with sparse arrays? Anyway, seems like a bug to me.

```
arr=[1,2,3,4];
arr.other=5;

alert(array_sum(arr));
```

I'd prefer that alert 10 rather than 15.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 16:57:11  
@ Nosredna: Thank you for your input. For many different reasons we've chosen to mimic PHP's behavior as much as possible. And as you can see: http://www.php.net/array_sum , PHP does not differentiate between numerically indexed arrays and 'associative arrays' (in JavaScript, known as objects). I hope this answers your question.
---------------------------------------
*[Nate]()* on 2008-11-19 06:28:17  
The variable &quot;key&quot; is declared twice with &quot;var&quot;.  Probably the &quot;var&quot; in the for loop should be removed.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-25 17:07:38  
@ Nate: Thanks!
---------------------------------------
*[Gilbert](www.midiaprata.com.br)* on 2009-01-05 21:11:16  
Hi!

I tryng this code 

```
totalPedidos = new Array;
index = 0.1;

	for(y=0; y &lt; 12; y++){
		totalPedidos[y] = y * index;
	}

document.writeln(array_sum(totalPedidos));
```

and return this &gt;&gt;
00.10.20.300000000000000040.40.50.60000000000000010.70000000000000010.80.911.1
---------------------------------------
*[Gilbert](www.midiaprata.com.br)* on 2009-01-05 22:19:44  
I resolve my problem 

Edit 
```
function array_sum( array ) {
    // Calculate the sum of values in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_sum/
    // +       version: 811.2517
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Nate
    // *     example 1: array_sum([4, 9, 182.6]);
    // *     returns 1: 195.6

    var key, sum= parseInt(0);

    // input sanitation
    if( !array || (array.constructor !== Array &amp;&amp; array.constructor !== Object) || !array.length ){
        return null;
    }

    for(key in array){
        sum += (array[key]) * 1 ;
    }

    return sum;
}

```

```
totalPedidos = new Array;
index = 0.3;

	for(y=0; y &lt; 12; y++){
		totalPedidos[y] = y + index;
	}

document.writeln(array_sum(totalPedidos));

```

Result = 69.6
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-06 17:21:48  
@ Gilbert: Thanks for sharing! I think the problem was:

```
total = Array
```

instead of

```
total = new Array // or total = []
```

But a little extra input sanitation wouldn't hurt!
---------------------------------------
*[David Pilia](www.beteck.it)* on 2011-11-12 12:27:44  
Hi,
I fix this code with a typeof control in the for cicle
```
for (key in array) {
        if ( parseFloat(array[key]).toString() == 'NaN' ) continue;
        sum += parseFloat(array[key]);
    }
```

In this mode any other type of content of the array
are skipped.

Example:
```array_sums([4, 1, 'abc', '12.3', 3, 2]);```

return 22.3 = 4+1+12.3+3+2; // abc is skipped and 12.3 converted to float

Bye!
---------------------------------------
*[????? ????????](http://an3m1.com/)* on 2012-04-18 10:18:35  
Great job here. I really enjoyed what you had to say. Keep going because you definitely bring a new voice to this subject. Not many people would say what you’ve said and still make it interesting 
 


---------------------------------------
*[chris]()* on 2012-06-21 17:40:59  
isn't this more simple and functional?
```
function sum (array) { return array.reduce(function (a, b) { return a + b; })}

sum([1,2,3])
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-21 19:53:33  
@chris: Yes, but 

1) reduce() is not available to older browsers, and 
2) it does not work on regular objects which phpjs allows in place of associative arrays (or the ordered associative arrays which I have now added support for in Git). 

The latter works as a method of our custom PHPJS_Array's (returnable optionally by the array() function) to ensure something resembling an associative array can be created in JS while still being orderable:

ini_set('phpjs.return_phpjs_arrays', 'on');
var a = array({a:2}, {b:3}, {c:4}); // represents an ordered version of {a:2, b:3, c:4} (not needed with sum(), but of relevance with other ordered arrays)
a.sum();
// 9

// Or this:
array_sum(a);
// 9
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-04 15:44:07  
@David Pilia: Thanks for the PHP-like behavior. Applied in Git (though slightly simplified). Also applied in optional array() methods.
---------------------------------------
