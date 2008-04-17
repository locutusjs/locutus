function str_replace(search, replace, subject) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'

    var __regexp_escape = function(text) {
        if (!arguments.callee.sRE) {
            var specials = [
                '/', '.', '*', '+', '?', '|',
                '(', ')', '[', ']', '{', '}', '\\'
            ];
            arguments.callee.sRE = new RegExp(
                '(\\' + specials.join('|\\') + ')', 'g'
            );
        }
    	return text.replace(arguments.callee.sRE, '\\$1');
    };

    var numreplx, numon, fincods, k;
	 
    if(!(replace instanceof Array)){
        replace = new Array(replace);
        if(search instanceof Array){
            // If search is an array and replace is a string, 
            // then this replacement string is used for every value of search
            while(search.length>replace.length){
                replace[replace.length]=replace[0];
            }
        }
    }
 
    if(!(search instanceof Array)){
        // put search string in an array anyway
        search = new Array( search );
    }
    while( search.length > replace.length ){ 
        // If replace has fewer values than search, 
        // then an empty string is used for the rest of replacement values
        replace[replace.length] = '';
    }
 
    if(subject instanceof Array){
        // If subject is an array, then the search and replace is performed 
        // with every entry of subject , and the return value is an array as well.
        for(k in subject){
            subject[k] = str_replace(search, replace, subject[k]);
        }
        return subject;
    }
    	
    // Each entry was originally replaced one after another, rather than all at once. 
    // This created a problem: str_replace(["{name}","l"], ["hello","m"], "{name}, lars")
    // Theoretically, the code should return "hello, mars", but instead it returned "hemmo, mars"
    // as pointed out and fixed by Philip Peterson:
    numreplx = search.length;
    numon = 0;
    fincods = new Array();
    while( fincods.length < numreplx ){
        nsub = subject;
        for( x = 0; x < fincods.length; x++ ){
            nsub = nsub.replace(new RegExp(__regexp_escape(search[x]), "g"), "[cod"+fincods[x]+"]");
        }
        for( x = 0; x < fincods.length; x++ ){
            nsub = nsub.replace(new RegExp(__regexp_escape("[cod"+fincods[x]+"]"), "g"), replace[x]);
        }
        if( nsub.indexOf("[cod"+numon+"]") == -1 ){
            fincods[fincods.length]=numon;
        }
        numon++;
    }
    for( x = 0; x < fincods.length; x++ ){
        subject=subject.replace(new RegExp(__regexp_escape(search[x]), "g"), "[cod"+fincods[x]+"]");
    }
    for( x = 0; x < fincods.length; x++ ){
        subject=subject.replace(new RegExp(__regexp_escape("[cod"+fincods[x]+"]"), "g"), replace[x]);
    }
    return subject;
}
