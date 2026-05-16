export function toRNumericArray(data: unknown, functionName: string): number[] {
  if (!Array.isArray(data)) {
    throw new TypeError(`${functionName}() data must be an array`)
  }

  return data.map((value) => toRNumber(value, functionName))
}

export function toRNumber(value: unknown, functionName: string): number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0
  }

  if (typeof value === 'bigint') {
    const numericValue = Number(value)
    if (!Number.isSafeInteger(numericValue)) {
      throw new RangeError(`${functionName}() bigint values must fit within JS safe integer precision`)
    }

    return numericValue
  }

  throw new TypeError(`${functionName}() data must contain only numeric values`)
}

export function sortedRNumbers(data: unknown, functionName: string): number[] {
  return [...toRNumericArray(data, functionName)].sort((left, right) => left - right)
}

export function medianOfSorted(values: number[], low = false, high = false): number {
  if (values.length === 0) {
    return Number.NaN
  }

  const middle = Math.floor(values.length / 2)
  if (values.length % 2 === 1) {
    return values[middle] ?? Number.NaN
  }

  if (low) {
    return values[middle - 1] ?? Number.NaN
  }

  if (high) {
    return values[middle] ?? Number.NaN
  }

  return ((values[middle - 1] ?? Number.NaN) + (values[middle] ?? Number.NaN)) / 2
}

export function sampleVariance(values: number[]): number {
  if (values.length < 2) {
    return Number.NaN
  }

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length
  const squaredDeltaSum = values.reduce((sum, value) => {
    const delta = value - mean
    return sum + delta * delta
  }, 0)

  return squaredDeltaSum / (values.length - 1)
}

export function sampleCovariance(left: number[], right: number[], functionName: string): number {
  if (left.length !== right.length) {
    throw new Error(`${functionName}() requires arrays with the same length`)
  }

  if (left.length < 2) {
    return Number.NaN
  }

  const leftMean = left.reduce((sum, value) => sum + value, 0) / left.length
  const rightMean = right.reduce((sum, value) => sum + value, 0) / right.length
  let total = 0

  for (let index = 0; index < left.length; index += 1) {
    total += ((left[index] ?? 0) - leftMean) * ((right[index] ?? 0) - rightMean)
  }

  return total / (left.length - 1)
}
