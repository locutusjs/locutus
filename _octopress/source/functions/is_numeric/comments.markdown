*[David]()* on 2008-01-16 20:08:49  
The is_numeric function is not correct, at least it doesn't work like PHP.  A numeric string, like &quot;-876.20&quot; should return true, but it doesn't because it doesn't pass the [typeof mixed_var == 'number'] condition.
---------------------------------------
*[David]()* on 2008-01-16 20:10:36  
One of your tests should be:

is_numeric(&quot;+186.31e2&quot;);

And that needs to return true.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-16 22:17:44  
@ David: Thank you for noticing. I thouhgt of isNaN(), which I think does the trick. If you wan't to be credited differently let me know.
---------------------------------------
*[Martijn Wieringa]()* on 2008-03-01 13:56:57  
I've been working on a simular project.. Here are some functions i completes so far.

```

// Load PHP library
var PHP = new PHP_LIBRARY();

// Call some function within PHP library
PHP.func(params);

```

Here's my library (so far)

```

var PHP_LIBRARY = function() {}

PHP_LIBRARY.prototype = 
{
	'abs' : function(f_float)
	{
		return isNaN(f_float) ? 0 : Math.abs(f_float);
	},

	'chr' : function(f_ascii)
	{
		return String.fromCharCode(f_ascii);
	},

	'explode' : function(f_seperator, f_string)
	{
		return f_string.split(f_seperator);
	},

	'implode' : function(f_glue, f_array)
	{
		return f_array.join(f_glue);
	},

	'join' : function(f_glue, f_array)
	{
		return this.implode(f_glue, f_array);
	},

	'number_format' : function(f_float, f_decimals, f_decimal_sign, f_thousand_sign)
	{
		if(f_decimals == undefined)
		{
			f_decimals = 0;
		}

		if(f_decimal_sign == undefined)
		{
			f_decimal_sign = '';
		}

		if(f_thousand_sign == undefined)
		{
			f_thousand_sign = '';
		}

		var result = this.implode(f_thousand_sign, this.str_split(Math.floor(f_float).toString(), 3, true));

		if(f_decimals &gt; 0)
		{
			var d = Math.round((f_float % 1) * Math.pow(10, f_decimals)).toString();
			result += f_decimal_sign + d + this.str_repeat('0', f_decimals - d.length);
		}

		return result;
	},

	'ord' : function(f_string)
	{
		return f_string.charCodeAt(0);
	},

	'split' : function(f_seperator, f_string)
	{
		return this.explode(f_seperator, f_string);
	},

	'str_repeat' : function(f_string, f_repeat)
	{
		var result = '';

		while(f_repeat &gt; 0)
		{
			result += f_string;
			f_repeat--;
		}

		return result;
	},

	'str_replace' : function(f_needle, f_replace, f_haystack)
	{
		var result = '';
		var index = 0;

		while((index = f_haystack.indexOf(f_needle)) &gt; -1)
		{
			result += f_haystack.substring(0, index);
			result += f_replace;
			f_haystack = f_haystack.substring(index + f_needle.length);
		}

		return result + f_haystack;
	},

	'str_ireplace' : function(f_needle, f_replace, f_haystack)
	{
		var result = '';
		var index = 0;

		var haystack = f_haystack.toLowerCase();
		var needle = f_needle.toLowerCase();

		while((index = haystack.indexOf(needle)) &gt; -1)
		{
			result += f_haystack.substring(0, index);
			result += f_replace;

			haystack = haystack.substring(index + f_needle.length);
			f_haystack = f_haystack.substring(index + f_needle.length);
		}

		return result + f_haystack;
	},

	'str_split' : function(f_string, f_split_length, f_backwards)
	{
		if(f_backwards == undefined)
		{
			f_backwards = false;
		}

		if(f_split_length &gt; 0)
		{
			var result = new Array();

			if(f_backwards)
			{
				var r = (f_string.length % f_split_length);

				if(r &gt; 0)
				{
					result[result.length] = f_string.substring(0, r);
					f_string = f_string.substring(r);
				}
			}

			while(f_string.length &gt; f_split_length)
			{
				result[result.length] = f_string.substring(0, f_split_length);
				f_string = f_string.substring(f_split_length);
			}

			result[result.length] = f_string;

			return result;
		}

		return false;
	},

	'strcasecmp' : function(f_string1, f_string2)
	{
		var string1 = f_string1.toLowerCase();
		var string2 = f_string2.toLowerCase();

		if(string1 &gt; string2)
		{
			return 1;
		}
		else if(string1 == string2)
		{
			return 0;
		}

		return -1;
	},

	'strcmp' : function(f_string1, f_string2)
	{
		if(f_string1 &gt; f_string2)
		{
			return 1;
		}
		else if(f_string1 == f_string2)
		{
			return 0;
		}

		return -1;
	},

	'stripos' : function(f_haystack, f_needle, f_offset)
	{
		var haystack = f_haystack.toLowerCase();
		var needle = f_needle.toLowerCase();
		var index = 0;

		if(f_offset == undefined)
		{
			f_offset = 0;
		}

		if((index = haystack.indexOf(needle, f_offset)) &gt; -1)
		{
			return index;
		}

		return false;
	},

	'strlen' : function(f_string)
	{
		return f_string.length;
	},

	'strnatcasecmp' : function(f_string1, f_string2, f_version)
	{
		this.strnatcmp(f_string1.toLowerCase(), f_string2.toLowerCase(), f_version);
	},

	'strnatcmp' : function(f_string1, f_string2)
	{
		if(f_version == undefined)
		{
			f_version = false;
		}

		var array1 = this.__strnatcmp_split(f_string1);
		var array2 = this.__strnatcmp_split(f_string2);

		var len = array1.length;
		var text = true;

		var result = -1;
		var r = 0;

		if(len &gt; array2.length)
		{
			len = array2.length;
			result = 1;
		}

		for(i = 0; i &lt; len; i++)
		{
			if(isNaN(array1[i]))
			{
				if(isNaN(array2[i]))
				{
					text = true;

					if((r = this.strcmp(array1[i], array2[i])) != 0)
					{
						return r;
					}
				}
				else if(text)
				{
					return 1;
				}
				else
				{
					return -1;
				}
			}
			else if(isNaN(array2[i]))
			{
				if(text)
				{
					return -1;
				}
				else
				{
					return 1;
				}
			}
			else 
			{
				if(text || f_version)
				{
					if((r = (array1[i] - array2[i])) != 0)
					{
						return r;
					}
				}
				else
				{
					if((r = this.strcmp(array1[i].toString(), array2[i].toString())) != 0)
					{
						return r;
					}
				}

				text = false;
			}
		}

		return result;
	},

	'__strnatcmp_split' : function(f_string)
	{
		var result = new Array();
		var buffer = '';
		var chr = '';

		var text = true;

		for(var i = 0; i &lt; f_string.length; i++)
		{
			chr = f_string.substring(i, i + 1);

			if(chr.match(/[0-9]/))
			{
				if(text)
				{
					if(buffer.length &gt; 0)
					{
						result[result.length] = buffer;
						buffer = '';
					}

					text = false;
				}

				buffer += chr;
			}
			else if((text == false) &amp;&amp; (chr == '.') &amp;&amp; (i &lt; (f_string.length - 1)) &amp;&amp; (f_string.substring(i + 1, i + 2).match(/[0-9]/)))
			{
				result[result.length] = buffer;
				buffer = '';
			}
			else
			{
				if(text == false)
				{
					if(buffer.length &gt; 0)
					{
						result[result.length] = parseInt(buffer);
						buffer = '';
					}

					text = true;
				}

				buffer += chr;
			}
		}

		if(buffer.length &gt; 0)
		{
			if(text)
			{
				result[result.length] = buffer;
			}
			else
			{
				result[result.length] = parseInt(buffer);
			}
		}

		return result;
	},


	'strpos' : function(f_haystack, f_needle, f_offset)
	{
		var index = 0;

		if(f_offset == undefined)
		{
			f_offset = 0;
		}

		if((index = f_haystack.indexOf(f_needle, f_offset)) &gt; -1)
		{
			return index;
		}

		return false;
	},

	'strrev' : function(f_string)
	{
		var result = '';
		var index = f_string.length - 1;

		while(index &gt;= 0)
		{
			result += f_string.substring(index, index + 1);
			index--;
		}

		return result;
	},

	'strripos' : function(f_haystack, f_needle, f_offset)
	{
		var haystack = f_haystack.toLowerCase();
		var needle = f_needle.toLowerCase();
		var index = 0;

		if((index = haystack.indexOf(needle, f_offset)) &gt; -1)
		{
			do
			{
				f_offset = index;
			}
			while((index = haystack.indexOf(needle, f_offset + 1)) &gt; -1);

			return f_offset;
		}

		return false;
	},

	'strrpos' : function(f_haystack, f_needle, f_offset)
	{
		var index = 0;

		if((index = f_haystack.indexOf(f_needle, f_offset)) &gt; -1)
		{
			do
			{
				f_offset = index;
			}
			while((index = f_haystack.indexOf(f_needle, f_offset + 1)) &gt; -1);

			return f_offset;
		}

		return false;
	},

	'strtolower' : function(f_string)
	{
		return f_string.toLowerCase();
	},

	'strtoupper' : function(f_string)
	{
		return f_string.toUpperCase();
	},

	'substr' : function(f_string, f_start, f_length)
	{
		if(f_start &lt; 0)
		{
			f_start += f_string.length;
		}

		if(f_length == undefined)
		{
			f_length = f_string.length;
		}
		else if(f_length &lt; 0)
		{
			f_length += f_string.length;
		}
		else
		{
			f_length += f_start;
		}

		if(f_length &lt; f_start)
		{
			f_length = f_start;
		}

		return f_string.substring(f_start, f_length);
	},

	'substr_count' : function(f_haystack, f_needle, f_offset)
	{
		var result = 0;
		var index = 0;

		if(f_offset == undefined)
		{
			f_offset = 0;
		}

		while((index = f_haystack.indexOf(f_needle, f_offset + 1)) &gt; -1)
		{
			result++;
			f_offset = index;
		}

		return result;
	},

	'trim' : function(f_string)
	{
		return f_string.replace(/^\s*/, '').replace(/\s*$/, '');
	},

	'ucfirst' : function(f_string)
	{
		return f_string.substring(0, 1).toUpperCase() + f_string.substring(1);
	},

	'ucword' : function(f_string)
	{
		var result = '';
		var chr = '';
		var swap = true;

		for(var i = 0; i &lt; f_string.length; i++)
		{
			chr = f_string.substring(i, i + 1);

			if(swap)
			{
				result += chr.toUpperCase();
			}
			else
			{
				result += chr;
			}

			if(chr.match(/\s/))
			{
				swap = true;
			}
			else
			{
				swap = false;
			}
		}

		return result;
	}
}


```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-01 15:17:51  
@ Martijn Wieringa: I will add the functions that are missing here, thanks alot man!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-01 15:36:56  
@ Martijn Wieringa: And additional compliments for solid code. The integration went seamlessly, nice job!
---------------------------------------
*[taith](divinedesigns.ca)* on 2009-02-02 15:07:02  
some browsers will interpret a number as a string depending on how its set... hence a number, can be defined as a string, making the function return false all the time...

this will automatically turn it into an integer in this case

```
function is_numeric(integer){
 return (!isNaN(integer*1));
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-02 23:35:35  
@ taith: Check, fixed!
---------------------------------------
*[Tim de Koning](http://www.kingsquare.nl)* on 2009-03-31 16:28:55  
Hi Kevin e.a.

is_numeric('') returns true in javascript, not in PHP... Shouldn't this be:

```
function is_numeric( mixed_var ) {
    return !isNaN(parseInt(mixed_var));
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-03 16:44:35  
@ Tim de Koning: Thank you for noticing. I had to fix it a bit differently in but the bottom line is your testcase works now. Thanks!
---------------------------------------
*[max4ever]()* on 2011-10-13 12:08:35  
isNumeric('3a')  ==> return true, should return false
---------------------------------------
*[max4ever]()* on 2011-10-13 12:17:12  
please consider this function http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
---------------------------------------
*[CoursesWeb](http://www.coursesweb.net)* on 2012-04-30 08:07:26  
Hi,
For is_numeric I use this:
```
return /^[0-9]+[\.,]{0,1}[0-9]*$/i.test(obj);
```
---------------------------------------
