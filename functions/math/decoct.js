function decoct (number) {
    // http://kevin.vanzonneveld.net
    // +   original by: Enrique Gonzalez
    // +   bugfixed by: Onno Marsman
    // *     example 1: decoct(15);
    // *     returns 1: '17'
    // *     example 2: decoct(264); 
    // *     returns 2: '410'
    
    return parseInt(number, 10).toString(8);
}