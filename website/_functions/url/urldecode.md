---
examples:
  - - "urldecode('Kevin+van+Zonneveld%21');"
  - - "urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');"
  - - "urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');"
  - - "urldecode('%E5%A5%BD%3_4');"
returns:
  - - "'Kevin van Zonneveld!'"
  - - "'http://kevin.vanzonneveld.net/'"
  - - "'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'"
  - - "'\\u597d%3_4'"
authors:
  original by:
    - Philip Peterson
  improved by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - 'Brett Zamir (http://brett-zamir.me)'
    - Lars Fischer
    - Orlando
    - 'Brett Zamir (http://brett-zamir.me)'
    - 'Brett Zamir (http://brett-zamir.me)'
  bugfixed by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - Rob
  input by:
    - AJ
    - travc
    - 'Brett Zamir (http://brett-zamir.me)'
    - Ratheous
    - e-mike
    - lovio
notes:
  - - 'info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/'
    - 'Please be aware that this function expects to decode from UTF-8 encoded strings, as found on'
    - pages served as UTF-8
layout: function
function: urldecode
category: url
code: "function urldecode (str) {\n  //       discuss at: http://phpjs.org/functions/urldecode/\n  //      original by: Philip Peterson\n  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  //      improved by: Brett Zamir (http://brett-zamir.me)\n  //      improved by: Lars Fischer\n  //      improved by: Orlando\n  //      improved by: Brett Zamir (http://brett-zamir.me)\n  //      improved by: Brett Zamir (http://brett-zamir.me)\n  //         input by: AJ\n  //         input by: travc\n  //         input by: Brett Zamir (http://brett-zamir.me)\n  //         input by: Ratheous\n  //         input by: e-mike\n  //         input by: lovio\n  //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n  //      bugfixed by: Rob\n  // reimplemented by: Brett Zamir (http://brett-zamir.me)\n  //             note: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/\n  //             note: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on\n  //             note: pages served as UTF-8\n  //        example 1: urldecode('Kevin+van+Zonneveld%21');\n  //        returns 1: 'Kevin van Zonneveld!'\n  //        example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');\n  //        returns 2: 'http://kevin.vanzonneveld.net/'\n  //        example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');\n  //        returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'\n  //        example 4: urldecode('%E5%A5%BD%3_4');\n  //        returns 4: '\\u597d%3_4'\n\n  return decodeURIComponent((str + '')\n    .replace(/%(?![\\da-f]{2})/gi, function () {\n      // PHP tolerates poorly formed escape sequences\n      return '%25'\n    })\n    .replace(/\\+/g, '%20'))\n}\n"
permalink: /functions/urldecode/
redirect_from:
  - /functions/url/urldecode/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->