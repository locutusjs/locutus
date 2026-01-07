module.exports = function strncmp(str1, str2, lgth) {
  //       discuss at: https://locutus.io/php/strncmp/
  //  parity verified: PHP 8.3
  //      original by: Waldo Malqui Silva (https://waldo.malqui.info)
  //         input by: Steve Hilder
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //       revised by: gorthaur
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //        example 1: strncmp('aaa', 'aab', 2)
  //        returns 1: 0
  //        example 2: strncmp('aaa', 'aab', 3 )
  //        returns 2: -1

  const s1 = (str1 + '').substr(0, lgth)
  const s2 = (str2 + '').substr(0, lgth)

  return s1 === s2 ? 0 : s1 > s2 ? 1 : -1
}
