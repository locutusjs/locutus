*[penutbutterjelly]()* on 2008-03-21 23:43:46  
Why the zchmook doesn't this one support arrays as input, your str_replace does :/
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-23 11:07:55  
@ penutbutterjelly: I can see why that looks weird. It's because the code was made by different people though. But I've adjusted str_ireplace to match the behaviour of it's brother str_replace. Thanks for noticing!
---------------------------------------
*[Philipp Lenssen](http://www.coverbrowser.com)* on 2009-10-07 08:11:01  
This doesn't seem to escape special regex characters, hence it doesn't work when replacing e.g. "$" with "foo", or am I missing something". The following function might help, though I still ran into problems with replacing ">"...

```
Misc.escapeRegex = function(s) {
    return s.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, '\\$1');
}
```
---------------------------------------
*[Philipp Lenssen](http://www.coverbrowser.com)* on 2009-10-07 08:22:21  
(My suggested fix should work fine, the ">" problem was something else...)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-09 11:15:31  
@ Philipp Lenssen: Great find! Fixed it. thanks a lot!
---------------------------------------
*[Leandro Angelo]()* on 2010-07-22 22:51:23  
Boa funciona legal, e igual o str_ireplace do PHP
---------------------------------------
*[Monski]()* on 2011-02-22 06:11:30  
if you want to replace certain words only..
tweak line 63
```
reg = new RegExp("\\b"+escapeRegex(search[i]) + "\\b", 'gi'); //reg = new RegExp(escapeRegex(search[i]), 'gi');
```
sample = str_ireplace('H', 'Hi', 'H HeLLo');

will retur "Hi Hello"
---------------------------------------
*[archive0001]()* on 2011-03-04 22:44:11  
this function has a bug. the ``` search += '';``` at line 28 will destroy the param ```search``` as an array. You should add a condition like ```if (!(search instanceof Array))search += '';```

---------------------------------------
*[test test](test)* on 2011-07-05 12:23:28  
```
your_stuff('here');
```

---------------------------------------
*[???? ????](http://an3m1.com/)* on 2012-04-10 09:54:07  
Write more, that’s all I have to say. Literally, it seems as though you relied on the video to make your point. You clearly know what you’re talking about, why waste your intelligence on just posting videos to your blog when you could be giving us something enlightening to read 
---------------------------------------
