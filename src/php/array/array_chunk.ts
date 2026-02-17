type ArrayChunkInput = unknown[] | { [key: string]: unknown }
type ArrayChunkOutput = unknown[] | { [key: string]: unknown }

export function array_chunk(input: ArrayChunkInput, size: number, preserveKeys?: boolean): ArrayChunkOutput[] | null {
  //  discuss at: https://locutus.io/php/array_chunk/
  // original by: Carlos R. L. Rodrigues (https://www.jsfromhell.com)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Important note: Per the ECMAScript specification,
  //      note 1: objects may not always iterate in a predictable order
  //   example 1: array_chunk(['Kevin', 'van', 'Zonneveld'], 2)
  //   returns 1: [['Kevin', 'van'], ['Zonneveld']]
  //   example 2: array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true)
  //   returns 2: [{0:'Kevin', 1:'van'}, {2: 'Zonneveld'}]
  //   example 3: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2)
  //   returns 3: [['Kevin', 'van'], ['Zonneveld']]
  //   example 4: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true)
  //   returns 4: [{1: 'Kevin', 2: 'van'}, {3: 'Zonneveld'}]

  if (size < 1) {
    return null
  }

  const keepKeys = Boolean(preserveKeys)

  if (Array.isArray(input)) {
    if (keepKeys) {
      const chunks: { [key: string]: unknown }[] = []
      for (let i = 0; i < input.length; i++) {
        const chunkIndex = Math.floor(i / size)
        if (!chunks[chunkIndex]) {
          chunks[chunkIndex] = {}
        }
        chunks[chunkIndex][String(i)] = input[i]
      }
      return chunks
    } else {
      const chunks: unknown[][] = []
      for (let i = 0; i < input.length; i++) {
        const chunkIndex = Math.floor(i / size)
        if (!chunks[chunkIndex]) {
          chunks[chunkIndex] = []
        }
        chunks[chunkIndex].push(input[i])
      }
      return chunks
    }
  } else {
    const hasOwn = Object.prototype.hasOwnProperty
    if (keepKeys) {
      const chunks: { [key: string]: unknown }[] = []
      let i = 0
      for (const p in input) {
        if (hasOwn.call(input, p)) {
          const chunkIndex = Math.floor(i / size)
          if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = {}
          }
          chunks[chunkIndex][p] = input[p]
          i++
        }
      }
      return chunks
    } else {
      const chunks: unknown[][] = []
      let i = 0
      for (const p in input) {
        if (hasOwn.call(input, p)) {
          const chunkIndex = Math.floor(i / size)
          if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = []
          }
          chunks[chunkIndex].push(input[p])
          i++
        }
      }
      return chunks
    }
  }
}
