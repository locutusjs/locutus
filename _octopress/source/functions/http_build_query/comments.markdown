*[marrtins]()* on 2008-03-02 06:03:30  
Hello!

I got syntax errors on IE6:
const CASE_LOWER = 0;
const CASE_UPPER = 1;

raplacing with
var CASE_LOWER = 0;
var CASE_UPPER = 1;

works fine
---------------------------------------
*[Legaev Andrey]()* on 2008-03-02 07:20:24  
Hi!

Key can contain no-ascii character too, and encodeURIComponent() is more appropriate function.

Please, replace code
```
use_key = key;
use_val = encodeURI(formdata[key].toString());
use_val = use_val.replace('%20', '+');
```
by following:
```
use_key = encodeURIComponent(key);
use_val = encodeURIComponent(formdata[key].toString());
```
Key can contain no-ascii character too, and encodeURIComponent() is more appropriate function.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 12:15:50  
Legaev Andrey: Thank you, still needed the

```
use_val = use_val.replace('%20', '+');
```

though, apparently encodeURIComponent does not produce php compatible encoded ouput
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 12:22:44  
@ marrtins: Thanks for contributing!
---------------------------------------
*[Michael White]()* on 2008-03-02 18:31:28  
Ah - I ran into that problem where the output of encodeURI was incompatible with PHP as well about two months ago.

You have to use escape() instead. PHP likes this one. I've used it for a while in my own Ajax requests.
---------------------------------------
*[Michael White]()* on 2008-03-02 18:37:21  
Ooops - forgot the code block....


Replace....
```
use_key = encodeURIComponent(key);
use_val = encodeURIComponent(formdata[key].toString());
use_val = use_val.replace('%20', '+');
```

```
use_key = escape(key);
use_val = escape(formdata[key].toString());
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 19:29:30  
@ Michael White: Done
---------------------------------------
*[Michael White]()* on 2008-03-02 21:41:03  
One more little note:

Replace:
```
use_val = use_val.replace('%20', '+');
```

with:
```
use_val = use_val.replace(/%20/g, '+');
```

The original version only replaces a single instance of the string. Using the regular expression with /g at the end tells it to replace &quot;globally&quot; meaning every instance of %20 in the string.

http://crestidg.com
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-03 11:46:40  
@ Michael White: fixed!
---------------------------------------
*[Michael White]()* on 2008-03-14 02:29:20  
Well I just found out that escape() is actually not the best thing to use for this function. encodeURIComponent() seems to be required here. The reason behind this is that a literal + sign does not get escaped by escape() and so gets &quot;lost in translation&quot; when working in PHP. I never would have discovered this if I had not been sending values that were either a + or - sign. I have no idea if there are any other characters affected by this at this time. My apologies to anyone who may be affected by this; I thought that escape() worked properly until now.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-14 08:27:49  
@ Michael White: thanks for pointing that out Michael!
---------------------------------------
*[Michael White]()* on 2008-03-14 17:28:21  
No problem. Did you get my email from a couple of days ago? Also, I left a bugfix on the print_r() function that doesn't seem to have been noticed yet.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-15 11:57:05  
@ Michael White: Thanks for bringing it to my attention, yeah your mail is quite big so I saved it for this weekend ;) I'll get back to you today or tomorrow, cheers
---------------------------------------
*[stag019]()* on 2009-03-30 03:43:46  
This function fails to handle anything more than one deep, as well as it doesn't handle boolean values the way PHP does.

```
function http_build_query(formdata, numeric_prefix, arg_separator) {
    var key, tmp = [],
    _http_build_query_helper = function (key, val, arg_separator) {
        var k, tmp = [];
        if (val === true) {
            val = "1";
        }
        else if (val === false) {
            val = "0";
        }
        if (typeof(val) == "array" || typeof(val) == "object") {
            for(k in val) {
                if(val[k] !== null) {
                    tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
                }
            }
            return tmp.join(arg_separator);
        }
        else if(typeof(val) != "function") {
            return urlencode(key) + "=" + urlencode(val);
        }
    };
    if (!arg_separator) {
        arg_separator = "&";
    }
    for (key in formdata) {
        if (numeric_prefix && !isNaN(key)) {
            key = String(numeric_prefix) + key;
        }
        tmp.push(_http_build_query_helper(key, formdata[key], arg_separator));
    }
    return tmp.join(arg_separator);
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-03 13:22:28  
@ stag019: Nice! But I can only replace the current with your implementation if it doesn't break the second example (it does now).
---------------------------------------
*[stag019]()* on 2009-04-05 20:20:16  
D'oh.

Change line 2 from "var key, tmp = []," to "var value, key, tmp = [],".
Add "value = formdata[key];" under line 26.
Change line 30 (or new line 31 if you've added the previous line from "tmp.push(_http_build_query_helper(key, formdata[key], arg_separator));" to "tmp.push(_http_build_query_helper(key, value, arg_separator));".

That should fix'er.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-14 12:02:53  
Alright! Nice! Saved it in SVN and will be online & packaged shortly
---------------------------------------
*[Dreamer]()* on 2010-10-22 10:33:11  
Bug report: this.urlencode is not a function

Related to php.default.namespaced.min.js version 3.19

```
var $P = new PHP_JS();
$P.http_build_query({foo: 'bar'});
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-10-22 22:04:04  
@Dreamer: Thanks for the report; should be fixed in Git: http://github.com/kvz/phpjs/raw/master/functions/url/http_build_query.js . Let us know if that works...
---------------------------------------
*[Dreamer]()* on 2010-10-23 11:41:22  
@Brett Zamir: It works now.
---------------------------------------
*[Click Button Publishing](140plus.2et.in)* on 2011-11-07 12:43:14  
We are using this code to format our URL and it is superb. Thanks phpJS :)
---------------------------------------
*[Tom ](www.olivagreca.com)* on 2012-05-12 11:04:41  
Hello guys,
I am trying to produce a query string like:
//localhost:8080/select/?q=patata&model:journal+model:member+model:new_member+model:book

But when i am using the below code block i have an output like:
//localhost:8080/select/?q=patata&model:journal

How can i use repetitive pair values?

Thank you in advance
 
```
<script type="text/javascript">
var a = "member";
	var b = "new_member";
		var c = "book";
			var d = "journal";
				var e = "cds";
					var f = "pdfs";
	
function http_build_query (formdata, numeric_prefix, arg_separator) {	
    var value, key, tmp = [],
        that = this;

    var _http_build_query_helper = function (key, val, arg_separator) {
        var k, tmp = [];
        if (val === true) {
            val = "1";
        } else if (val === false) {
            val = "0";
        }
        if (val != null) {
            if(typeof(val) === "object") {
                for (k in val) {
                    if (val[k] != null) {
                        tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
                    }
                }
                return tmp.join(arg_separator);
            } else if (typeof(val) !== "function") {
                return that.urlencode(key) + ":" + that.urlencode(val);
            } else {
                throw new Error('There was an error processing for http_build_query().');
            }
        } else {
            return '';
        }
    };

    if (!arg_separator) {
        arg_separator = "&";
    }
    for (key in formdata) {
        value = formdata[key];
        if (numeric_prefix && !isNaN(key)) {
            key = String(numeric_prefix) + key;
        }
        var query=_http_build_query_helper(key, value, arg_separator);
        if(query != '') {
            tmp.push(query);
        }
    }

    return tmp.join(arg_separator);
}

function urlencode (str) {
str = (str + '').toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
	

var aa = http_build_query({'model': a, 'model': b, 'model': c, 'model': d}, '', '+');
	var value= "patata&";
		var qurl = "//localhost:8080/select/?q=" + value + aa
		
console.log(qurl);

</script>
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-16 08:17:54  
@Click Button Publishing: Glad to hear it is working for you! (I'm trying to help catch up on old messages one-by-one.)
---------------------------------------
