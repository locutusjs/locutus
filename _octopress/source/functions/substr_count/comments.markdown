*[antimatter15](http://antimatter15.com)* on 2009-01-18 14:21:35  
Wouldn't it be faster to just use split().length-1?

```function substr_count( haystack, needle, offset, length ) {
  if(!isNaN(offset)){
    if(!isNaN(length)){
      haystack=haystack.substr(offset,length);
    }else haystack = haystack.substr(offset)
  }
  haystack = haystack.split(needle).length-1
  return haystack&lt;0?false:haystack;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-25 13:48:59  
Well we could benchmark it of course. But I think that when your doing this on really large strings, you also end up with really large arrays, that you really don't need. So my guess is that your approach will be more memory intensive don't you agree?
---------------------------------------
*[Shock](http://freecr.ru/)* on 2009-07-20 01:25:28  
// Maybe something like that?
```function substr_count( haystack, needle, offset, length ) {
    if (isNaN(offset)) {
        offset = 0;
    }
    if (isNaN(length)) {
        length = haystack.length - offset;
    }
    if (length <= 0 || (length + offset) > haystack) {
        return false
    } else {
        return haystack.substr(offset,length).split(needle).length - 1;
    }
}[/CODE
---------------------------------------
*[Shock](http://freecr.ru/)* on 2009-07-20 01:26:41  
// Maybe something like that?
```function substr_count( haystack, needle, offset, length ) {
    if (isNaN(offset)) {
        offset = 0;
    }
    if (isNaN(length)) {
        length = haystack.length - offset;
    }
    if (length <= 0 || (length + offset) > haystack) {
        return false
    } else {
        return haystack.substr(offset,length).split(needle).length - 1;
    }
}```

sorry for doublePost
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-24 12:07:57  
@ Shock: I think I would have to make the same point as here:
http://phpjs.org/functions/substr_count:559#comment_626

Don't you agree?
---------------------------------------
*[Robert Eisele](http://www.xarg.org/)* on 2011-09-05 00:04:57  
What about this optimization?

```
function substr_count(haystack, needle, offset, length) {

    haystack+= "";
    needle+= "";

    if (isNaN(offset)) {
        offset = 0;
    }
    if (isNaN(length)) {
        length = haystack.length - offset;
    }

    haystack = haystack.substr(offset, length);

    return (haystack.length - haystack.replace(new RegExp(needle, 'g'), "").length) / needle.length;
}
```
---------------------------------------
*[Rafal]()* on 2011-10-06 15:54:33  
Great!

Świetne, bardzo mi się przydało.
Greetings from Poland - Rafal

---------------------------------------
*[????? ????? ????](http://an3m1.com/)* on 2012-04-18 10:17:38  
This is a very informative article. I was looking for these things and here I found it. I am doing a project and this information is very useful me. Some things in here I have not thought about before 


---------------------------------------
*[saraanderson](http://www.flowers-magzine.com/Spring_Flowers)* on 2012-04-24 08:33:39  
Really your post is really very good and I appreciate it. It’s hard to sort the good from the bad sometimes, but I think you’ve nailed it. You write very well which is amazing. I really impressed by your post.
---------------------------------------
*[Jeremy](http://hedokse.hyves.nl/blog)* on 2012-04-24 19:42:46  
I must say, useful information for users especailly for website designers.

---------------------------------------
*[jimmyfreaky]()* on 2012-05-14 13:36:12  
Hot fix rhinestones are the latest beads and fashion accessories, which are very prominent among the ladies, this is the fashion accessory that comes in the range of every woman, and its unique design makes it beautiful and stylish. <a href="http://www.hotfixrhinestonebeads.com/">wholesale hot fix rhinestones</a>
---------------------------------------
*[jimmyfreaky](http://www.hotfixrhinestonebeads.com/)* on 2012-05-14 13:37:22  
that was amazing guyz it s very informative code i like it...
---------------------------------------
*[formal shirts](http://www.formal-shirts.co.uk/)* on 2012-05-15 10:12:29  
This is s good looping code and is working as it is being told in here. Happy to learn some basics of the coding language.
---------------------------------------
*[Thomas]()* on 2012-09-18 04:11:49  
var pos = 0 is initialized but never used.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-09-18 16:12:50  
@Thomas: Fixed in Git, thanks!
---------------------------------------
