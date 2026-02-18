type HtmlSpecialCharsQuoteStyle = string | string[] | number | null | undefined

export function htmlspecialchars_decode(string: string, quoteStyle?: HtmlSpecialCharsQuoteStyle): string {
  //       discuss at: https://locutus.io/php/htmlspecialchars_decode/
  //  parity verified: PHP 8.3
  //      original by: Mirek Slugen
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      bugfixed by: Mateusz "loonquawl" Zalega
  //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //         input by: ReverseSyntax
  //         input by: Slawomir Kaniecki
  //         input by: Scott Cariss
  //         input by: Francois
  //         input by: Ratheous
  //         input by: Mailfaker (https://www.weedem.fr/)
  //       revised by: Kevin van Zonneveld (https://kvz.io)
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //        example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES')
  //        returns 1: '<p>this -> &quot;</p>'
  //        example 2: htmlspecialchars_decode("&amp;quot;")
  //        returns 2: '&quot;'

  let optTemp = 0
  let noquotes = false

  let quoteStyleValue: HtmlSpecialCharsQuoteStyle = quoteStyle
  if (typeof quoteStyleValue === 'undefined') {
    quoteStyleValue = 2
  }

  let decoded = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  const OPTS = {
    ENT_NOQUOTES: 0,
    ENT_HTML_QUOTE_SINGLE: 1,
    ENT_HTML_QUOTE_DOUBLE: 2,
    ENT_COMPAT: 2,
    ENT_QUOTES: 3,
    ENT_IGNORE: 4,
  } as const

  const isOptKey = (value: string): value is keyof typeof OPTS => Object.prototype.hasOwnProperty.call(OPTS, value)

  if (quoteStyleValue === 0) {
    noquotes = true
  }
  if (typeof quoteStyleValue !== 'number') {
    // Allow for a single string or an array of string flags
    const quoteStyleFlags = (Array.isArray(quoteStyleValue) ? quoteStyleValue : [quoteStyleValue]).map((flag) =>
      String(flag),
    )
    for (const flag of quoteStyleFlags) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (flag === 'ENT_NOQUOTES') {
        noquotes = true
      } else if (isOptKey(flag) && OPTS[flag]) {
        optTemp |= OPTS[flag]
      }
    }
    quoteStyleValue = optTemp
  }
  if ((quoteStyleValue as number) & OPTS.ENT_HTML_QUOTE_SINGLE) {
    // PHP doesn't currently escape if more than one 0, but it should:
    decoded = decoded.replace(/&#0*39;/g, "'")
    // This would also be useful here, but not a part of PHP:
    // string = string.replace(/&apos;|&#x0*27;/g, "'");
  }
  if (!noquotes) {
    decoded = decoded.replace(/&quot;/g, '"')
  }
  // Put this in last place to avoid escape being double-decoded
  decoded = decoded.replace(/&amp;/g, '&')

  return decoded
}
