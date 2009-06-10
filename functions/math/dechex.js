function dechex(number) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // +   bugfixed by: Onno Marsman
    // +   improved by: pilus
    // *     example 1: dechex(10);
    // *     returns 1: 'a'
    // *     example 2: dechex(47);
    // *     returns 2: '2f'
    if (number < 0) {
       return (0xFFFFFFFF+number+1).toString(16);
    }
    return parseInt(number, 10).toString(16);
}