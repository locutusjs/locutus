*[N.Neuman](nneuman.net)* on 2011-11-27 16:56:13  
```
fullline = this.php_js.resourceData[handle.id].slice(start, this.php_js.resourceData[handle.id].indexOf('\n', start) + 1);
```
I would change \n to \r\n as in a spreadsheet, \r\n is the end of a line whereas \n is a new line that is legitimate in the middle of a cell.
---------------------------------------
*[Theriault]()* on 2011-12-02 20:54:48  
@N.Neuman: You are correct that this function is broken, but based on this spec (http://tools.ietf.org/html/rfc4180), a CRLF (\r\n) can appear inside a field also. In order to fix this function, it needs to find a CRLF outside of double-quotation marks to be the EOL. Additionally, I'd likely keep it searching only for a LF (\n) also, as Unix-like systems usually only use this character for EOL. Thank you for finding this. I'll see if I can fix it later.
---------------------------------------
*[????? ???](http://an3m1.com/)* on 2012-04-18 10:16:16  
I have a lot to benefit from this article and thank you for this wonderful effort to this article and will continue my many articles you have other   

---------------------------------------
