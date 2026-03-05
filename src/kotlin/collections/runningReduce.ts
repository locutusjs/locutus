type ReduceOperation<T> = (accumulator: T, value: T, index: number, array: T[]) => T

export function runningReduce<T>(values: T[] | unknown, operation: ReduceOperation<T>): T[] {
  //  discuss at: https://locutus.io/kotlin/collections/runningReduce/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns successive accumulation values from the first element, like Kotlin runningReduce.
  //   example 1: runningReduce([1, 2, 3, 4], (acc, value) => acc + value)
  //   returns 1: [1, 3, 6, 10]
  //   example 2: runningReduce(['a', 'b', 'c'], (acc, value) => acc + value)
  //   returns 2: ['a', 'ab', 'abc']
  //   example 3: runningReduce([], (acc, value) => acc + value)
  //   returns 3: []

  if (typeof operation !== 'function') {
    throw new TypeError('runningReduce(): operation must be a function')
  }

  if (!Array.isArray(values) || values.length === 0) {
    return []
  }

  const array = values as T[]
  const out: T[] = [array[0] as T]
  let accumulator = array[0] as T

  for (let i = 1; i < array.length; i++) {
    accumulator = operation(accumulator, array[i] as T, i, array)
    out.push(accumulator)
  }

  return out
}
