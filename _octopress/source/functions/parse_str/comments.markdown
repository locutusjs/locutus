*[Michael White]()* on 2008-03-02 22:00:39  
This function did not take into account the fact that the URL string might be encoded so I modified it to handle encoded URLs and added a new example.


```
function parse_str(str, array){
    // http://kevin.vanzonneveld.net
    // +   original by: Cagri Ekin
    // *     example 1: parse_str('first=foo&amp;second=bar');
    // *     returns 1: { first: 'foo', second: 'bar' }
	// *     example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.');
	// *     returns 2: { str_a: &quot;Jack and Jill didn't see the well.&quot; }
 
    var glue1 = '=';
    var glue2 = '&amp;';
 
    var array2 = str.split(glue2);
    var array3 = [];
    for(var x=0; x&lt;array2.length; x++){
        var tmp = array2[x].split(glue1);
        array3[unescape(tmp[0])] = unescape(tmp[1]).replace(/[+]/g, ' '); // This is the modified line.
    }
 
    if(array){
        array = array3;
    } else {
        return array3;
    }
}
```

http://crestidg.com
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-03 11:47:52  
@ Michael White: great! thank you!
---------------------------------------
*[stag019]()* on 2009-04-27 21:13:29  
I couldn't think of a way to do it without eval(), but it better emulates PHP.
```
function parse_str(str, array)
{
	var glue1 = '=', glue2 = '&', array2 = String(str).split(glue2),
	i, j, tmp, key, value, bracket, keys, evalStr,
	fixStr = function(str)
	{
		return urldecode(str).replace(/([\\"'])/g, '\\$1').replace(/\0/g, '\\0').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
	};

	if(!array)
	{
		array = window;
	}

	for(i = 0; i < array2.length; i++)
	{
		tmp = array2[i].split(glue1);
		if(tmp.length < 2)
		{
			tmp = [tmp, ''];
		}
		key   = fixStr(tmp[0]);
		value = fixStr(tmp[1]);
		while(key.charAt(0) == ' ')
		{
			key = key.substr(1);
		}
		if(key && key.charAt(0) != '[')
		{
			keys    = [];
			bracket = 0;
			for(j = 0; j < key.length; j++)
			{
				if(key.charAt(j) == '[' && !bracket)
				{
					bracket = j + 1;
				}
				else if(key.charAt(j) == ']')
				{
					if(bracket)
					{
						if(!keys.length)
						{
							keys.push(key.substr(0, bracket - 1));
						}
						keys.push(key.substr(bracket, j - bracket));
						bracket = 0;
						if(key.charAt(j + 1) !== '[')
						{
							break;
						}
					}
				}
			}
			if(!keys.length)
			{
				keys = [key];
			}
			for(j = 0; j < keys[0].length; j++)
			{
				chr = keys[0].charAt(j);
				if(chr == ' ' || chr == '.' || chr == '[')
				{
					keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
				}
				if(chr == '[')
				{
					break;
				}
			}
			evalStr = 'array';
			for(j = 0; j < keys.length; j++)
			{
				key = keys[j];
				if((key !== '' && key !== ' ') || j === 0)
				{
					key = "'" + key + "'";
				}
				else
				{
					key = eval(evalStr + '.push([]);') - 1;
				}
				evalStr += '[' + key + ']';
				if(j != keys.length - 1 && eval('typeof ' + evalStr) == 'undefined')
				{
					eval(evalStr + ' = [];');
				}
			}
			evalStr += " = '" + value + "';\n";
			eval(evalStr);
		}
	}
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-29 15:25:02  
stag019: Sorry but there are a lot function we need to maintain. Would it be possible for you to explain how your implementation beats our current one?
---------------------------------------
*[stag019]()* on 2009-04-30 00:35:16  
Sure, it parses strings such as array[key]=value into an array, in the same fashion PHP does. It also handles the encoding of the period and space characters, in the same fashion that PHP does.
---------------------------------------
*[stag019]()* on 2009-04-30 00:52:06  
Oops, I also forgot to mention that the second parameter is now optional, as it uses the window variable if none is defined.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-04-30 05:50:38  
Looks good, stag019, thanks! Added in SVN. (Netbeans just caught the fact that "chr" needed to be declared too.). If you like, you might also consider voting for https://bugzilla.mozilla.org/show_bug.cgi?id=488227 as this is one behavior JS can't emulate from many PHP functions (in this case, we'd get a way to use parse_str() to put variables into a local scope only without using an array).
---------------------------------------
*[stag019]()* on 2009-05-02 22:07:03  
Well, time to bugfix myself. ;P

Looking through the PHP source I realized I completely neglected to test anything with a null character in it. Aparently PHP completely ignores everything after a null character in the key name, but leaves it alone in the value.

Change the function fixStr to ```return urldecode(str).replace(/([\\"'])/g, '\\$1').replace(/\n/g, '\\n').replace(/\r/g, '\\r');```

Underneath ```		while(key.charAt(0) === ' ')
		{
			key = key.substr(1);
		}``` add ```		if(key.indexOf('\0') !== -1)
		{
			key = key.substr(0, key.indexOf('\0'));
		}```
---------------------------------------
*[stag019]()* on 2009-05-02 22:31:29  
Two things I forgot to mention:
Depends on urldecode now.
Some places I use '==' or '!=' where I could probably use '===' or '!=='. These should probably be fixed.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-03 03:12:03  
Thanks much, stag019... Fixed in SVN (including moving equality operators to identity ones)...
---------------------------------------
*[droope](droope.wordpress.com)* on 2010-05-15 13:55:26  
Hi.

I keep getting "i is not defined". Perhaps something broke?

Regards,
Droope
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-06-19 15:30:38  
@ droope: Although there are plenty open jslint issues with this function, i is actually defined and in my tests it works. What platform are you experiencing issues on?
---------------------------------------
*[Dreamer]()* on 2010-08-15 16:10:15  
Bug report  --- "TypeError: str.replace is not a function" (Copied from FireBug)

```
// PHPJS cannot parse the following codes, while it's possible in PHP
parse_str('&first=foo');
parse_str('first=foo&');
parse_str('&first=foo&');
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-08-16 03:55:35  
@Dreamer: Fixed in Git. Thanks for the report!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-09-08 19:32:45  
Awesome
---------------------------------------
*[e-mike]()* on 2010-09-13 18:03:00  
The TypeError mentioned by Dreamer is still there (also in the git version).

The error is caused by urldecode (not parse_str). urldecode had a makeover not long ago and the error is since the makeover.

If the string (str) is empty, undefined or not a string you get this error.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-09-14 05:55:39  
@e-mike. Thanks for the report. I had just assumed that was some cascading error that would be fixed by the fix I made, but now I've also addressed the urldecode issue you mention so the error should indeed now be avoided. (I'm just taking your word for it that PHP silently ignores missing, empty or null values, as I haven't confirmed in this case.) (I also just now simplified and expanded my earlier parse_str fix.)
---------------------------------------
*[Zaide](zaidesthings.com)* on 2010-10-12 11:08:48  
I was going to use this code then i saw the evals so i reimplemented it to this. Its faster, passes lint and its eval free :). I tested every make up of a query string i could think of and they all come out the same as the parse_str code above.
```
function parse_str_new (str, arr){
	var strArr = (str+'').replace(/^&/, '').replace(/&$/, '').split('&'),
		i,
		tmp,
		key,
		value,
		keyIndex,
		subkey,
		fixStr = function (str) {
			return decodeURIComponent(str.replace(/\+/g, '%20'));
		};
	
	if (!arr) {
		arr = this.window;
	}
	
	for (i = 0; i < strArr.length; i++) {
		tmp = strArr[i].split("=");
		key = fixStr(tmp[0]);
		if(tmp.length < 2){
			value = "";
		}else{
			value = fixStr(tmp[1]);
		}
		while (key.charAt(0) === ' ') {
			key = key.substr(1);
		}
		if (key.indexOf("\x00") !== -1) {
			key = key.substr(0, key.indexOf("\x00"));
		}
		if (key && key.charAt(0) !== '[') {
			keyIndex = key.indexOf('[');
			if(keyIndex !== -1&&key.indexOf(']',keyIndex) !== -1){
				subkey = key.substring(keyIndex+1,key.indexOf(']',keyIndex));
				key = key.substring(0,keyIndex).replace(/\.| /g,'_');
				if(!arr[key]){
					arr[key]=[];
				}
				if(subkey === ""){
					arr[key].push(value);
				}else{
					arr[key][subkey]=value;
				}
			}else{
				arr[key.replace(/\.| |\[/g,"_")] = value;
			}
		}
	}
}
```
---------------------------------------
*[Matteo]()* on 2010-11-17 10:08:47  
using the function as described above, this string

"name=98_20&id_azienda=3&id_sede=12&revisione=0&selectFolder=linee&module_from=98_20&id_from=&id_orig=0&nome=Promemoria+pianificazione+prossimo+audit&descrizione=Promemoria+per+la+necessit%E0+di+pianificare+il+prossimo+audit&id_assegnatario=1&nome_assegnatario=SYSTEM"

causes a "malformed URI sequence" error.

How can we solve it? I do not see any error in the query string.
---------------------------------------
*[David Pesta](davidpesta.com)* on 2012-01-02 04:19:49  
tl;dr - On line 89, change [] to {} so that it reads: eval(evalStr + ' = {};');

Many of the array functions in the php.js library return javascript objects instead of javascript arrays, which is good. Javascript objects are much more PHPish than javascript arrays. But this function returns a javascript array instead of a javascript object, which can lead to unexpected problems if you are expecting this to behave like PHP (namely, a large number as a key will cause the javascript array to add null values in all of its indexes up to the value of that key, where in PHP it won't do that--pretty frustrating). To fix this, simply replace the [] with {} inside the eval on line 89 where the parent "arrays" are iteratively created. This will make it create objects instead.
---------------------------------------
*[jeicquest]()* on 2012-05-29 15:04:23  
line:24+ 
```
reset = 0,
```
line:80-90
```
for (j = 0; j < keys.length; j++) {
                    key = keys[j];
                    if ((key !== '' && key !== ' ') || j === 0) {
                        key = "'" + key + "'";
                    } else {
                        key = "'" + reset + "'";
                        reset++;
                        //key = eval(evalStr + '.push([]);') - 1;
                    }
                    evalStr += '[' + key + ']';
                    if (j !== keys.length - 1 && eval('typeof ' + evalStr) === 'undefined') {
                        eval(evalStr + ' = {};');
                        reset = 0;
                    }
                }
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-22 06:21:03  
@Matteo: Your escape sequence (i.e., the part with "necessit%E0") is not using UTF-8. That is what JavaScript uses, and really what you should render in PHP (via header() and content-type).

@jeicquest, @Zaide: I have hopefully taken into account your issues. Zaide, I did my own implementation in order to support multi-dimensional arrays/objects while removing eval().

@David Pesta: I agree. I have changed to an object literal instead of array.
---------------------------------------
