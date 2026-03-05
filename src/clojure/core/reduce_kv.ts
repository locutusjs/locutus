type ReduceKvReducer<TAccumulator, TValue> = (
  accumulator: TAccumulator,
  key: string | number,
  value: TValue,
) => TAccumulator

type ReduceKvCollection<TValue> = Record<string, TValue> | TValue[]

export function reduce_kv<TAccumulator, TValue = unknown>(
  reducer: ReduceKvReducer<TAccumulator, TValue>,
  initial: TAccumulator,
  collection: ReduceKvCollection<TValue> | unknown,
): TAccumulator {
  //  discuss at: https://locutus.io/clojure/reduce_kv/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Reduces map/array entries with key + value, similar to Clojure reduce-kv.
  //   example 1: reduce_kv((acc, key, value) => acc + key + value, '', {a: 1, b: 2})
  //   returns 1: 'a1b2'
  //   example 2: reduce_kv((acc, key, value) => acc + Number(key) * Number(value), 0, [10, 20, 30])
  //   returns 2: 80
  //   example 3: reduce_kv((acc, key, value) => ({...acc, [key]: Number(value) + 1}), {}, {x: 4})
  //   returns 3: {x: 5}

  if (typeof reducer !== 'function') {
    throw new TypeError('reduce_kv(): reducer must be a function')
  }

  let acc = initial

  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      acc = reducer(acc, i, collection[i] as TValue)
    }
    return acc
  }

  if (!collection || typeof collection !== 'object') {
    return acc
  }

  for (const [key, value] of Object.entries(collection as Record<string, TValue>)) {
    acc = reducer(acc, key, value)
  }

  return acc
}
