*[marrtins]()* on 2008-02-08 02:21:59  
Hi!

It seems, that php.packed.js is broken. Firebug reports: unmatched ) in regular expression
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-08 16:04:45  
@ marrtins: Thank you, it was an incompatibility between the updated addslashes &amp; stripslashes functions and Dean Edward's Packer.

Fixed by putting the regexes between quotes.
---------------------------------------
