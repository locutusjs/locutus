type ScanReducer<TAccumulator, TValue> = (
  accumulator: TAccumulator,
  value: TValue,
  index: number,
  array: TValue[],
) => TAccumulator

function isScanReducer<TAccumulator, TValue>(value: unknown): value is ScanReducer<TAccumulator, TValue> {
  return typeof value === 'function'
}

export function scan<TValue>(values: TValue[] | unknown, reducer: ScanReducer<TValue, TValue>): TValue[]
export function scan<TAccumulator, TValue>(
  values: TValue[] | unknown,
  initial: TAccumulator,
  reducer: ScanReducer<TAccumulator, TValue>,
): TAccumulator[]
export function scan<TAccumulator, TValue>(
  values: TValue[] | unknown,
  initialOrReducer: TAccumulator | ScanReducer<TValue, TValue>,
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

  if (values.length === 0) {
    return []
  }

  const out: Array<TAccumulator | TValue> = []

  if (hasInitial) {
    const reducer = maybeReducer
    if (!isScanReducer<TAccumulator, TValue>(reducer)) {
      throw new TypeError('scan(): reducer must be a function')
    }

    let accumulator = initialOrReducer as TAccumulator
    for (let i = 0; i < values.length; i++) {
      accumulator = reducer(accumulator, values[i] as TValue, i, values)
      out.push(accumulator)
    }
    return out
  }

  if (!isScanReducer<TValue, TValue>(initialOrReducer)) {
    throw new TypeError('scan(): reducer must be a function')
  }

  const reducer = initialOrReducer
  let accumulator = values[0] as TValue
  out.push(accumulator)
  for (let i = 1; i < values.length; i++) {
    accumulator = reducer(accumulator, values[i] as TValue, i, values)
    out.push(accumulator)
  }

  return out
}
