function dechex(number) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // +   bugfixed by: Onno Marsman
    // *     example 1: dechex(10);
    // *     returns 1: 'a'
    // *     example 2: dechex(47);
    // *     returns 2: '2f'
    
    return parseInt(number).toString(16);
}