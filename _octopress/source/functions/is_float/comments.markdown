*[WebDevHobo](http://webdevhobo.blogspot.com)* on 2009-12-13 09:24:02  
Nevermind my comments, I just now noticed in the docs the text about the 1.0 issue. :P
---------------------------------------
*[Enrique Melendez](http://www.ita.es)* on 2011-03-23 11:13:04  
version in one line:
```
return typeof mixed_var == 'number' ? !!(mixed_var % 1) : false;
```
---------------------------------------
*[CoursesWeb](http://www.coursesweb.net)* on 2012-04-30 08:40:35  
Hi,
For is_float i use this version:
```
function is_float(n) {
  return n===+n && n!==(n|0);
}
```
 - is_float() doesn't always work if you are validating form input. This is because form inputs are strings, even if the user typed a number.
---------------------------------------
