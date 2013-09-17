function HEREDOC (xmllist) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Requires E4X extension to browser (as in Mozilla)
    // %          note 2: Will not work with poorly-formed XML contents or non-E4X XML, but should work for non-CDATA-requiring text and for well-formed XML
    // %          note 3: Will need to escape any < or & respectively into &lt; or &amp; (and > in case of CDATA closing sequence ']]' then '>') (don't join them here as this might be put in X(HT)ML!)
    // %          note 4: To include multi-line whitespace, must encapsulate in an XMLList (see example), the literal form being easiest and reminiscent of HEREDOC angled brackets
    // %          note 5: As per E4X rules, {} can be used to encapsulate variables or JavaScript expressions within the HEREDOC; can use &#x7b; and
    // %          note 5: &#x7d; or easier &#123; and &#125; . Actually, one can just escape the opening curly bracket
    // %          note 6: Could be renamed HERE, etc., as the HEREDOC naming is not fixed in PHP either (or make aliases)
    // %          note 7: Unfortunately, this approach will not work to simulate the PHP 5.3+ NOWDOC; you must escape any literal curly brackets manually as mentioned above
    // %          note 8: Note, JavaScript does allow backslashes appended at the very end of the line to indicatee the line continues--this may be somewhat more convenient than concatenating each line as an independent string
    // *     example 1: var myVar = 9;
    // *     example 1: HEREDOC (<>Here is a string that could go across multiple lines and include variables thus: {myVar} or even add JavaScript thus: {Math.random()}</>);
    // *     returns 1: 'Here is a string that could go across multiple lines and include variables thus: 9 or even add JavaScript thus: 0.9957547511250214'
    return xmllist.toXMLString().replace('&gt;', '>').replace('&lt;', '<').replace('&amp;', '&');
}
