export const noInitializer = Symbol('noInitializer')

export function pythonReduce(
  func: (accumulator: unknown, value: unknown) => unknown,
  iterable: unknown,
  initializer: unknown = noInitializer,
): unknown {
  const iterator = toIterator(iterable, 'reduce')
  let accumulator: unknown

  if (initializer !== noInitializer) {
    accumulator = initializer
  } else {
    const first = iterator.next()
    if (first.done) {
      throw new TypeError('reduce() of empty sequence with no initial value')
    }
    accumulator = first.value
  }

  while (true) {
    const next = iterator.next()
    if (next.done) {
      return accumulator
    }

    accumulator = func(accumulator, next.value)
  }
}

function toIterator(iterable: unknown, functionName: string): Iterator<unknown> {
  if (typeof iterable === 'string') {
    return iterable[Symbol.iterator]()
  }

  if ((typeof iterable === 'object' || typeof iterable === 'function') && iterable !== null) {
    const iterableValue = iterable as {
      [Symbol.iterator]?: () => Iterator<unknown>
    }
    const iteratorFactory = iterableValue[Symbol.iterator]

    if (typeof iteratorFactory === 'function') {
      return iteratorFactory.call(iterableValue)
    }
  }

  throw new TypeError(`${functionName}() expected an iterable`)
}
