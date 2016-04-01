---
examples:
  - - "html_entity_decode('Kevin &amp; van Zonneveld');"
  - - "html_entity_decode('&amp;lt;');"
returns:
  - - "'Kevin & van Zonneveld'"
  - - "'&lt;'"
authors:
  original by:
    - 'john (http://www.jd-tech.net)'
  improved by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - marc andreu
  bugfixed by:
    - Onno Marsman
    - 'Brett Zamir (http://brett-zamir.me)'
    - Fox
  revised by:
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
    - 'Kevin van Zonneveld (http://kevin.vanzonneveld.net)'
  input by:
    - ger
    - Ratheous
    - 'Nick Kolosov (http://sammy.ru)'
notes: []
layout: function
function: html_entity_decode
category: strings
code: >
  function html_entity_decode (string, quote_style) {

    //  discuss at: http://phpjs.org/functions/html_entity_decode/

    // original by: john (http://www.jd-tech.net)

    //    input by: ger

    //    input by: Ratheous

    //    input by: Nick Kolosov (http://sammy.ru)

    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    // improved by: marc andreu

    //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    // bugfixed by: Onno Marsman

    // bugfixed by: Brett Zamir (http://brett-zamir.me)

    // bugfixed by: Fox

    //  depends on: get_html_translation_table

    //   example 1: html_entity_decode('Kevin &amp; van Zonneveld');

    //   returns 1: 'Kevin & van Zonneveld'

    //   example 2: html_entity_decode('&amp;lt;');

    //   returns 2: '&lt;'



    var hash_map = {},

      symbol = '',

      tmp_str = '',

      entity = ''

    tmp_str = string.toString()



    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES',
  quote_style))) {

      return false

    }



    // fix &amp; problem

    // http://phpjs.org/functions/get_html_translation_table:416#comment_97660

    delete (hash_map['&'])

    hash_map['&'] = '&amp;'



    for (symbol in hash_map) {

      entity = hash_map[symbol]

      tmp_str = tmp_str.split(entity)

        .join(symbol)

    }

    tmp_str = tmp_str.split('&#039;')

      .join("'")



    return tmp_str

  }
permalink: /functions/html_entity_decode/
redirect_from:
  - /functions/strings/html_entity_decode/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->