*[Timo]()* on 2012-08-18 06:20:00  
pathinfo("htaccess", PATHINFO_FILENAME) in PHP returns "htaccess",
but pathinfo("htaccess", 'PATHINFO_FILENAME') in JS returns "".
---------------------------------------
*[Rafa?]()* on 2012-08-18 08:44:27  
@Timo: thanks for the report. I think, I've managed to fix it. Check github for latest changes.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-09-18 17:23:57  
@Timo, Rafał: there were a few other issues I noticed when comparing to PHP. Should now be fixed.
---------------------------------------
