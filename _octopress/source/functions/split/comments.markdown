*[Constantin razvan_bc@yahoo.com]()* on 2008-07-25 10:22:15  
===============================
very nice ideea to do this,

But your script is working ...
```
&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML 4.0 Transitional//EN&quot;&gt;&lt;HTML&gt;
&lt;HEAD&gt;
&lt;TITLE&gt;&lt;/TITLE&gt;
&lt;style&gt;&lt;/style&gt;
&lt;/HEAD&gt;
&lt;BODY&gt;
  &lt;SCRIPT LANGUAGE=&quot;JavaScript&quot;&gt;
  &lt;!--
  function explode( delimiter, string) {
    if ( arguments.length &lt; 2
        || typeof arguments[0] == 'undefined'
        || typeof arguments[1] == 'undefined' )
    {
        return null;
    }
 
   
        // support for limit argument
        var splitted = string.toString().split(delimiter.toString());
        var partA = splitted.splice(0, splitted.length - 1);
        var partB = splitted.join(delimiter.toString());
        //while(partA.indexOf(delimiter) != -1) 
		partA.push(partB);
        return partA;
   
}
	function split( delimiter, string) {
		return explode( delimiter, string );
	}



	str1='25-Lug-2008|26-Lug-2008|27-Lug-2008|28-Lug-2008|';
	var str=split('|',str1);
	for(var i=0;i&lt;str.length;i++)
	document.writeln(str[i]+&quot;&lt;br&gt;&quot;);
  //--&gt;
  &lt;/SCRIPT&gt;
&lt;/BODY&gt;&lt;/HTML&gt;
```
---------------------------------------
*[Constantin razvan_bc@yahoo.com]()* on 2008-07-25 10:24:55  
===============================&lt;br&gt;
very nice ideea to do this,

But your script NOW is working ...&lt;br&gt;
```
&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML 4.0 Transitional//EN&quot;&gt;&lt;HTML&gt;
&lt;HEAD&gt;
&lt;TITLE&gt;&lt;/TITLE&gt;
&lt;style&gt;&lt;/style&gt;
&lt;/HEAD&gt;
&lt;BODY&gt;
  &lt;SCRIPT LANGUAGE=&quot;JavaScript&quot;&gt;
  &lt;!--
  function explode( delimiter, string) {
    if ( arguments.length &lt; 2
        || typeof arguments[0] == 'undefined'
        || typeof arguments[1] == 'undefined' )
    {
        return null;
    }
 
   
        // support for limit argument
        var splitted = string.toString().split(delimiter.toString());
        var partA = splitted.splice(0, splitted.length - 1);
        var partB = splitted.join(delimiter.toString());

		partA.push(partB);
        return partA;
   
}
	function split( delimiter, string) {
		return explode( delimiter, string );
	}



	str1='25-Lug-2008|26-Lug-2008|27-Lug-2008|28-Lug-2008|';
	var str=split('|',str1);
	for(var i=0;i&lt;str.length;i++)
	document.writeln(str[i]+&quot;&lt;br&gt;&quot;);
  //--&gt;
  &lt;/SCRIPT&gt;
&lt;/BODY&gt;&lt;/HTML&gt;
```
---------------------------------------
