module.exports = function nl2br (str, isXhtml) {
  //  discuss at: http://locutus.io/php/nl2br/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Philip Peterson
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Atli Þór
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Maximusya
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Reynier de la Rosa (http://scriptinside.blogspot.com.es/)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //   example 1: nl2br('Kevin\nvan\nZonneveld')
  //   returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
  //   example 2: nl2br("\nOne\nTwo\n\nThree\n", false)
  //   returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
  //   example 3: nl2br("\nOne\nTwo\n\nThree\n", true)
  //   returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'

  // Some lattest browsers when str is null return and unexpected null value
  if(typeof str === 'undefined' || str === null){
    return '';
  }
  
  // Adjust comment to avoid issue on locutus.io display
  var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br ' + '/>' : '<br>'

  return (str + '')
    .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
}
