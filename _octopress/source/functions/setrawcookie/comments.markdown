*[Michael]()* on 2010-01-28 12:59:49  
Two notes:

1. This function is not identical to the PHP one, as the PHP one takes unix timestamp as the expiry, whereas this function takes the number of seconds between now and expiry as the input field.

2. The expiry input field must not be quoted else the 'typeof' statement will view it as a string rather then a number, which will make the field invalid and the cookie will expire at end of session.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-28 14:06:09  
@Michael: See http://github.com/kvz/phpjs/raw/master/functions/network/setrawcookie.js . Your issues I think should be fixed, though please confirm... Thanks! 
---------------------------------------
