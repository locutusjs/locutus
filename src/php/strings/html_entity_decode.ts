import { type PhpMixed, toPhpArrayObject } from '../_helpers/_phpTypes.ts'
import { get_html_translation_table as getHtmlTranslationTable } from '../strings/get_html_translation_table.ts'

export function html_entity_decode(string: string, quoteStyle?: PhpMixed): string | false {
  //      discuss at: https://locutus.io/php/html_entity_decode/
  // parity verified: PHP 8.3
  //     original by: john (https://www.jd-tech.net)
  //        input by: ger
  //        input by: Ratheous
  //        input by: Nick Kolosov (https://sammy.ru)
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: marc andreu
  //      revised by: Kevin van Zonneveld (https://kvz.io)
  //      revised by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //     bugfixed by: Fox
  //       example 1: html_entity_decode('Kevin &amp; van Zonneveld')
  //       returns 1: 'Kevin & van Zonneveld'
  //       example 2: html_entity_decode('&amp;lt;')
  //       returns 2: '&lt;'

  let tmpStr = string.toString()

  const normalizedQuoteStyle = typeof quoteStyle === 'string' || typeof quoteStyle === 'number' ? quoteStyle : undefined
  const hashMapUnknown: PhpMixed = getHtmlTranslationTable('HTML_ENTITIES', normalizedQuoteStyle)
  if (hashMapUnknown === false || !hashMapUnknown || typeof hashMapUnknown !== 'object') {
    return false
  }
  const normalizedHashMap: { [key: string]: string } = {}
  const hashMapObject = toPhpArrayObject(hashMapUnknown)
  for (const symbol in hashMapObject) {
    const entity = hashMapObject[symbol]
    if (typeof entity === 'string') {
      normalizedHashMap[symbol] = entity
    }
  }

  // @todo: &amp; problem
  // https://locutus.io/php/get_html_translation_table:416#comment_97660
  delete normalizedHashMap['&']
  normalizedHashMap['&'] = '&amp;'

  for (const symbol in normalizedHashMap) {
    const entity = normalizedHashMap[symbol]
    if (typeof entity !== 'string') {
      continue
    }
    tmpStr = tmpStr.split(entity).join(symbol)
  }
  tmpStr = tmpStr.split('&#039;').join("'")

  return tmpStr
}
