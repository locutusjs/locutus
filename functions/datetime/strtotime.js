function strtotime(str, now) {
    // http://kevin.vanzonneveld.net
    // +   original by: Caio Ariede (http://caioariede.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
    // *     example 1: strtotime('+1 day', 1129633200);
    // *     returns 1: 1129719600
    // *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    // *     returns 2: 1130425202
    // *     example 3: strtotime('last month', 1129633200);
    // *     returns 3: 1127041200

    var i, match, s;
    
    str = str.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
    str = str.replace(/[\t\r\n]/g, ''); // unecessary chars

    if (str == 'now') return (new Date()).getTime();
    else if (!isNaN(parse = Date.parse(str))) return parse/1000;
    else if (now) now = new Date(now);
    else now = new Date();

    str = str.toLowerCase();

   var process = function (m) {
        var ago = (m[2] && m[2] == 'ago');
        var num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1);

        switch (m[0]) {
            case 'last':
            case 'next':
                switch (m[1].substring(0, 3)) {
                    case 'yea':
                        now.setFullYear(now.getFullYear() + num);
                        break;
                    case 'mon':
                        now.setMonth(now.getMonth() + num);
                        break;
                    case 'wee':
                        now.setDate(now.getDate() + (num * 7));
                        break;
                    case 'day':
                        now.setDate(now.getDate() + num);
                        break;
                    case 'hou':
                        now.setHours(now.getHours() + num);
                        break;
                    case 'min':
                        now.setMinutes(now.getMinutes() + num);
                        break;
                    case 'sec':
                        now.setSeconds(now.getSeconds() + num);
                        break;
                    default:
                        var day;
                        if (typeof (day = __is_day[m[1].substring(0, 3)]) != 'undefined') {
                            var diff = day - now.getDay();
                            if (diff == 0) {
                                diff = 7 * num;
                            } else if (diff > 0) {
                                if (m[0] == 'last') diff -= 7;
                            } else {
                                if (m[0] == 'next') diff += 7;
                            }

                            now.setDate(now.getDate() + diff);
                        }
                }

                break;

            default:
                if (/\d+/.test(m[0])) {
                    num *= parseInt(m[0]);

                    switch (m[1].substring(0, 3)) {
                        case 'yea':
                            now.setFullYear(now.getFullYear() + num);
                            break;
                        case 'mon':
                            now.setMonth(now.getMonth() + num);
                            break;
                        case 'wee':
                            now.setDate(now.getDate() + (num * 7));
                            break;
                        case 'day':
                            now.setDate(now.getDate() + num);
                            break;
                        case 'hou':
                            now.setHours(now.getHours() + num);
                            break;
                        case 'min':
                            now.setMinutes(now.getMinutes() + num);
                            break;
                        case 'sec':
                            now.setSeconds(now.getSeconds() + num);
                            break;
                    }
                } else {
                    return false;
                }

                break;
        }

        return true;
    }
    
    var __is =
    {
        day:
        {
            'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3,
            'thu': 4, 'fri': 5, 'sat': 6
        },
        mon:
        {
            'jan': 0, 'feb': 1, 'mar': 2, 'may': 3, 'apr': 4,  'jun': 5,
            'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
        }
    }

    match = str.match(/^(\d{2,4}-\d{2}-\d{2})(\s\d{1,2}:\d{1,2}(:\d{1,2})?)?$/);

    if (match != null) {
        if (!match[2]) {
            match[2] = '00:00:00';
        }
        else if (!match[3]) {
            match[2] += ':00';
        }

        s = match[1].split(/-/g);

        for (i in __is.mon)
            if (__is.mon[i] == s[1] - 1)
                s[1] = i;

        return strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]);
    }
 
    var regex = '([+-]?\\d+\\s'
              + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'
              + '|sun\.?|sunday|mon\.?|monday|tue\.?|tuesday|wed\.?|wednesday'
              + '|thu\.?|thursday|fri\.?|friday|sat\.?|saturday)'
              + '|(last|next)\\s'
              + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'
              + '|sun\.?|sunday|mon\.?|monday|tue\.?|tuesday|wed\.?|wednesday'
              + '|thu\.?|thursday|fri\.?|friday|sat\.?|saturday))'
              + '(\\sago)?';

    match = str.match(new RegExp(regex, 'g'));

    if (match == null) {
        return false;
    }

    for (i in match) {
        if (!process(match[i].split(' '))) {
            return false;
        }
    }

    return (now);
}