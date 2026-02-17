export function chunk_split(body: string, chunklen?: number | string, end?: string): string | false {
  //      discuss at: https://locutus.io/php/chunk_split/
  // parity verified: PHP 8.3
  //     original by: Paulo Freitas
  //        input by: Brett Zamir (https://brett-zamir.me)
  //     bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Theriault (https://github.com/Theriault)
  //       example 1: chunk_split('Hello world!', 1, '*')
  //       returns 1: 'H*e*l*l*o* *w*o*r*l*d*!*'
  //       example 2: chunk_split('Hello world!', 10, '*')
  //       returns 2: 'Hello worl*d!*'

  const parsedChunklen = Number.parseInt(String(chunklen ?? 76), 10) || 76
  const splitEnd = end || '\r\n'

  if (parsedChunklen < 1) {
    return false
  }

  const chunks = body.match(new RegExp(`.{0,${parsedChunklen}}`, 'g')) ?? []
  return chunks.join(splitEnd)
}
