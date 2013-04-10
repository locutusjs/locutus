//parameter limit is optional (default value is -1)
//paramater pattern is a string type
//ex: preg_replace("/Hello/i","Hi",strtoreplace)
function preg_replace(pattern, replacement, subject, limit){
    // http://kevin.vanzonneveld.net
    // +   original by: Ferdinand Silva
    // *     example 1: preg_replace('/van/', '', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin  Zonneveld'

    // UNFINISHED
    // We should take a very serious look at Steve Levithan's XRegExp which implements Unicode classes and two extra flags: http://blog.stevenlevithan.com/archives/xregexp-javascript-regex-constructor
    // Before finding this, I was working on a script to search through an SQLite database to build our Unicode expressions automatically; I may finish that as it should be expandable for the future, and be an extra eye to confirm Steve's work
    // Also need to look at/integrate with Michael Grier's http://mgrier.com/te5t/preg_match_all.js ; http://mgrier.com/te5t/testpma.html ; http://mgrier.com/te5t/testpma.php

    // We also need to get rid of eval usage!

    if(typeof limit == "undefined") limit=-1;
    if (subject.match(eval(pattern))) {
        if (limit == -1) { //no limit
            return subject.replace(eval(pattern + "g"), replacement);
        } else {

            for(x=0;x<limit;x++)
            {
                subject=subject.replace(eval(pattern),replacement);
            }

            return subject;
        }
    } else {
        return subject;
    }
}
