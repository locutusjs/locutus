function hebrevc (hebrew_text, max_chars_per_line) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: max_chars_per_line is not supported and this is only a rough approximation of the function behavior
    // *     example 1: hebrevc('\u05d0\n\u05ea');
    // *     returns 1: '\u05ea<br />\n\u05d0'

    // max_chars_per_line = max_chars_per_line || 0;
    if (typeof hebrew_text === 'undefined') {
        return null;
    }
    else if (hebrew_text === null) {
        return false;
    }

    return hebrew_text.replace(/[\u05d0-\u05ea \t\n\r!#$%&’()*+,\-./:;<=>\\?@\[\]^_‘{|}~]*/, // hebrew, space, tab, newline, carriage return, punct // [\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]
        function (n0) {
            for (var i = n0.length - 1, output = ''; i >= 0; i--) {
                var c = n0.charAt(i);
                switch (c) {
                    case '\n': // One line different from hebrev
                        c = '<br />\n';
                        break;
                    case '(':
                        c = ')';
                        break;
                    case ')':
                        c = '(';
                        break;
                    case '[':
                        c = ']';
                        break;
                    case ']':
                        c = '[';
                        break;
                    case '{':
                        c = '}';
                        break;
                    case '}':
                        c = '{';
                        break;
                    case '<':
                        c = '>';
                        break;
                    case '>':
                        c = '<';
                        break;
                    case '\\':
                        c = '/';
                        break;
                    case '/':
                        c = '\\';
                        break;
                    default:
                        break;
                }
                output += c;
            }
            return output;
        }
    );
}
