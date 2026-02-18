import type { PhpAssoc } from '../_helpers/_phpTypes.ts'

type ArrayChunkInput<T> = T[] | PhpAssoc<T>
type ArrayChunkOutput<T> = T[] | PhpAssoc<T>

export function array_chunk<T>(
  input: ArrayChunkInput<T>,
  size: number,
  preserveKeys?: boolean,
): ArrayChunkOutput<T>[] | null {
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
      const chunks: PhpAssoc<T>[] = []
      for (const [i, value] of input.entries()) {
        const chunkIndex = Math.floor(i / size)
        if (!chunks[chunkIndex]) {
          chunks[chunkIndex] = {}
        }
        chunks[chunkIndex][String(i)] = value
      }
      return chunks
    } else {
      const chunks: T[][] = []
      for (const [i, value] of input.entries()) {
        const chunkIndex = Math.floor(i / size)
        if (!chunks[chunkIndex]) {
          chunks[chunkIndex] = []
        }
        chunks[chunkIndex].push(value)
      }
      return chunks
    }
  } else {
    const inputEntries = Object.entries(input)
    if (keepKeys) {
      const chunks: PhpAssoc<T>[] = []
      for (const [i, [key, value]] of inputEntries.entries()) {
        const chunkIndex = Math.floor(i / size)
        if (!chunks[chunkIndex]) {
          chunks[chunkIndex] = {}
        }
        chunks[chunkIndex][key] = value
      }
      return chunks
    } else {
      const chunks: T[][] = []
      for (const [i, [, value]] of inputEntries.entries()) {
        const chunkIndex = Math.floor(i / size)
        if (!chunks[chunkIndex]) {
          chunks[chunkIndex] = []
        }
        chunks[chunkIndex].push(value)
      }
      return chunks
    }
  }
}
