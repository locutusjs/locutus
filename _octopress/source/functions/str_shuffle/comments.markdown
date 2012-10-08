*[Hans B PUFAL]()* on 2010-06-20 16:05:00  
```
function str_shuffle (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: shuffled = str_shuffle("abcdef");
    // *     results 1: shuffled.length == 6

    var newStr = [];
    
    if (arguments.length < 1) {
        throw 'str_shuffle : Parameter str not specified';
    }
        
    if (typeof str !== 'string') {
        throw 'str_shuffle : Parameter str ( = ' + str + ') is not a string';
    }
    
    str = str.split (''); 
    while (str.length) {
        newStr.push (str.splice (Math.floor (Math.random () * (str.length - 1)) , 1)[0]);
    }
    
    return newStr.join ('');
}
```

In my version (above) I check the argument type explicitly (simply checking for undefined does not ensure that a parameter was passed nor that it is a string). I also provide the actual parameter value in the exception since this usually makes debugging much easier.

Perhaps php.js could adopt a standard in this area.

I use array splice to extract the random character from str (which is split into a character array) which returns the extracted character to be added to newStr. This means that the rand variable is no longer needed. Putting getRandInt inline saves time and characters.

Finally newStr is built in an array and converted at the return since (for long strings) this is more efficient than the str +=  char construct.


---------------------------------------
*[Hans B PUFAL]()* on 2010-06-20 18:56:21  
On reviewing the code I note an error 
the line 
```
newStr.push (str.splice (Math.floor (Math.random () * (str.length - 1)) , 1)[0]);
```
should read
```
newStr.push (str.splice (Math.floor (Math.random () * (str.length)) , 1)[0]);
```

---------------------------------------
