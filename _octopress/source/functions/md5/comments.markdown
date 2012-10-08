*[Ates Goral]()* on 2008-01-18 05:53:21  
A while back, I had published a function called phpSerialize() (that does what the PHP serialize() function does) at http://magnetiq.com/2006/07/30/php-style-serialization-of-javascript-objects/

Here's the code copied here:

```
/* Returns the class name of the argument or undefined if
   it's not a valid JavaScript object.
*/
function getObjectClass(obj)
{
    if (obj &amp;&amp; obj.constructor &amp;&amp; obj.constructor.toString)
    {
        var arr = obj.constructor.toString().match(
            /function\s*(\w+)/);

        if (arr &amp;&amp; arr.length == 2)
        {
            return arr[1];
        }
    }

    return undefined;
}

/* Serializes the given argument, PHP-style.

   The type mapping is as follows:

   JavaScript Type    PHP Type
   ---------------    --------
   Number             Integer or Decimal
   String             String
   Boolean            Boolean
   Array              Array
   Object             Object
   undefined          Null

   The special JavaScript object null also becomes PHP Null.
   This function may not handle associative arrays or array
   objects with additional properties well.
*/
function phpSerialize(val)
{
    switch (typeof(val))
    {
    case &quot;number&quot;:
        return (Math.floor(val) == val ? &quot;i&quot; : &quot;d&quot;) + &quot;:&quot; +
            val + &quot;;&quot;;
    case &quot;string&quot;:
        return &quot;s:&quot; + val.length + &quot;:\&quot;&quot; + val + &quot;\&quot;;&quot;;
    case &quot;boolean&quot;:
        return &quot;b:&quot; + (val ? &quot;1&quot; : &quot;0&quot;) + &quot;;&quot;;
    case &quot;object&quot;:
        if (val == null)
        {
            return &quot;N;&quot;;
        }
        else if (&quot;length&quot; in val)
        {
            var idxobj = { idx: -1 };

            return &quot;a:&quot; + val.length + &quot;:{&quot; + val.map(
                function (item)
                {
                    this.idx++;

                    var ser = phpSerialize(item);

                    return ser ?
                        phpSerialize(this.idx) + ser :
                        false;
                }, idxobj).filter(
                function (item)
                {
                    return item;
                }).join(&quot;&quot;) + &quot;}&quot;;
        }
        else
        {
            var class_name = getObjectClass(val);

            if (class_name == undefined)
            {
                return false;
            }

            var props = new Array();

            for (var prop in val)
            {
                var ser = phpSerialize(val[prop]);

                if (ser)
                {
                    props.push(phpSerialize(prop) + ser);
                }
            }
            return &quot;O:&quot; + class_name.length + &quot;:\&quot;&quot; +
                class_name + &quot;\&quot;:&quot; + props.length + &quot;:{&quot; +
                props.join(&quot;&quot;) + &quot;}&quot;;
        }
    case &quot;undefined&quot;:
        return &quot;N;&quot;;
    }

    return false;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-18 11:13:03  
@ Ates Goral: I've added it to my queue. You can check out RSS to see when it gets added here. Thank you for that masterpiece!
---------------------------------------
*[Eric]()* on 2008-01-28 02:34:39  
I think it'd be fantastic to see these functions coupled with some performance measurements, both so we can see areas need optimization and to help people understand which operations are unrealistically expensive.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-29 21:00:09  
@ Eric: Interesting thought. 
But that would mean maintaining multiple versions of the same function, just to be able to do a 'solid' benchmark (by eliminating as many variables such as platform, browser, processor, etc. between your workstation and mine). 

And storing and maintaining different versions for the sole purpose of a micro benchmark would slow the project down in this phase, I think.

So for now, I think I'll leave it up to the community to suggest speed improvements instead.

But thanks for your input, very much appreciated!
---------------------------------------
*[Philip Andrew]()* on 2008-01-30 08:04:45  
This is a good idea if you want to combine it with Aptana JAXER then it makes JAXER more like PHP.
http://www.aptana.com/jaxer/
---------------------------------------
*[Evil Angelica]()* on 2008-02-06 20:32:17  
```alert:(You Have Been H4x0r3D! By Evil Angelica
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-07 00:12:29  
@ Evil Angelica: Guess I haven't.. Do you have any idea what hacking is?
---------------------------------------
*[Wetter](http://www.in-wetter.at)* on 2008-11-15 17:14:49  
It is very useful article - exactly this I find long time. Thank you.
---------------------------------------
*[Rob]()* on 2009-06-07 19:26:20  
Should the dependency be used even if the page encoding is already set to utf-8 through the Content-Type meta tag?
---------------------------------------
*[pilus](NONE)* on 2009-06-10 20:28:26  
Sorry if I sound kinda lame coz I am, but what about the second argument to php's md5()  that returns raw binary data ? how could I do that in JS ? Anyone know ?
---------------------------------------
*[ion]()* on 2010-11-25 07:24:19  
you can take a look at this site: http://md5hashdecrypter.com/decrypt.php
---------------------------------------
*[Rob]()* on 2010-12-20 23:57:48  
There's a minor bug in convertToWordArray() that causes the word array input to the MD5 function to have null values. JavaScript does the right thing anyway, but it may not be desired behavior. Here's one fix:

```
var convertToWordArray = function (str) {
	var lWordCount;
	var lMessageLength = str.length;
	var lNumberOfWords_temp1=lMessageLength + 8;
	var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
	var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
	var lWordArray=new Array(lNumberOfWords-1);
	/* Initialize lWordArray */
	var i = lWordArray.length; while ( i-- ) { lWordArray[i] = 0; }
	var lBytePosition = 0;
	var lByteCount = 0;
	while ( lByteCount < lMessageLength ) {
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
		lByteCount++;
	}
	lWordCount = (lByteCount-(lByteCount % 4))/4;
	lBytePosition = (lByteCount % 4)*8;
	lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
	lWordArray[lNumberOfWords-2] = lMessageLength<<3;
	lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
	return lWordArray;
};
```

Also, addUnsigned can be shortened up a lot if you're willing to bet on JavaScript not changing its behavior. Since JavaScript currently has 53 bits of precision for its number type, you can change addUnsigned to:

```
var addUnsigned = function (lX,lY) {
	var x = lX + lY;
	return x < 0xFFFFFFFF ? x : x - 0x100000000;
};
```

Since addUnsigned is an innermost function, that might or might not be a desirable change. I've tested it with known MD5 values on several browsers and they've all handled it correctly.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-12-22 05:58:09  
@Rob: Hi Rob, thanks for your input. Someone claimed that unlike ours, http://pajhome.org.uk/crypt/md5/ (under a BSD license) works correctly with non-ASCII characters. Do you have the inclination to test that for us? I'd hate to make patches if we should be working on another code base instead. 
---------------------------------------
*[Steve]()* on 2011-06-22 14:02:51  
This js will not work with long string and will not handle string containing "&" symbols. 
---------------------------------------
*[???? ????](http://an3m1.com/)* on 2012-04-18 10:19:40  
Write more, that’s all I have to say. Literally, it seems as though you relied on the video to make your point. You clearly know what you’re talking about, why waste your intelligence on just posting videos to your blog when you could be giving us something enlightening to read  

---------------------------------------
*[AngelFcM](localhost)* on 2012-05-19 20:09:47  
I tried use it in the console web of Firefox but returns me the next error.
 
[13:07:48.759] TypeError: this.utf8_encode is not a function

???
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-16 04:42:20  
@AngelFcM: there is a dependency listed; you have to add the utf8_encode() function---but I should warn you that this function does not seem to behave properly, at least like in PHP, or at least for non-ASCII. http://pajhome.org.uk/crypt/md5/  claims to do this, so I'd like to see if we could test to confirm. 
---------------------------------------
