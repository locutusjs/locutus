*[Christian Doebler](www.tinxx.de)* on 2008-10-11 00:33:31  
function sleep (seconds) {
	seconds *= 1000;
	var start = new Date().getTime();
	while (new Date().getTime() &lt; start + seconds);
}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-13 11:31:41  
@ Christian Doebler: Thank you. I've added the function for study purposes. Because I think this implementation will lock up the browser, resulting in an unpleasant user experience. If you feel differently, please let me know.
---------------------------------------
