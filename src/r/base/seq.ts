export function seq(from: number, to?: number, by?: number, length_out?: number): number[] {
  //  discuss at: https://locutus.io/r/seq/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Generates numeric sequences, similar to common R seq() forms.
  //      note 2: Supported forms: seq(to), seq(from, to), seq(from, to, by), seq(from, to, undefined, length_out).
  //   example 1: seq(5)
  //   returns 1: [1, 2, 3, 4, 5]
  //   example 2: seq(1, 5, 2)
  //   returns 2: [1, 3, 5]
  //   example 3: seq(1, 2, undefined, 5)
  //   returns 3: [1, 1.25, 1.5, 1.75, 2]

  const start = Number(to === undefined ? 1 : from)
  const end = Number(to === undefined ? from : to)
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return []
  }

  const lengthOut = normalizeLengthOut(length_out)
  if (lengthOut !== null) {
    if (lengthOut <= 0) {
      return []
    }
    if (lengthOut === 1) {
      return [start]
    }
    const step = (end - start) / (lengthOut - 1)
    const out: number[] = []
    for (let i = 0; i < lengthOut; i++) {
      out.push(roundNumber(start + step * i))
    }
    return out
  }

  const step = by === undefined ? (end >= start ? 1 : -1) : Number(by)
  if (!Number.isFinite(step) || step === 0) {
    throw new RangeError('seq(): by must be a non-zero finite number')
  }

  if ((end - start) * step < 0) {
    return []
  }

  const out: number[] = []
  const epsilon = Math.abs(step) * 1e-12
  if (step > 0) {
    for (let value = start; value <= end + epsilon; value += step) {
      out.push(roundNumber(value))
    }
  } else {
    for (let value = start; value >= end - epsilon; value += step) {
      out.push(roundNumber(value))
    }
  }

  return out
}

function normalizeLengthOut(value: number | undefined): number | null {
  if (value === undefined) {
    return null
  }

  const n = Number(value)
  if (!Number.isFinite(n)) {
    return null
  }

  return Math.trunc(n)
}

function roundNumber(value: number): number {
  return Number.parseFloat(value.toFixed(12))
}
