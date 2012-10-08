*[Martijn Wieringa]()* on 2008-03-01 18:41:23  
The args 'f_version' is missing in the function definition.

I've added this tag to fix the following problem:

When you're comparing numbers in a string.. like:

&quot;Price 12.9&quot;
&quot;Price 12.15&quot;

You want: &quot;Price 12.9&quot; &gt; &quot;Price 12.15&quot;.

Yet when you use numbers to indicate version numbers.. Like

&quot;Version 12.9&quot;
&quot;Version 12.15&quot;

You want: &quot;Price 12.9&quot; &lt; &quot;Price 12.15&quot;.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-01 21:01:31  
@ Martijn Wieringa: Though our aim has always been to copy the PHP specs of all the functions as strict as possible, I could see why you would want this functionality. And given the fact that not using the extra parameter doesn't effect it's behaviour, I will be happy to  make an exception in this case. Thanks again
---------------------------------------
