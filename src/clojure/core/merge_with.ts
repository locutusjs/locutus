type MergeRecord = { [key: string]: unknown }
type MergeCombiner = (left: unknown, right: unknown, key: string) => unknown

export function merge_with(combiner: MergeCombiner, ...maps: unknown[]): MergeRecord {
  //  discuss at: https://locutus.io/clojure/merge_with/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Merges maps and combines colliding values with combiner, like Clojure merge-with.
  //   example 1: merge_with((a, b) => Number(a) + Number(b), {a: 1}, {a: 2, b: 3})
  //   returns 1: {a: 3, b: 3}
  //   example 2: merge_with((a, b) => [a, b].join(','), {x: 'a'}, {x: 'b'}, {y: 'c'})
  //   returns 2: {x: 'a,b', y: 'c'}
  //   example 3: merge_with((a, b) => b, {})
  //   returns 3: {}

  if (typeof combiner !== 'function') {
    throw new TypeError('merge_with(): combiner must be a function')
  }

  const out: MergeRecord = {}

  for (const map of maps) {
    if (!map || typeof map !== 'object' || Array.isArray(map)) {
      continue
    }

    for (const [key, value] of Object.entries(map as MergeRecord)) {
      if (Object.hasOwn(out, key)) {
        out[key] = combiner(out[key], value, key)
      } else {
        out[key] = value
      }
    }
  }

  return out
}
