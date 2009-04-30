function gmmktime() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +   derived from: mktime
    // *     example 1: gmmktime(14, 10, 2, 2, 1, 2008);
    // *     returns 1: 1201875002

    var no=0, i = 0, ma=0, mb=0, d = new Date(), dn = new Date(), argv = arguments, argc = argv.length;

    var dateManip = {
        0: function(tt){ return d.setUTCHours(tt); },
        1: function(tt){ return d.setUTCMinutes(tt); },
        2: function(tt){ var set = d.setUTCSeconds(tt); mb = d.getUTCDate() - dn.getUTCDate(); return set;},
        3: function(tt){ var set = d.setUTCMonth(parseInt(tt, 10)-1); ma = d.getUTCFullYear() - dn.getUTCFullYear(); return set;},
        4: function(tt){ return d.setUTCDate(tt+mb);},
        5: function(tt){
            if (tt >= 0 && tt <= 69) {
                tt += 2000;
            }
            else if (tt >= 70 && tt <= 100) {
                tt += 1900;
            }
            return d.setUTCFullYear(tt+ma);
        }
        // 7th argument (for DST) is deprecated
    };

    for( i = 0; i < argc; i++ ){
        no = parseInt(argv[i]*1, 10);
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
    for (i = argc; i < 6; i++) {
        switch(i) {
            case 0:
                no = dn.getUTCHours();
                break;
            case 1:
                no = dn.getUTCMinutes();
                break;
            case 2:
                no = dn.getUTCSeconds();
                break;
            case 3:
                no = dn.getUTCMonth()+1;
                break;
            case 4:
                no = dn.getUTCDate();
                break;
            case 5:
                no = dn.getUTCFullYear();
                break;
        }
        dateManip[i](no);
    }

    return Math.floor(d.getTime()/1000);
}
