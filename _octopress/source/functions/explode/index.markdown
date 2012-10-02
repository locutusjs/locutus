---
layout: page
title: "JavaScript explode function"
comments: true
sharing: true
footer: true
alias:
- /functions/explode:396
- /functions/396
---
A JavaScript equivalent of PHP's explode

{% codeblock strings/explode.js lang:js https://raw.github.com/kvz/phpjs/master/functions/strings/explode.js raw on github %}
function explode (delimiter, string, limit) {

    if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
	if ( delimiter === '' || delimiter === false || delimiter === null) return false;
	if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
		return { 0: '' };
	}
	if ( delimiter === true ) delimiter = '1';
	
	// Here we go...
	delimiter += '';
	string += '';
	
	var s = string.split( delimiter );
	

	if ( typeof limit === 'undefined' ) return s;
	
	// Support for limit
	if ( limit === 0 ) limit = 1;
	
	// Positive limit
	if ( limit > 0 ){
		if ( limit >= s.length ) return s;
		return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
	}

	// Negative limit
	if ( -limit >= s.length ) return [];
	
	s.splice( s.length + limit );
	return s;
}
{% endcodeblock %}

 - [view on github](https://github.com/kvz/phpjs/blob/master/functions/strings/explode.js)
 - [edit on github](https://github.com/kvz/phpjs/edit/master/functions/strings/explode.js)
