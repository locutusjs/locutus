function is_numeric (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: David
    // +   improved by: taith
    // +   bugfixed by: Tim de Koning
    // +   bugfixed by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Rafał Kukawski (http://blog.kukawski.pl)
    // *     example 1: is_numeric(186.31);
    // *     returns 1: true
    // *     example 2: is_numeric('Kevin van Zonneveld');
    // *     returns 2: false
    // *     example 3: is_numeric('+186.31e2');
    // *     returns 3: true
    // *     example 4: is_numeric('');
    // *     returns 4: false
    // *     example 4: is_numeric([]);
    // *     returns 4: false
    
    // The old implementation doesn't work correctly with strings containing white characters at the beginnig or at the end
    // eg. "\t123\t". phpjs function returns true, where PHP returns false
    
    // The function below should cover the case described above,
    // but I don't like the dependency on trim(), though
    // Unfortunatelly it's needed for case where the input is in exponential form ("1e3")
    return !isNaN(mixed_var) && (typeof(mixed_var) === 'number' || (typeof(mixed_var) === 'string' && mixed_var !== '' && this.trim(mixed_var) === mixed_var));
}
