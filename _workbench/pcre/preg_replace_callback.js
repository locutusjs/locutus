function preg_replace_callback(pattern, callback, subject, limit) {
    // http://kevin.vanzonneveld.net
    // +   original by: James Brumond (http://kbjrweb.com/)
    // *     example 1:
    // *     returns 1:

    // Note: We should take a very serious look at Steve Levithan's XRegExp which implements Unicode classes and two extra flags: http://blog.stevenlevithan.com/archives/xregexp-javascript-regex-constructor
    // We also need to get rid of eval usage!

	// Run variable tests
	if (typeof pattern !== 'string') {return false;}
	if (typeof callback !== 'function') {return false;}
	if (typeof subject !== 'string') {return false;}
	if (typeof limit === 'undefined') {limit = -1;}
	if (typeof limit !== 'number') {return false;}

	// Get the RegExp object
	pattern = eval(pattern);

	// Make sure there are matches
	if (pattern.test(subject)) {
		var modified = '';

		// Loop until we reach our limit, or, if no limit, loop forever
		for (var i = 0; (i < limit || limit === -1); i++) {
			// Get the next match
			var match = subject.match(pattern);

			// Make sure we found a match
			if (match === null) {break;}

			// Explode the string at the match point
			subject = subject.split(match[0], 2);

			// Do the replacement
			modified += subject[0] + callback(match);
			subject = (subject[1] || '');
		}

		subject = modified + subject;
	}
	return subject;
}
