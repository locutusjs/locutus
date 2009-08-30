function strtr (str, from, to) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +      input by: uestla
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Alan C
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Taras Bogach
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -   depends on: krsort
    // *     example 1: $trans = {'hello' : 'hi', 'hi' : 'hello'};
    // *     example 1: strtr('hi all, I said hello', $trans)
    // *     returns 1: 'hello all, I said hi'
    // *     example 2: strtr('äaabaåccasdeöoo', 'äåö','aao');
    // *     returns 2: 'aaabaaccasdeooo'
    // *     example 3: strtr('ääääääää', 'ä', 'a');
    // *     returns 3: 'aaaaaaaa'
    // *     example 4: strtr('http', 'pthxyz','xyzpth');
    // *     returns 4: 'zyyx'
    // *     example 5: strtr('zyyx', 'pthxyz','xyzpth');
    // *     returns 5: 'http'
    // *     example 6: strtr('aa', {'a':1,'aa':2});
    // *     returns 6: '2'

    var fr = '', i = 0, j = 0, lenStr = 0, lenFrom = 0;
    var tmpFrom = [];
    var tmpTo   = [];
    var ret = '';
    var match = false;

    // Received replace_pairs?
    // Convert to normal from->to chars
    if (typeof from === 'object') {
        this.krsort(from);
        for (fr in from) {
            tmpFrom.push(fr);
            tmpTo.push(from[fr]);
        }

        from = tmpFrom;
        to   = tmpTo;
    }
    
    // Walk through subject and replace chars when needed
    lenStr  = str.length;
    lenFrom = from.length;
    for (i = 0; i < lenStr; i++) {
        match = false;
        for (j = 0; j < lenFrom; j++) {
            if (str.substr(i, from[j].length) == from[j]) {
                match = true;

                // Fast forward
                i = (i + from[j].length)-1;
                
                break;
            }
        }
        
        if (false !== match) {
            ret += to[j];
        } else {
            ret += str[i];
        }
    }

    return ret;
}