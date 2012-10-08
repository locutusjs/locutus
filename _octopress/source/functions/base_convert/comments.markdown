*[asd]()* on 2009-12-03 15:44:48  
What's the "+0" and "+''" for? I assume you're type-casting, but would it ever make a difference?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-12-14 15:37:24  
@ asd: You'd have to ask Philippe Baumann, but yes, +0 will make a difference and can prevent strange results when JavaScript automagically casts you an unexpected type : )
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-04-22 23:27:15  
I think, it would be better to handle arguments this way:

function base_convert(number, frombase, tobase){
   return parseInt(number + '', frombase | 0).toString(tobase | 0);
}

frombase and tobase should be integers. When passing some other types, like float or a numeric string, PHP converts them to integer. The bitwise OR operator does more or less the same, converts the values to number and truncates the floating part of the number.
IMO, the conversion of number arguments to string is not that important, but I left it in place.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-04-23 11:12:15  
@ Rafał Kukawski: Looking good!
http://github.com/kvz/phpjs/commit/419ceb08a367a7f2fb564ff0dc4e2cbf2bbffe96
---------------------------------------
