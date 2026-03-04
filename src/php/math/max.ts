type PhpMinMaxScalar = string | number | boolean | null
type PhpMinMaxObject = { [key: string]: PhpMinMaxValue }
type PhpMinMaxValue = PhpMinMaxScalar | PhpMinMaxValue[] | PhpMinMaxObject

const isCollection = (value: PhpMinMaxValue): value is PhpMinMaxValue[] | PhpMinMaxObject =>
  typeof value === 'object' && value !== null

const objectToArray = (value: PhpMinMaxValue[] | PhpMinMaxObject): PhpMinMaxValue[] => {
  if (Array.isArray(value)) {
    return value
  }

  const converted: PhpMinMaxValue[] = []
  for (const key in value) {
    if (Object.hasOwn(value, key)) {
      const item = value[key]
      if (typeof item !== 'undefined') {
        converted.push(item)
      }
    }
  }

  return converted
}

const compareValues = (current: PhpMinMaxValue, next: PhpMinMaxValue): number => {
  const currentNum = Number(current)
  const nextNum = Number(next)

  if (current === next) {
    return 0
  }

  if (isCollection(current)) {
    if (isCollection(next)) {
      const currentArray = objectToArray(current)
      const nextArray = objectToArray(next)

      if (nextArray.length > currentArray.length) {
        return 1
      }
      if (nextArray.length < currentArray.length) {
        return -1
      }

      for (let index = 0; index < currentArray.length; index += 1) {
        const currentItem = currentArray[index]
        const nextItem = nextArray[index]
        if (typeof currentItem === 'undefined' || typeof nextItem === 'undefined') {
          continue
        }
        const comparison = compareValues(currentItem, nextItem)
        if (comparison !== 0) {
          return comparison
        }
      }

      return 0
    }

    return -1
  }

  if (isCollection(next)) {
    return 1
  }

  if (Number.isNaN(nextNum) && !Number.isNaN(currentNum)) {
    if (current === 0) {
      return 0
    }
    return currentNum < 0 ? 1 : -1
  }

  if (Number.isNaN(currentNum) && !Number.isNaN(nextNum)) {
    if (next === 0) {
      return 0
    }
    return nextNum > 0 ? 1 : -1
  }

  return nextNum > currentNum ? 1 : -1
}

export function max(...args: PhpMinMaxValue[]): PhpMinMaxValue {
  //  discuss at: https://locutus.io/php/max/
  // original by: Onno Marsman (https://twitter.com/onnomarsman)
  //  revised by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Jack
  //      note 1: Long code cause we're aiming for maximum PHP compatibility
  //   example 1: max(1, 3, 5, 6, 7)
  //   returns 1: 7
  //   example 2: max([2, 4, 5])
  //   returns 2: 5
  //   example 3: max(0, 'hello')
  //   returns 3: 0
  //   example 4: max('hello', 0)
  //   returns 4: 'hello'
  //   example 5: max(-1, 'hello')
  //   returns 5: 'hello'
  //   example 6: max([2, 4, 8], [2, 5, 7])
  //   returns 6: [2, 5, 7]

  if (args.length === 0) {
    throw new Error('At least one value should be passed to max()')
  }

  let values: PhpMinMaxValue[]

  if (args.length === 1) {
    const only = args[0]
    if (typeof only === 'undefined' || !isCollection(only)) {
      throw new Error('Wrong parameter count for max()')
    }

    values = objectToArray(only)

    if (values.length === 0) {
      throw new Error('Array must contain at least one element for max()')
    }
  } else {
    values = args
  }

  const first = values[0]
  if (typeof first === 'undefined') {
    throw new Error('Array must contain at least one element for max()')
  }
  let result = first

  for (let index = 1; index < values.length; index += 1) {
    const candidate = values[index]
    if (typeof candidate === 'undefined') {
      continue
    }
    if (compareValues(result, candidate) === 1) {
      result = candidate
    }
  }

  return result
}
