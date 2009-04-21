function HEREDOC (xmllist) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// %          note 1: Requires E4X extension to browser (as in Mozilla)
	// %          note 2: To include multi-line whitespace, must encapsulate in an XMLList (see example), the literal form being easiest and reminiscent of HEREDOC angled brackets
	// %          note 3: As per E4X rules, {} can be used to encapsulate variables within the HEREDOC
	// %          note 4: Could be renamed HERE, etc., as the HEREDOC naming is not fixed in PHP either
    // *     example 1: var myVar = 9;
    // *     example 1: HEREDOC (<>Here is a string that could go across multiple lines and include variables thus: {myVar} or even add JavaScript thus: {Math.random()}</>);
    // *     returns 1: 'Here is a string that could go across multiple lines and include variables thus: 9 or even add JavaScript thus: 0.9957547511250214'
	return xmllist.toString();
}