*[Brett Zamir]()* on 2008-12-18 01:49:13  
I think this should add the other two args...

```

strspn('42 is the answer, what is the question ...', '1234567890');
strspn(&quot;foo&quot;, &quot;o&quot;, 1, 2); // 2

function strspn(str1, str2, start, lgth){
    // http://kevin.vanzonneveld.net
    // +   original by: Valentina De Rosa
    // %        note 1: Good start, but still missing the 3rd &amp; 4th argument which came to PHP in version 4.3.0
    // *     example 1: strspn('42 is the answer, what is the question ...', '1234567890');
    // *     returns 1: 2
 
    var found;
    var stri;
    var strj;
    var j = 0;
    var i = 0;
 
    start = start ? (start &lt; 0 ? (str1.length+start) : start) : 0;
    lgth = lgth ? ((lgth &lt; 0) ? (str1.length+lgth-start) : lgth) : str1.length-start;
    str1 = str1.substr(start, lgth);

    for(i = 0; i &lt; str1.length; i++){
        found = 0;
        stri  = str1.substring(i,i+1);
        for (j = 0; j &lt;= str2.length; j++) {
            strj = str2.substring(j,j+1);
            if (stri == strj) {
                found = 1;
                break;
            }
        }
        if (found != 1) {
            return i;
        }
    }
 
    return i;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-30 10:22:59  
@ Brett Zamir: Good job man, added!
---------------------------------------
*[Orme]()* on 2011-01-07 19:20:46  
I understand that it's not in format, but using regexp in this function is faster in all browsers.
```
function strspn (str1, str2, start, lgth) {
	str1 = start ? lgth ? str1.substr(start, lgth) : str1.substr(start) : str1;
	var match = str1.match(new RegExp('^['+str2+']+'));
	return match && match[0] ? match[0].length : 0;
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-01-08 15:23:12  
@Orme: You'll need to escape str2 (e.g., by using preg_quote: http://phpjs.org/functions/preg_quote:491 ) since the RegExp could be problematic if special characters are added without escaping. Could you check whether the performance is still better after such escaping is done and then if it passes some test cases, we could accept it.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-01-08 15:34:58  
@Orme: Also, in seeing now that str2 is added within a character class in your implementation, you wouldn't need to escape as many characters--only \, ], and - should I think be enough for JS character classes, but you do need to escape them.
---------------------------------------
*[Orme]()* on 2011-01-09 15:13:52  
Hmm, I used such string as str2 -- '\0 \t\x0B' and it works fine without escaping. RegExp get already escaped string with exact characters you expect. One thing that matching should be multiline, so \m modifier should be added.
---------------------------------------
*[????? ????????](http://an3m1.com/)* on 2012-04-11 15:44:22  
Great job here. I really enjoyed what you had to say. Keep going because you definitely bring a new voice to this subject. Not many people would say what you’ve said and still make it interesting
---------------------------------------
