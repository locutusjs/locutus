*[vikas]()* on 2008-05-06 13:38:09  
it very nice
---------------------------------------
*[sankai]()* on 2008-08-25 09:42:32  
It can't work well in IE!
The debug infomation is &quot;Object don't support the attribute or method&quot; in the code as
```
    if (array instanceof Array) {
        array.forEach(countValue, tmp_ar);
    } else if (array instanceof Object) {
        for ( key in array ) {
            countValue.call(tmp_ar, array[key]);
        }
    }
```

å›§rz..but,It's working very well in Firefox!!
---------------------------------------
*[sankai]()* on 2008-08-25 11:59:27  
It seems because IE broswer don't support the mothod array.forEach().I search some solution from the google web.

http://developer.mozilla.org/En/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach

I try add the code before array_count_values()
```
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != &quot;function&quot;)
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i &lt; len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}
```

lol...It still can't work!!!

Orz..do you have any idea,sir?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 19:26:37  
@ sankai: Thanks for pointing that out sankai! I've replaced the mozilla-only: forEach with a regular for loop. It should work fine now!
---------------------------------------
*[J-R](none)* on 2009-03-25 01:39:57  
Hi, 
I am on firefox on a mac. This code doesn't seem to be working. I tried debugging it by putting alerts in the function. It looks ok except it doesn't return what I expect it to. I am using your example to try to produce the same result to no avail. 
```
<script type='text/javascript'>

function array_count_values( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ates Goral (http://magnetiq.com)
    // + namespaced by: Michael White (http://getsprink.com)
    // +      input by: sankai
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
    // *     returns 1: {3:2, 5:1, "foo":2, "bar":1}
    // *     example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
    // *     returns 2: {3:2, 5:1, "foo":2, "bar":1}
    // *     example 3: array_count_values([ true, 4.2, 42, "fubar" ]);
    // *     returns 3: {42:1, "fubar":1}
 
    var tmp_arr = {}, key = '', t = '';
    
    var __getType = function(obj) {
        // Objects are php associative arrays.
        var t = typeof obj;
        t = t.toLowerCase();
        if (t == "object") {
            t = "array";
        }
        return t;
    }    
 
    var __countValue = function (value) {
        switch (typeof(value)) {
            case "number":
                if (Math.floor(value) != value) {
                    return;
                }
            case "string":
                if (value in this) {
                    ++this[value];
                } else {
                    this[value] = 1;
                }
        }
    };
    
    t = __getType(array);
    if (t == 'array') {
        for ( key in array ) {
            __countValue.call(tmp_arr, array[key]);
        }
    } 
    return tmp_arr;
}


function formValidator(){
	var tmpArray= [];
	tmpArray = array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
	document.write(tmpArray[0]  + tmpArray[1]+ tmpArray[2]);
	document.write(tmpArray[3]  + tmpArray[4]+ tmpArray[5]);
//	document.write(tmpArray[0] + " " + tmpArray[1]+ " " + tmpArray[2] + " " + tmpArray[3]+ " " + tmpArray[4]+ " " + tmpArray[5]);
}

</script>

<form id="frmchoixronde1" name="frmchoixronde1"  method="POST" 
enctype="application/x-www-form-urlencoded" onsubmit='return formValidator()'>
<html><head><title>Page des poolers</title></head> <body>
<b>Entrez vos choix pour la premiere ronde</b>
</br><fieldset>

<b><label for="player_1" style="width:2em">1</label></b><input name="player_1" id="player_1" type="text" size="30"></br>
<b><label for="player_2" style="width:2em">2</label></b><input name="player_2" id="player_2" type="text" size="30"></br>
<b><label for="player_3" style="width:2em">3</label></b><input name="player_3" id="player_3" type="text" size="30"></br>

<b><label for="player_4" style="width:2em">4</label></b><input name="player_4" id="player_4" type="text" size="30"></br>
<b><label for="player_5" style="width:2em">5</label></b><input name="player_5" id="player_5" type="text" size="30"></br>
<b><label for="player_6" style="width:2em">6</label></b><input name="player_6" id="player_6" type="text" size="30"></br>
<input type="submit" name="submit" value="Soumettre vos choix">

</form>
</br> 
</body></html> 

```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-03 12:36:30  
@ J-R: I'm running the test code with no problems:
$ ./phpjstest.php array_count_values
array/array_count_values.js              returns#1    OKAY 
                                         returns#2    OKAY 
                                         returns#3    OKAY 

Could you provide the exact code that fails? What did you expect, and what did it return instead? That would help us fix the problem! Thx
---------------------------------------
*[Shingo]()* on 2010-04-21 17:29:43  
Thanks but there is one problem. If my test array is like
```
  arr=["constructor"];
```
It does not work.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-04-22 18:54:39  
@Shingo: Thanks for the report! Fixed in Git (with some other clean-up): http://github.com/kvz/phpjs/raw/master/functions/array/array_count_values.js
---------------------------------------
