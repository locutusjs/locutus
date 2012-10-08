*[Steve Hilder]()* on 2008-05-08 17:24:41  
Err... this doesn't work at all; it only evaluates the first character.

```strcmp('test', 'tomato') = 0 /* incorrect */```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-08 22:16:21  
@ Steve Hilder: I must say I'm not very familiar with this specific function, but I did some reading up on it, and I think I agree that in it's current form it makes no sense. I've updated it so calculate every character in both strings, this is better right.
---------------------------------------
*[gorthaur]()* on 2008-06-18 20:14:20  
You gotta be kidding! This code is unbelievably silly and displays gross lack of understanding string comparison. Try these test cases
```
strcmp( 'waldo', 'owald' );
strcmp( 'owald', 'waldo' );
```
which should return +1 and -1.
This should work:
```
function strcmp ( str1, str2 ) {
    return ( ( str1 == str2 ) ? 0 : ( ( str1 &gt; str2 ) ? 1 : -1 ) );
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-06-18 22:49:20  
@ gorthaur: I must admit I personally never use this function in PHP. Thanks for improving php.js.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-28 17:04:11  
Here's a related one...

```
function strncmp ( str1, str2, lgth ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // +      input by: Steve Hilder
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: gorthaur

    s1 = str1.substr(0, lgth);
    s2 = str2.substr(0, lgth);
    return ( ( s1 == s2 ) ? 0 : ( ( s1 &gt; s2 ) ? 1 : -1 ) );
}
alert(strncmp('aaa', 'aab', 2)); // 0
alert(strncmp('aaa', 'aab', 3)); // -1```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-01 22:05:04  
@ Brett Zamir: sweet!
---------------------------------------
*[narendra](www.systech.com)* on 2009-04-08 11:10:41  
just fun
---------------------------------------
*[coderjoe](http://www.coderjoe.net)* on 2009-07-24 23:31:02  
Couldn't this use ECMA-262's String.prototype.localeCompare function?

```
function strcmp ( str1, str2 ) {
    // Binary safe string comparison  
    // using ECMA-262 section 15.5.4.9
    // String.prototype.localeCompare    
    return str1.localeCompare(str2);
}
```

---------------------------------------
*[coderjoe](http://www.coderjoe.net)* on 2009-07-24 23:31:23  
Couldn't this use ECMA-262's String.prototype.localeCompare function?

```
function strcmp ( str1, str2 ) {
    // Binary safe string comparison  
    // using ECMA-262 section 15.5.4.9
    // String.prototype.localeCompare    
    return str1.localeCompare(str2);
}
```

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-07-29 03:08:54  
@coderjoe: Up until you mentioned it, we were using strcoll() to do this, since that is PHP's locale-specific version; however, in SVN, I just changed the behavior of strcoll() to avoid using this built-in but non-transparent JS locale-aware sort function in favor of letting strcoll()'s behavior be configurable through setlocale() (which I also just modified--LC_COLLATE to be specific). This will let people set the locale to whatever locale they wish (though we currently only have an English collating function implemented in setlocale()).
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-04 11:29:23  
@ coderjoe & Brett Zamir: awesome : )
---------------------------------------
