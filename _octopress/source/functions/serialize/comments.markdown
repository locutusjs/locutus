*[Ates Goral]()* on 2008-01-21 19:08:39  
Hi Kevin,

Here are a few improvements to what I originally had:

For Array detection, instead of:

```(&quot;length&quot; in mixed_val)```

it's nicer to say:

```(mixed_val instanceof Array)```

Also, an additional check can be added to handle the NaN and Infinite values:

```
   case &quot;number&quot;:
        if (mixed_val == NaN || mixed_val == Infinity)
        {
            return false;
        }
        ...
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-21 19:11:35  
@ uestla: Yes it probably should :) Fixed, thank you!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-22 07:47:11  
@ Ates Goral: Thanks, I've updated the function.
---------------------------------------
*[Ates Goral]()* on 2008-01-22 22:39:36  
Here's get_class(). I think serialize() now can re-use this one instead of the local getObjectClass() implementation.

I've added the extra instanceof checks solely to match PHP behaviour. They can be removed since JavaScript has no problem with getting class names for simple types or arrays/functions etc. This brings up the question: Are we trying to mimic PHP behaviour as closely as possible or is it all right to introduce additional functionality brought forth by the flexibility of JavaScript?

```
function get_class(obj) {
    // *     example 1: get_class(new (function MyClass() {}));
    // *     returns 1: &quot;MyClass&quot;
    // *     example 2: get_class({});
    // *     returns 2: &quot;Object&quot;
    // *     example 3: get_class([]);
    // *     returns 3: false
    // *     example 4: get_class(42);
    // *     returns 4: false
    // *     example 5: get_class(window);
    // *     returns 5: false
    // *     example 6: get_class(function MyFunction() {});
    // *     returns 6: false
    
    if (obj instanceof Object &amp;&amp; !(obj instanceof Array) &amp;&amp;
    		!(obj instanceof Function) &amp;&amp; obj.constructor) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);

        if (arr &amp;&amp; arr.length == 2) {
            return arr[1];
        }
    }
    
    return false;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-23 08:11:30  
@ Ates Goral: Works like a charm, I will build this in serialize and add it as a dependency.

About your php-strict/javascript-flexible question. I think we should stay with PHP as close as possible. Hopefully this will provide consistency &amp; clarity for end users. And interoperability between php-js-function throughout the project. This approach should also ensure that no extra function documentation has to be written because PHP's function manual will (in most cases) be valid.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-23 08:33:03  
@ Ates Goral: Example 14 is giving: too much recursion after implementing the new get_class function in serialize
---------------------------------------
*[Ates Goral]()* on 2008-01-23 14:57:46  
I'll take a look at why serialize() is looping.
---------------------------------------
*[Franck Chionna]()* on 2008-02-20 16:24:27  
hello,

i d like to serialize a window object by a js var that contain window.open , thus to keep in memory the window open if the php page is refreshed. i tried to use your code but it says js error &quot;too much recursion... any suggestion ? thanks and congratulation for the work done
---------------------------------------
*[Doug]()* on 2008-02-28 23:35:36  
Have you started to compile a function for unserialize yet?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-28 23:53:59  
@ Doug: Not yet, so feel free!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 16:21:13  
@ Doug: About unserialize, just now I found a very good javascript unserialize function by Arpad Ray. I've included the function in this project. If Arpad doesn't approve however (I've sent him an email), we will still have to write it ourselves.
---------------------------------------
*[Andrea Giammarchi]()* on 2008-03-02 18:57:30  
two years ago, 15.000 users, about zero problems:
http://www.devpro.it/javascript_id_102.html

It's able to save correctly UTF-8 strings as well.

Cheers
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 19:38:56  
@ Andrea Giammarchi: Impressive code Andrea! I will look into this and if I use (parts of) it, I will credit you accordingly! Thanks
---------------------------------------
*[d3x]()* on 2008-05-30 22:51:03  
For every other person that needs an unserialize implementation:

```
function unserialize(data){
	function error(type, msg, filename, line){throw new window[type](msg, filename, line);}
	function read_until(data, offset, stopchar){
		var buf = [];
		var char = data.slice(offset, offset + 1);
		var i = 2;
		while(char != stopchar){
			if((i+offset) &gt; data.length){
				error('Error', 'Invalid');
			}
			buf.push(char);
			char = data.slice(offset + (i - 1),offset + i);
			i += 1;
		}
		return [buf.length, buf.join('')];
	};
	function read_chars(data, offset, length){
		buf = [];
		for(var i = 0;i &lt; length;i++){
			var char = data.slice(offset + (i - 1),offset + i);
			buf.push(char);
		}
		return [buf.length, buf.join('')];
	};
	function _unserialize(data, offset){
		if(!offset) offset = 0;
		var buf = [];
		var dtype = (data.slice(offset, offset + 1)).toLowerCase();
		
		var dataoffset = offset + 2;
		var typeconvert = new Function('x', 'return x');
		var chars = 0;
		var datalength = 0;
		
		switch(dtype){
			case &quot;i&quot;:
				typeconvert = new Function('x', 'return parseInt(x)');
				var readData = read_until(data, dataoffset, ';');
				var chars = readData[0];
				var readdata = readData[1];
				dataoffset += chars + 1;
			break;
			case &quot;b&quot;:
				typeconvert = new Function('x', 'return (parseInt(x) == 1)');
				var readData = read_until(data, dataoffset, ';');
				var chars = readData[0];
				var readdata = readData[1];
				dataoffset += chars + 1;
			break;
			case &quot;d&quot;:
				typeconvert = new Function('x', 'return parseFloat(x)');
				var readData = read_until(data, dataoffset, ';');
				var chars = readData[0];
				var readdata = readData[1];
				dataoffset += chars + 1;
			break;
			case &quot;n&quot;:
				readdata = null;
			break;
			case &quot;s&quot;:
				var ccount = read_until(data, dataoffset, ':');
				var chars = ccount[0];
				var stringlength = ccount[1];
				dataoffset += chars + 2;
				
				var readData = read_chars(data, dataoffset+1, parseInt(stringlength));
				var chars = readData[0];
				var readdata = readData[1];
				dataoffset += chars + 2;
				if(chars != parseInt(stringlength) &amp;&amp; chars != readdata.length){
					error('SyntaxError', 'String length mismatch');
				}
			break;
			case &quot;a&quot;:
				var readdata = {};
				
				var keyandchars = read_until(data, dataoffset, ':');
				var chars = keyandchars[0];
				var keys = keyandchars[1];
				dataoffset += chars + 2;
				
				for(var i = 0;i &lt; parseInt(keys);i++){
					var kprops = _unserialize(data, dataoffset);
					var kchars = kprops[1];
					var key = kprops[2];
					dataoffset += kchars;
					
					var vprops = _unserialize(data, dataoffset);
					var vchars = vprops[1];
					var value = vprops[2];
					dataoffset += vchars;
					
					readdata[key] = value;
				}
				
				dataoffset += 1;
			break;
			default:
				error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
			break;
		}
		return [dtype, dataoffset - offset, typeconvert(readdata)];
	};
	return _unserialize(data, 0)[2];
}
```

Code translated from: http://hurring.com/scott/code/python/serialize/
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-31 14:21:01  
@ d3x: Do you think that this function beats Arpad Ray's implementation?
---------------------------------------
*[d3x]()* on 2008-05-31 15:31:00  
@ Kevin: Arpad Ray's implementation uses &quot;eval&quot; and &quot;eval is evil&quot;(http://blogs.msdn.com/ericlippert/archive/2003/11/01/53329.aspx)
---------------------------------------
*[Thomas Buschhardt]()* on 2008-09-09 13:24:10  
Hallo, thanx for the code. How can I find out in the returned object the length of the arrays (if these arrays be)?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-09 13:37:02  
@ Ren: Can you please provide a print_r of the array in CODE blocks that you are trying to serialize? We need your import to improve this function. Thanks!
---------------------------------------
*[Ren]()* on 2008-09-09 13:53:23  
Sorry plz, it was my fault. 
I used htmlspecialchars($_REQUEST), so the variable with serialized string encoded too. 
Function works fine :) thx
---------------------------------------
*[dino](www.pushideas.com)* on 2008-09-19 09:39:29  
serialize doesn't work well with mootools since mootools adds or extends the array object with functions which serialize picks up on and tries to translate into a string.

At least it broke my code when I included mootools.

I fixed it by having serialize not try to translate objects or functions. It doesn't seem like functions are being handled anyway.



```
       case &quot;function&quot;:
		val = &quot;&quot;;
		break;

for (key in mixed_value) {
		var ktype = _getType(mixed_value[key]);
		
		//alert(key + ' type is ' + ktype);
		if (ktype != &quot;function&quot; &amp;&amp; ktype != &quot;object&quot;) {
			okey = (key.match(/^[0-9]+$/) ? parseInt(key) : key);
			vals += serialize(okey) +
				serialize(mixed_value[key]);
			count++;
		}
            }
---------------------------------------
*[dino](www.pushideas.com)* on 2008-09-19 09:40:50  
woops I don't think my code showed up properly.

```
for (key in mixed_value) {
		var ktype = _getType(mixed_value[key]);
		
		//alert(key + ' type is ' + ktype);
		if (ktype != &quot;function&quot; &amp;&amp; ktype != &quot;object&quot;) {
			okey = (key.match(/^[0-9]+$/) ? parseInt(key) : key);
			vals += serialize(okey) +
				serialize(mixed_value[key]);
			count++;
		}
            }
```
---------------------------------------
*[mopont]()* on 2008-09-19 09:42:17  
Great function!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-21 21:57:28  
@ Dino: I've committed your changes! Thank you.
---------------------------------------
*[Tom]()* on 2008-11-27 18:33:36  
The returned representation of provided function is valid PHP code (which is correct).
But does anyone have a JS var_export function whose returned representation is valid javascript code?
The returned value type should be string and it could be passed to eval() function.
Examples:
```
var a = new Array(12, '13', 'abc', 'line1\nline2\nline3');
var js_code = var_export(a);
/*
the returned value should be:
"{0:12, 1:'13', 2:'abc', 3:'line1\nline2\nline3'}"
*/

var b = {'key1':4, 'key2':'5', 'key3':'xxx\n123', 555:'text'};
js_code = var_export(b);
/*
the returned value should be:
"{'key1':4, 'key2':'5', 'key3':'xxx\n123', 555:'text'}"
*/

var c = 123;
js_code = var_export(c); // "123"

var d = '321';
js_code = var_export(d); // "'321'"

var e = 'multilne\ntext';
js_code = var_export(e); // "'multiline\ntext'"

function add(x, y)
{
      res = x + y;
      return res;
}
var js_code = var_export(add);
/*
the returned value should be:
"function add(x, y) { res = x + y; return res; }"
*/
```

Thanks.

---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-01 08:46:19  
@ Andrej Pavlovic: Thanks man!
---------------------------------------
*[Garagoth]()* on 2008-12-18 17:04:45  
Hm, an interesting line of code, not sure how it is supposed to work:

```
if (ktype == &quot;function&quot; &amp;&amp; ktype == &quot;object&quot;) {
    continue; 
}
```

Cheers,
Garagoth.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-30 10:28:17  
@ Garagoth: Well noticed. That doesn't make any sense at all.
---------------------------------------
*[Thomas](www.cyber-nova.com)* on 2009-03-08 19:32:50  
Works fine with php 5.2.0.
But doesn't work with php 5.2.6 ! Php cannot unserialize the string.

Any known issues about this ?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-03-22 19:07:54  
@ Thomas: You're the first to report. Would it be possible for you to supply test-data?
---------------------------------------
*[AndreaZ]()* on 2009-04-19 12:20:02  
when there's a newline character (\n) inside a serialized string, php unseriliaze returns false

i don't know why :-(
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-20 00:04:47  
@ AndreaZ: I did some testing with the following code:
```
$ser = serialize("a \n b");
var_dump($ser);
```
.. which is executable by both PHP & JS. 
Both return the exact same output:
```
kevin@kevin-desktop:~/workspace/plutonia-phpjs/_tools$ rhino debug.js 
string(12) "s:5:"a 
 b";"
kevin@kevin-desktop:~/workspace/plutonia-phpjs/_tools$ php debug.php
string(12) "s:5:"a 
 b";"
```

..so I'm wondering could it be that something else is buggy in the script you are using? If not, can you supply the full input and code that gives the wrong results?
---------------------------------------
*[AndreaZ]()* on 2009-04-20 13:46:16  
@Kevin: i serialized a multidimensional array with your javascript function, then i unserialized the result inside a php file: unserialize returns false (if i serialize with php it works)

how can i send to you the test that i made? it is a little php file with inside your javascript serialize function

PS: thanks a lot for your work ;-)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-20 20:07:24  
@ AndreaZ: Ok if you put the PHP-serialized string inside codeblocks here, I can unserialize it with PHP as well, and then test serializing it with JS.

So if you could provide me with that data that would help me a lot. thx
---------------------------------------
*[AndreaZ]()* on 2009-04-25 10:31:55  
@Kevin: that's the test code
```
<html>
<body>
<?php
if (isset($_POST['foo']))
	{
		error_reporting(E_ALL);
		$ar = $_POST['foo'];
		var_dump($ar).'<br/>';
		$ser=stripslashes($ar);
		var_dump($ser).'<br/>';
		$unser = unserialize($ser);
		var_dump($unser).'<br/>';
	}
?>
<script language="javascript" type="text/javascript">
<!--
function clicca() {
	document.adminForm.foo.value = serialize(document.adminForm.foo.value);
}

function serialize( mixed_value ) {
    /* your function */
}
//-->
</script>

<form action="try_serialize.php" method="post" name="adminForm">
<textarea id="foo" name="foo">
a textarea with
newline</textarea>
<br />
<button type="sumbit" onclick="clicca();">Send</button>
</form>
</body>
</html>
```
---------------------------------------
*[AndreaZ]()* on 2009-04-25 10:35:19  
@Kevin: i inserted the code inside `````` but it seems that i wrong something :-(

send me an email, so i can send you the test file
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-29 15:22:04  
@ AndreaZ: Why don't you put it in pastebin.org, and add a link here. then we have syntax highlighting as well. Thanx!
---------------------------------------
*[AndreaZ]()* on 2009-05-01 11:23:29  
@Kevin: http://pastebin.com/m7f1e9ef0
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-05-12 15:39:06  
@ AndreaZ: Thx for the pastebin, this makes it clear to me what's going wrong. You are stripping slashes before you are unserializing the string, while escaped characters are an essential part of of the serialized object.

To circumvent, remove stripslashes, or first use base64_encode over the serialized object, and then in php decode it.
---------------------------------------
*[Russell Walker](www.nbill.co.uk)* on 2009-05-30 16:45:47  
I found that when serializing utf-8 characters that differ from iso-8859-1, the string could not be deserialized by PHP. This is because PHP sees the string as containing more characters than it really does (as it thinks 1 character = 1 byte, when unicode characters can take up more than 1 byte). So I amended the code on line 97 from

```val = "s:" + mixed_value.length + ":\"" + mixed_value + "\"";```

to

```val = "s:" + encodeURIComponent(mixed_value).replace(/%../g, 'x').length + ":\"" + mixed_value + "\"";```

...so now it serializes utf-8 characters in a way that PHP can deserialize. Note however, that this will probably break the javascript unserialize function, as JS and PHP cannot agree on the number of characters in the string.

The code to get the length of the string in bytes came from DtTvB: http://dt.in.th/2008-09-16.string-length-in-bytes.html
---------------------------------------
*[Russell Walker](www.nbill.co.uk)* on 2009-05-30 16:48:50  
Sorry, I quoted the line number from my own file, but in php.default.js, it is line 5826.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-05-31 20:01:37  
@ Russell Walker: Thanks for contributing. I've implemented your fix in svn & it will be available shortly.
http://trac.plutonia.nl/projects/phpjs/browser/trunk/functions/var/serialize.js
---------------------------------------
*[Russell Walker](http://www.nbill.co.uk/)* on 2009-06-16 12:33:11  
I found that if the javascript object has a property which contains a null value, the string cannot be unserialized by PHP. To fix this, I added:

```
default:
  val = "N";
  break;
```

...to the end of the switch block (around line 92 on the above function). The 'undefined' case should probably be moved down to the bottom as well so both can be handled together, ie:

```
case 'undefined':
default:
  val = "N";
  break;
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-18 07:20:25  
Fixed in SVN! Thanks! (also added your website to the credit)
---------------------------------------
*[Jamie Beck](http://www.terabit.ca)* on 2009-08-03 17:48:17  
Should not lines 83-84 be as follows for the namespaced version. Otherwise the function cannot be found...

```
vals += this.serialize(okey) +
    this.serialize(mixed_value[key]);
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-03 20:55:22  
@Jamie: Fixed in SVN. Thanks for the report!
---------------------------------------
*[Alexandre Felipe Muller](www.expressolivre.net)* on 2009-08-05 14:07:15  
We're using my serialize and unserialize in my project for 3 years, acording to my tests it's 3 or 4 times faster. Who want to see
```
	cConnector.prototype.serialize = function(data)
	{	var _thisObject = this;		
		var f = function(data)
		{
			var str_data;
	
			if (data == null || 
				(typeof(data) == 'string' && data == ''))
			{
				str_data = 'N;';
			}
	
			else switch(typeof(data))
			{
				case 'object':
					var arrayCount = 0;
	
					str_data = '';
	
					for (i in data)
					{
						if (i == 'length')
						{
							continue;
						}
						
						arrayCount++;
						switch (typeof(i))
						{
							case 'number':
								str_data += 'i:' + i + ';' + f(data[i]);
								break;
	
							case 'string':
								str_data += 's:' + i.length + ':"' + i + '";' + f(data[i]);
								break;
	
							default:
								showMessage(Element('cc_msg_err_serialize_data_unknown').value);
								break;
						}
					}
	
					if (!arrayCount)
					{
						str_data = 'N;';	
					}
					else
					{
						str_data = 'a:' + arrayCount + ':{' + str_data + '}';
					}
					
					break;
			
				case 'string':
					str_data = 's:' + data.length + ':"' + data + '";';
					break;
					
				case 'number':
					str_data = 'i:' + data + ';';
					break;
	
				case 'boolean':
					str_data = 'b:' + (data ? '1' : '0') + ';';
					break;
	
				default:
					showMessage(Element('cc_msg_err_serialize_data_unknown').value);
					return null;
			}

			return str_data;
		}
	
		return f(data);
	}
	//Unserialize Data Method
	cConnector.prototype.unserialize = function(str)
	{
		_thisObject = this;
		var matchB = function (str, iniPos)
		{
			var nOpen, nClose = iniPos;
			do
			{
				nOpen = str.indexOf('{', nClose+1);
				nClose = str.indexOf('}', nClose+1);

				if (nOpen == -1)
				{
					return nClose;
				}
				if (nOpen < nClose )
				{
					nClose = matchB(str, nOpen);
				}
			} while (nOpen < nClose);

			return nClose;
		}

		var f = function (str)
		{
			switch (str.charAt(0))
			{
				case 'a':
					var data = new Array();
					var n = parseInt( str.substring(str.indexOf(':')+1, str.indexOf(':',2) ) );
					var arrayContent = str.substring(str.indexOf('{')+1, str.lastIndexOf('}'));
					for (var i = 0; i < n; i++)
					{
						var pos = 0;
	
						/* Process Index */
						var indexStr = arrayContent.substr(pos, arrayContent.indexOf(';')+1);
						var index = f(indexStr);
						pos = arrayContent.indexOf(';', pos)+1;
						
						/* Process Content */
						var part = null;
						switch (arrayContent.charAt(pos))
						{
							case 'a':
								var pos_ = matchB(arrayContent, arrayContent.indexOf('{', pos))+1;
								part = arrayContent.substring(pos, pos_);
								pos = pos_;
								data[index] = f(part);
								break;
						
							case 's':
								var pval = arrayContent.indexOf(':', pos+2);
								var val  = parseInt(arrayContent.substring(pos+2, pval));
								pos = pval + val + 4;
								data[index] = arrayContent.substr(pval+2, val);
								break;
	
							default:
								part = arrayContent.substring(pos, arrayContent.indexOf(';', pos)+1);
								pos = arrayContent.indexOf(';', pos)+1;
								data[index] = f(part);
								break;
						}
						arrayContent = arrayContent.substr(pos);
					}
					break;
					
				case 's':
					var pos = str.indexOf(':', 2);
					var val = parseInt(str.substring(2,pos));
					var data = str.substr(pos+2, val);
					str = str.substr(pos + 4 + val);
					break;
	
				case 'i':
				case 'd':
					var pos = str.indexOf(';');
					var data = parseInt(str.substring(2,pos));
					str = str.substr(pos + 1);
					break;
				
				case 'N':
					var data = null;
					str = str.substr(str.indexOf(';') + 1);
					break;
	
				case 'b':
					var data = str.charAt(2) == '1' ? true : false;
					break;
			}
			return data;
		}
	
		return f(str);
	}

```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-16 15:23:40  
@ Alexandre Felipe Muller: Thanks for sharing. It's gonna take a while to investigate it and strip it of your environment's specific dependencies like showMessage(Element('cc_msg_err_serialize_data_unknown').value);
If after that all the testcases pass and they're indeed faster I will replace the current implementations with your's
---------------------------------------
*[Russell Walker](http://www.nbill.co.uk/)* on 2009-08-18 15:21:53  
When serializing strings that contain URL entities (such as the plus symbol), they were being lost during unserialization in PHP. To fix this, I changed line 58 to URIEncode the string value like this:

```
val = "s:" + encodeURIComponent(mixed_value).replace(/%../g, 'x').length + ":\"" + encodeURIComponent(mixed_value) + "\"";
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-19 16:19:52  
@Russell Walker: That sounds good, but can you please confirm that this is in fact the same behavior in PHP?
---------------------------------------
*[Le Torbi](http://www.letorbi.de)* on 2009-09-26 18:01:29  
Hi there,

when fixing the UTF-8 issue of the unserialize() function I've found a way to improve the speed of the size calculation for strings. It's quite simple and need no complex string operations or regular expressions. Here is the code:

```
var utf8Size = function(str) { // NEW FUNCTION
    var size = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str[i].charCodeAt(0);
        if (code < 0x0080)
            size += 1;
        else if (code < 0x0800)
            size += 2;
        else
        size += 3;
    }
    return size;
}
var _getType = function (inp) {
    var type = typeof inp, match;
    var key;
// MORE LINES OF CODE
        val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
        break;
    case "string":
        val = "s:" + utf8Size(mixed_value) + ":\"" + mixed_value + "\""; // MODIFIED LINE
        break;
 case "array":
case "object":
```

I've made some simple test and it seems that my function needs about 0.0004ms per run, while the old needs 0.004ms. Ok, it's not much, but maybe worth the code anyway...

BTW: What do I have to to to get this into the official code?

Bai
Le Torbi
---------------------------------------
*[Fadil Kujundzic]()* on 2010-08-12 15:53:14  
I had a problem with serialize function objects were stored as array. To fix this I changed at line 73 ``` objname [1] this.serialize (= objname [1 ]);[/ CODE] to ``` objname [1] this.serialize (= objname [1] == "Object [" ? "stdClass": objname [1 ]);[/ CODE]. Maybe might be useful for someone.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-09-08 19:31:16  
@ Fadil Kujundzic: That section is commented out. Are you using an older version of serialize?

@ Le Torbi: Thanks a lot! Fixed: https://github.com/kvz/phpjs/commit/d98ce0a441e4d6f45a5fddb8cf066f8d1a569e65
Your contrib will soon show up on the site as well.

---------------------------------------
*[Ben](benblume.co.uk)* on 2010-11-10 10:24:27  
I have been working with this code on a project and found some non-compatibility with IE.

On line 27, the code relies on the str[i] notation to access a character from a string. This does not work in IE, resulting in an undefined value that breaks the rest of the function. See http://en.wikipedia.org/wiki/JavaScript_syntax#String for confirmation of this.

A better option would be either:

```
var code = str.charCodeAt(i);
```

or

```
var code = str.chartAt(i).charCodeAt(0);
```

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-11-10 11:12:04  
@Ben: Thanks! Fixed in Git...
---------------------------------------
*[Vadim]()* on 2011-01-09 00:12:29  
In "var _utf8Size = function (str)":

This woun't work in IE6:
```code = str[i].charCodeAt(0);```

This work fine (thanks to Ben 10 NOV'10):
```code = str.charCodeAt(i);```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-01-09 13:43:07  
@Vadim: Yes, thank you. The cache is still stale, but in Git it has been updated for a while: https://github.com/kvz/phpjs/raw/master/functions/var/serialize.js
---------------------------------------
*[Cody O'Dell](http://www.constantconceptions.com)* on 2011-01-24 23:08:20  
Is there a way to get this working with apostrophes?
---------------------------------------
*[jj]()* on 2012-02-12 15:42:08  
this peace of shit is not working.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-16 07:34:06  
@jj: Care to prepare a test case?
---------------------------------------
*[Rick K]()* on 2012-08-01 00:19:17  
So I'm not really sure whats going on here, but I'm having a problem with this function. When I use PHP's serialize on a string value of "7&frac12;" (imagine the html entity here is the actual 1/2 fraction character and not the html entity code (not sure if it will render or not at time of posting)) The php parser will return a string value 2 bytes long. When I do the same via JS and this function, I get a string value 3 bytes long with a hidden &Acirc character between 7 and the 1/2 fraction. Why is this? I've tried everything to get around it. What I ended up having to do was in php, after it receives the serialized version of the string, it unserializes it, then it runs it through a recursive function that essentially converts all special characters to their &entityName; code, then I  str_ireplace("&Acirc;", "", $curval); then I reencode the value by converting all &entities; back to ther actual character code. Then I re-serialize using php's serialize function and then store it to the database. Case and point when I reserialized this via PHP with the 1/2 fraction characater (as a character) in the string, it stores it correctly as a 2 byte string and does not add the funky acric character back in. This was the ONLY way I could get this function to work. I know the Acirc character has something to do with character encoding but the site is set to use western/latin, not UTF8. Is there some way via javascript I can convert the UTF8 version of the value to the latin version before I use your serialize function? 

And why does this function not work exactly like the PHP version? I thought that was the point of this project? Is this a bug?

```
Here is your functions version:
a:1:{i:0;a:7:{s:3:"sku";s:5:"1052m";s:4:"name";s:21:"Boonie Hat (ABU Camo)";s:5:"price";s:5:"17.99";s:3:"qty";s:1:"1";s:6:"typeid";s:1:"3";s:6:"status";s:3:"new";s:2:"ui";a:1:{i:0;a:2:{s:4:"name";s:4:"size";s:5:"value";s:3:"7½";}}}}

(notice s:3: on the last value of the last array)

Here is PHP's version:
a:1:{i:0;a:7:{s:3:"sku";s:5:"1052m";s:4:"name";s:21:"Boonie Hat (ABU Camo)";s:5:"price";s:5:"17.99";s:3:"qty";d:1;s:6:"typeid";s:1:"3";s:6:"status";s:3:"new";s:2:"ui";a:1:{i:0;a:2:{s:4:"name";s:4:"size";s:5:"value";s:2:"7½";}}}

(notice s:2: on the last value of the last array)
```
---------------------------------------
