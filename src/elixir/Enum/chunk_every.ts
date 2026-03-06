export function chunk_every<T>(values: T[] | unknown, count: number, step: number = count, leftover: T[] = []): T[][] {
  //      discuss at: https://locutus.io/elixir/chunk_every/
  // parity verified: Elixir 1.18
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors Elixir Enum.chunk_every/4 semantics with count, step and optional leftover padding.
  //       example 1: chunk_every([1, 2, 3, 4, 5], 2)
  //       returns 1: [[1, 2], [3, 4], [5]]
  //       example 2: chunk_every([1, 2, 3, 4, 5], 2, 2, [])
  //       returns 2: [[1, 2], [3, 4], [5]]
  //       example 3: chunk_every([1, 2, 3, 4, 5], 3, 3, [0, 0])
  //       returns 3: [[1, 2, 3], [4, 5, 0]]

  if (!Array.isArray(values)) {
    return []
  }

  const width = Math.trunc(Number(count))
  const stride = Math.trunc(Number(step))
  if (!Number.isFinite(width) || width <= 0) {
    throw new RangeError('chunk_every(): count must be a positive integer')
  }
  if (!Number.isFinite(stride) || stride <= 0) {
    throw new RangeError('chunk_every(): step must be a positive integer')
  }

  const pad = Array.isArray(leftover) ? leftover : []
  const out: T[][] = []

  for (let i = 0; i < values.length; i += stride) {
    const chunk = values.slice(i, i + width)
    if (chunk.length === width) {
      out.push(chunk)
      continue
    }

    if (chunk.length === 0) {
      continue
    }

    const padded = [...chunk, ...pad].slice(0, width)
    if (padded.length > 0) {
      out.push(padded)
    }
  }

  return out
}
