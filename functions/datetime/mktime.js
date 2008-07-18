function mktime() {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: baris ozdil
    // +      input by: gabriel paderni 
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FGFEmperor
    // +      input by: Yannoo
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: jakes
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: mktime(14, 10, 2, 2, 1, 2008);
    // *     returns 1: 1201871402
    // *     example 2: mktime(0, 0, 0, 0, 1, 2008);
    // *     returns 2: 1196463600
    
    var no, ma = 0, mb = 0, i = 0, d = new Date(), argv = arguments, argc = argv.length;
    d.setHours(0,0,0); d.setDate(1); d.setMonth(1); d.setYear(1972);
 
    var dateManip = {
        0: function(tt){ return d.setHours(tt); },
        1: function(tt){ return d.setMinutes(tt); },
        2: function(tt){ set = d.setSeconds(tt); mb = d.getDate() - 1; return set; },
        3: function(tt){ set = d.setMonth(parseInt(tt)-1); ma = d.getFullYear() - 1972; return set; },
        4: function(tt){ return d.setDate(tt+mb); },
        5: function(tt){ return d.setYear(tt+ma); }
    };
    
    for( i = 0; i < argc; i++ ){
        no = parseInt(argv[i]*1);
        if (isNaN(no)) {
            return false;
        } else {
            // arg is number, let's manipulate date object
            if(!dateManip[i](no)){
                // failed
                return false;
            }
        }
    }

    return Math.floor(d.getTime()/1000);
}