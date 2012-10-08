*[Alfonso Jiménez]()* on 2008-03-05 09:45:56  
Hey Kevin. My second contribution is here :)

```
function strpbrk(haystack, char_list) {
   var lon = haystack.length;
   var lon_search = char_list.length;
   var ret = false;
   var stack = '';

   if(lon &gt;= lon_search) {
	if(lon == lon_search) {
	    if(haystack == char_list)
	       ret = haystack;
	} else {
	    j = 0;
	    i = 0;
	    while(i &lt; lon_search &amp;&amp; j &lt; lon &amp;&amp; !ret) {
    		if(char_list[i] == haystack[j]) {
		      i++;
		      if(i == lon_search) ret = true;
	  	}
		j++;
	    }

	     if(ret)
		for(i = (j-lon_search); i &lt; lon; i++)
			stack += haystack[i];

			if(stack != '')
				ret = stack;
	     }
         }

	return ret;
}```

Re
---------------------------------------
*[Alfonso Jiménez]()* on 2008-03-05 09:49:22  
BTW, Usage example:

```strpbrk('This is a Simple text', 'mi')```

Regards! Alfonso JimÃ©nez (http://www.alfonsojimenez.com)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-05 17:25:15  
@ Alfonso JimÃ©nez: Hi Alfonso, thanks for your second contribution &amp; the example! Only one thing, the example produces: false instead of: 'is is a Simple text.'
Maybe you can see what's going wrong?
(btw, I had to add the '{' &amp; '}'  to make it compatible with the packer)
---------------------------------------
*[Alfonso Jiménez]()* on 2008-03-05 21:23:09  
Arggg I made an error in the last example! It's &quot;is&quot; instead of &quot;mi&quot; :) If you realize &quot;mi&quot; is not in the string &quot;This is a Simple text&quot;.

I'll try to develop another contribution soon :)

Regards!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-05 23:17:06  
@ Alfonso JimÃ©nez: Oh I should have seen that.. Anyway, I've updated the function and the test page gives the correct results now:
http://kevin.vanzonneveld.net/pj_tester.php

thanks again!
---------------------------------------
