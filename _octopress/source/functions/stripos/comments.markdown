*[call_user_func_array]()* on 2008-03-07 15:15:15  
```
/**
 * @author Thiago Mata
 * @date 07/03/2008
 * @param callback strFunctionName
 * @param array arrParam
 * @return mixer
 * @url thiagomata.blog.com
 */
function call_user_func_array(  strFunctionName , arrParam )
{
	var strCommand = &quot;&quot;;
	var i;
	
	strCommand += &quot;return &quot; + strFunctionName + &quot;(&quot;;
	for( i = 0; i &lt; arrParam.length; ++i )
	{
		strCommand += &quot;arrParam[&quot; + i + &quot;]&quot; ;
		if( ( i + 1 ) != arrParam.length )
		{
			strCommand += &quot;,&quot;; 
		}
	}
	strCommand += &quot;)&quot;;
	var oFunction = new Function( &quot;arrParam&quot; , strCommand );
	return oFunction( arrParam );
} 
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-07 19:29:30  
@ Thiago Mata: Thanks alot, I've added the function!
---------------------------------------
*[Onno Marsman]()* on 2008-10-04 17:41:10  
Improved to accept things other than strings. Also &quot;if(f_offset == undefined) {&quot; seemed useless since indexOf accepts undefined as a 0 anyway. Also changed &gt; -1 to !== -1, to increase performance a tiny bit.

```
function stripos ( f_haystack, f_needle, f_offset ) {
    var haystack = (f_haystack+'').toLowerCase();
    var needle = (f_needle+'').toLowerCase();
    var index = 0;

    if ((index = haystack.indexOf(needle, f_offset)) !== -1) {
        return index;
    }
    return false;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 12:08:20  
@ Onno Marsman: Processed. Thank you!
---------------------------------------
