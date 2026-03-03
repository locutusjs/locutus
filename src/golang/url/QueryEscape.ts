const strictEncodeURIComponent = (value: string): string =>
  encodeURIComponent(value).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)

export function QueryEscape(s: string): string {
  //      discuss at: https://locutus.io/golang/url/QueryEscape
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Encodes a query component where spaces become '+'.
  //       example 1: QueryEscape('a b+c')
  //       returns 1: 'a+b%2Bc'
  //       example 2: QueryEscape('https://locutus.io/?q=go lang')
  //       returns 2: 'https%3A%2F%2Flocutus.io%2F%3Fq%3Dgo+lang'
  //       example 3: QueryEscape('100%')
  //       returns 3: '100%25'

  return strictEncodeURIComponent(String(s)).replace(/%20/g, '+')
}
