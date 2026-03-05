type ScanReducer<TAccumulator, TValue> = (
  accumulator: TAccumulator,
  value: TValue,
  index: number,
  array: TValue[],
) => TAccumulator

export function scan<TValue>(values: TValue[] | unknown, reducer: ScanReducer<TValue, TValue>): TValue[]
export function scan<TAccumulator, TValue>(
  values: TValue[] | unknown,
  initial: TAccumulator,
  reducer: ScanReducer<TAccumulator, TValue>,
): TAccumulator[]
export function scan<TAccumulator, TValue>(
  values: TValue[] | unknown,
  initialOrReducer: TAccumulator | ScanReducer<TAccumulator, TValue>,
  maybeReducer?: ScanReducer<TAccumulator, TValue>,
): Array<TAccumulator | TValue> {
  //  discuss at: https://locutus.io/elixir/scan/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Produces running accumulator states, similar to Elixir Enum.scan/2 and Enum.scan/3.
  //   example 1: scan([1, 2, 3, 4], (acc, value) => Number(acc) + Number(value))
  //   returns 1: [1, 3, 6, 10]
  //   example 2: scan([1, 2, 3], 10, (acc, value) => Number(acc) + Number(value))
  //   returns 2: [11, 13, 16]
  //   example 3: scan([], 5, (acc, value) => Number(acc) + Number(value))
  //   returns 3: []

  if (!Array.isArray(values)) {
    return []
  }

  const hasInitial = typeof maybeReducer === 'function'
  const reducer = (hasInitial ? maybeReducer : initialOrReducer) as ScanReducer<TAccumulator, TValue>

  if (typeof reducer !== 'function') {
    throw new TypeError('scan(): reducer must be a function')
  }

  if (values.length === 0) {
    return []
  }

  const out: Array<TAccumulator | TValue> = []

  if (hasInitial) {
    let accumulator = initialOrReducer as TAccumulator
    for (let i = 0; i < values.length; i++) {
      accumulator = reducer(accumulator, values[i] as TValue, i, values)
      out.push(accumulator)
    }
    return out
  }

  let accumulator = values[0] as unknown as TAccumulator
  out.push(accumulator as unknown as TValue)
  for (let i = 1; i < values.length; i++) {
    accumulator = reducer(accumulator, values[i] as TValue, i, values)
    out.push(accumulator)
  }

  return out
}
