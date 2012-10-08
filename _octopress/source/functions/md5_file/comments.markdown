*[cagri ekin]()* on 2008-02-18 04:30:03  
you may want to check this link for parse_str,

http://www.phpbuilder.com/board/showthread.php?t=10349280
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-18 10:44:05  
@ cagri ekin: I will look into it &amp; credit you accordingly if I decide to use the code. Thank you cagri!
---------------------------------------
*[php five]()* on 2008-04-10 10:42:07  
your php.js script is Amazing
---------------------------------------
*[Robert Zebedee]()* on 2009-12-15 13:51:05  
I have run your scripts and I have found a flaw the md5 that the scripts produce is of the file name not the file itself. The md5_file function in perl is the md5 of the file not the file name.
---------------------------------------
*[Robert Zebedee]()* on 2009-12-15 15:07:45  
To update my last comment it is not creating the md5 of the file name but it is not creting an md5 which matches the md5sum in bash or md5_file in perl.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-15 17:37:44  
@Robert: Could you check whether the following works? Make sure you have the latest version of file_get_contents() too. It might only work in Firefox (and not IE) though, since it relies on overrideMimeType()...

I think we need to get the file in binary form as PHP does (we currently don't by default because it is usually not as useful). But maybe we should though to reflect the PHP API...

Anyways, let us know if this approach works at least in FF... I think my regular expression is correct and necessary there to shift back everything from the private characters into the normal ASCII range...(the trick used inside file_get_contents() is documented at https://developer.mozilla.org/En/Using_XMLHttpRequest#Receiving_binary_data )

```function md5_file ( str_filename ) {
    var buf = ''; 
    buf = this.file_get_contents(str_filename, 'FILE_BINARY');
    buf = buf.replace(/[\s\S]/g, function (n) {n.charCodeAt(0) & 0xFF;});
    return buf ? this.md5(buf) : false;
}```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-15 17:53:06  
Argh, sorry, two mistakes in that one...Try this:

```function md5_file ( str_filename ) {
    var buf = ''; 
    buf = this.file_get_contents(str_filename, 'FILE_BINARY');
    return buf ? this.md5(buf).replace(/[\s\S]/g, function (n) {return n.charCodeAt(0) & 0xFF;}) : false;
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-15 18:01:36  
Nope, not that either... This should be it sorry...

```function md5_file ( str_filename ) {
    var buf = ''; 
    buf = this.file_get_contents(str_filename, 'FILE_BINARY');
    buf = buf.replace(/[\s\S]/g, function (n) {return String.fromCharCode(n.charCodeAt(0) & 0xFF);});
    return buf ? this.md5(buf) : false;
}```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-16 05:57:55  
In doing testing, we should also confirm whether md5() itself is giving correct results for the file represented as a string in PHP and our version...
---------------------------------------
*[Robert]()* on 2009-12-18 12:29:19  
I will try you last suggestion and let you know.
---------------------------------------
*[Robert]()* on 2009-12-18 13:40:34  
No joy on that still returns a different value.
---------------------------------------
*[Robert]()* on 2009-12-18 15:07:32  
It is also returning a different value every time it runs.
---------------------------------------
*[smileart](smileart.mp)* on 2010-01-06 07:57:37  
Sorry, but it's return different result than PHP md5() function. Is there any way to fix it?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-07 06:49:49  
@smileart (and @Robert too, for that matter): Sorry, but I'm not sure the technique used in file_get_contents() to get binary data works perfectly (and probably not in IE anyways--see the notes below), or perhaps the way we're using it. If someone has time, it would be useful to know whether the issue lies in our md5() implementation or in the file_get_contents(). If the problem is the latter, it would be nice to have a very short file (as short as possible) that demonstrates the issue. If the problem is the former, we should be discussing this on the md5() page.
---------------------------------------
*[Buterrip]()* on 2010-06-26 17:51:13  
Hi, hi get this function working on ff, with a diferent code from md5 of php, and md5summer, and it don't work of all in google chrome, with bad or good md5, just get undefined :S can someone help? 
---------------------------------------
*[Buterrip]()* on 2010-06-26 17:59:20  
Hi again :S i got the correct md5 if it is a text file, but not with a image... What about working on chrome? it doesn't
Ty.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-06-27 08:12:34  
@Buterrip: This was reported earlier, but not having written the function nor familiar with the algorithm, I'm not sure how to fix it. I was going to see how well the Dojo version worked as Dojo usually provides robust implementations: http://api.dojotoolkit.org/jsdoc/HEAD/dojox.encoding.digests.MD5 but haven't gotten to it. The only problem (assuming it works) is that if you want a stand-alone function, you will have to figure out how to extract it, since Dojo is part of a larger library. If you do make a stand-alone version and it is consistent with (correct) PHP, etc. behavior, we'd love to have an updated version.
---------------------------------------
*[Buterrip]()* on 2010-06-28 05:34:17  
Brett Zamir, thanks for all, i'm developing a addon for chrome, i will really need to have it in the code script or send the files to a server wich makes the md5, i have to see, if i can and i do understand chrome well i will try to do it. But thinking, in firefox we don't need this library, firefox have a service called "hash", and another one called "binarycontent" i think, to make a md5 over firefox, that's all what you need... Thanks.
---------------------------------------
*[Buterrip]()* on 2010-06-28 05:43:47  
But i still thinking the error is only on file_get_contents, because the md5 function works fine, but when don't return the binary or content data, the md5_file will not work, thinking logically.
Thank
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-06-28 12:11:41  
It is possible that the file_get_contents() method of obtaining binary data is flawed. See https://developer.mozilla.org/en/using_xmlhttprequest#Receiving_binary_data for that method and the relevant portion in file_get_contents() that refers to this. 

However, given that I believe I've tested this before and others have reported issues, I wonder whether the real issue here for you may be that you are working only with regular ASCII data in your text and thus unable to see problems with md5(). As I recall it wasn't something unusual like 4-byte characters but regular 2-byte characters in non-ASCII (or maybe unusual portions of ASCII). Sorry that I don't have time to investigate this fully myself.
---------------------------------------
*[??????? ????? ???](http://an3m1.com/)* on 2012-04-04 14:25:04  
They have done such a great job with this. This is why they are deserving of these awards. Keep up the good work.    

---------------------------------------
