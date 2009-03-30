function strtr (str, from, to) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +      input by: uestla
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: $trans = {"hello" : "hi", "hi" : "hello"};
    // *     example 1: strtr("hi all, I said hello", $trans)
    // *     returns 1: 'hello all, I said hi'
    // *     example 2: strtr('äaabaåccasdeöoo', 'äåö','aao');
    // *     returns 2: 'aaabaaccasdeooo'
    // *     example 3: strtr('ääääääää', 'ä','a');
    // *     returns 3: 'aaaaaaaa'

    var fr = '', i = 0, lgth = 0;

    if (typeof from === 'object') {
        for (fr in from) {
            str = str.replace(fr, from[fr]);
        }
        return str;
    }
    
    lgth = to.length;
    if (from.length < to.length) {
        lgth = from.length;
    }
    for (i = 0; i < lgth; i++) {
        str = str.replace(from[i], to[i], 'g');
    }
    
    return str;
}