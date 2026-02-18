import type { PhpMixed } from '../_helpers/_phpTypes.ts'

type BasicType = 'number' | 'boolean' | 'string' | 'function' | 'object' | 'undefined'
type TypeConstructor = abstract new (...args: never[]) => object
type TypeDescriptor = BasicType | TypeConstructor
type UnknownValue = PhpMixed

export function xdiff_string_diff(
  oldData: string,
  newData: string,
  contextLines?: number,
  _minimal?: boolean,
): string | false {
  //      discuss at: https://locutus.io/php/xdiff_string_diff
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //        based on: Imgen Tata (https://www.myipdf.com/)
  //     bugfixed by: Imgen Tata (https://www.myipdf.com/)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //          note 1: The minimal argument is not currently supported
  //       example 1: xdiff_string_diff('', 'Hello world!')
  //       returns 1: '@@ -0,0 +1,1 @@\n+Hello world!'

  // (This code was done by Imgen Tata; I have only reformatted for use in Locutus)

  // See https://en.wikipedia.org/wiki/Diff#Unified_format
  let i = 0
  let j = 0
  let k = 0
  let oriHunkStart = 0
  let newHunkStart = 0
  let oriHunkEnd = 0
  let newHunkEnd = 0
  let oriHunkLineNo = 0
  let newHunkLineNo = 0
  let oriHunkSize = 0
  let newHunkSize = 0
  const MAX_CONTEXT_LINES = Number.POSITIVE_INFINITY // Potential configuration
  const MIN_CONTEXT_LINES = 0
  const DEFAULT_CONTEXT_LINES = 3
  const HEADER_PREFIX = '@@ ' //
  const HEADER_SUFFIX = ' @@'
  const ORIGINAL_INDICATOR = '-'
  const NEW_INDICATOR = '+'
  const RANGE_SEPARATOR = ','
  const CONTEXT_INDICATOR = ' '
  const DELETION_INDICATOR = '-'
  const ADDITION_INDICATOR = '+'
  let oriLines: string[] = []
  let newLines: string[] = []
  const NEW_LINE = '\n'

  const _trim = function (text: string): string {
    if (typeof text !== 'string') {
      throw new Error('String parameter required')
    }

    return text.replace(/(^\s*)|(\s*$)/g, '')
  }

  const _verifyType = function (type: TypeDescriptor, ...values: UnknownValue[]): void {
    const argsLen = values.length
    const basicTypes: BasicType[] = ['number', 'boolean', 'string', 'function', 'object', 'undefined']
    let basicType: BasicType | undefined
    let i = 0
    let j = 0
    const typeOfType = typeof type
    if (typeOfType !== 'string' && typeOfType !== 'function') {
      throw new Error('Bad type parameter')
    }

    if (argsLen < 1) {
      throw new Error('Too few arguments')
    }

    if (typeof type === 'string') {
      const typeString = _trim(type)

      if (typeString === '') {
        throw new Error('Bad type parameter')
      }

      for (j = 0; j < basicTypes.length; j++) {
        basicType = basicTypes[j]

        if (basicType === typeString) {
          for (i = 0; i < argsLen; i++) {
            if (typeof values[i] !== typeString) {
              throw new Error('Bad type')
            }
          }

          return
        }
      }

      throw new Error('Bad type parameter')
    }

    // Not basic type. we need to use instanceof operator
    for (i = 0; i < argsLen; i++) {
      if (!(values[i] instanceof type)) {
        throw new Error('Bad type')
      }
    }
  }

  const _hasValue = function (array: UnknownValue[], value: UnknownValue): boolean {
    let i = 0
    if (!Array.isArray(array)) {
      throw new Error('Array parameter required')
    }

    for (i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return true
      }
    }

    return false
  }

  const _areTypeOf = function (type: TypeDescriptor, ...values: UnknownValue[]): boolean {
    const argsLen = values.length
    const basicTypes: BasicType[] = ['number', 'boolean', 'string', 'function', 'object', 'undefined']
    let basicType: BasicType | undefined
    let i = 0
    let j = 0
    const typeOfType = typeof type

    if (typeOfType !== 'string' && typeOfType !== 'function') {
      throw new Error('Bad type parameter')
    }

    if (argsLen < 1) {
      throw new Error('Too few arguments')
    }

    if (typeof type === 'string') {
      const typeString = _trim(type)

      if (typeString === '') {
        return false
      }

      for (j = 0; j < basicTypes.length; j++) {
        basicType = basicTypes[j]

        if (basicType === typeString) {
          for (i = 0; i < argsLen; i++) {
            if (typeof values[i] !== typeString) {
              return false
            }
          }

          return true
        }
      }

      throw new Error('Bad type parameter')
    }

    // Not basic type. we need to use instanceof operator
    for (i = 0; i < argsLen; i++) {
      if (!(values[i] instanceof type)) {
        return false
      }
    }

    return true
  }

  const _getInitializedArray = function <T>(arraySize: number, initValue: T): T[] {
    const array: T[] = []
    let i = 0
    _verifyType('number', arraySize)

    for (i = 0; i < arraySize; i++) {
      array.push(initValue)
    }

    return array
  }

  const _splitIntoLines = function (text: string): string[] {
    _verifyType('string', text)

    if (text === '') {
      return []
    }
    return text.split('\n')
  }

  const _isEmptyArray = function (obj: UnknownValue): boolean {
    return Array.isArray(obj) && obj.length === 0
  }

  /**
   * Finds longest common sequence between two sequences
   * @see {@link https://wordaligned.org/articles/longest-common-subsequence}
   */
  const _findLongestCommonSequence = function (
    seq1: string[],
    seq2: string[],
    seq1IsInLcs: boolean[],
    seq2IsInLcs: boolean[],
  ): string[] {
    if (!_areTypeOf(Array, seq1, seq2)) {
      throw new Error('Array parameters are required')
    }

    // Deal with edge case
    if (_isEmptyArray(seq1) || _isEmptyArray(seq2)) {
      return []
    }

    // Function to calculate lcs lengths
    const lcsLens = function (xs: string[], ys: string[]): number[] {
      let i = 0
      let j = 0
      let prev: number[] = []
      const curr = _getInitializedArray(ys.length + 1, 0)

      for (i = 0; i < xs.length; i++) {
        prev = curr.slice(0)
        for (j = 0; j < ys.length; j++) {
          if (xs[i] === ys[j]) {
            curr[j + 1] = (prev[j] ?? 0) + 1
          } else {
            curr[j + 1] = Math.max(curr[j] ?? 0, prev[j + 1] ?? 0)
          }
        }
      }

      return curr
    }

    // Function to find lcs and fill in the array to indicate the optimal longest common sequence
    const _findLcs = function (xs: string[], xidx: number, xIsIn: boolean[], ys: string[]): string[] {
      const nx = xs.length
      const ny = ys.length

      if (nx === 0) {
        return []
      }
      if (nx === 1) {
        const first = xs[0]
        if (first !== undefined && _hasValue(ys, first)) {
          xIsIn[xidx] = true
          return [first]
        }
        return []
      }
      const i = Math.floor(nx / 2)
      const xb = xs.slice(0, i)
      const xe = xs.slice(i)
      const llB = lcsLens(xb, ys)
      const llE = lcsLens(xe.slice(0).reverse(), ys.slice(0).reverse())

      let pivot = 0
      let max = 0
      let j = 0
      for (j = 0; j <= ny; j++) {
        if ((llB[j] ?? 0) + (llE[ny - j] ?? 0) > max) {
          pivot = j
          max = (llB[j] ?? 0) + (llE[ny - j] ?? 0)
        }
      }
      const yb = ys.slice(0, pivot)
      const ye = ys.slice(pivot)
      return _findLcs(xb, xidx, xIsIn, yb).concat(_findLcs(xe, xidx + i, xIsIn, ye))
    }

    // Fill in seq1IsInLcs to find the optimal longest common subsequence of first sequence
    _findLcs(seq1, 0, seq1IsInLcs, seq2)
    // Fill in seq2IsInLcs to find the optimal longest common subsequence
    // of second sequence and return the result
    return _findLcs(seq2, 0, seq2IsInLcs, seq1)
  }

  const oldText = oldData
  const newText = newData

  if (oldText === newText) {
    return ''
  }

  let context = DEFAULT_CONTEXT_LINES
  if (typeof contextLines === 'number' && contextLines <= MAX_CONTEXT_LINES && contextLines >= MIN_CONTEXT_LINES) {
    context = contextLines
  }

  oriLines = _splitIntoLines(oldText)
  newLines = _splitIntoLines(newText)
  const oriLen = oriLines.length
  const newLen = newLines.length
  const oriIsInLcs = _getInitializedArray(oriLen, false)
  const newIsInLcs = _getInitializedArray(newLen, false)
  const lcsLen = _findLongestCommonSequence(oriLines, newLines, oriIsInLcs, newIsInLcs).length
  let unidiff = ''

  if (lcsLen === 0) {
    // No common sequence
    unidiff = [
      HEADER_PREFIX,
      ORIGINAL_INDICATOR,
      oriLen > 0 ? '1' : '0',
      RANGE_SEPARATOR,
      oriLen,
      ' ',
      NEW_INDICATOR,
      newLen > 0 ? '1' : '0',
      RANGE_SEPARATOR,
      newLen,
      HEADER_SUFFIX,
    ].join('')

    for (i = 0; i < oriLen; i++) {
      unidiff += NEW_LINE + DELETION_INDICATOR + (oriLines[i] ?? '')
    }

    for (j = 0; j < newLen; j++) {
      unidiff += NEW_LINE + ADDITION_INDICATOR + (newLines[j] ?? '')
    }

    return unidiff
  }

  let leadingContext: string[] = []
  let trailingContext: string[] = []
  let actualLeadingContext: string[] = []
  let actualTrailingContext: string[] = []

  // Regularize leading context by the contextLines parameter
  const regularizeLeadingContext = function (contextBuffer: string[]): string[] {
    if (contextBuffer.length === 0 || context === 0) {
      return []
    }

    const contextStartPos = Math.max(contextBuffer.length - context, 0)

    return contextBuffer.slice(contextStartPos)
  }

  // Regularize trailing context by the contextLines parameter
  const regularizeTrailingContext = function (contextBuffer: string[]): string[] {
    if (contextBuffer.length === 0 || context === 0) {
      return []
    }

    return contextBuffer.slice(0, Math.min(context, contextBuffer.length))
  }

  // Skip common lines in the beginning
  while (i < oriLen && oriIsInLcs[i] === true && newIsInLcs[i] === true) {
    leadingContext.push(oriLines[i] ?? '')
    i++
  }

  j = i
  // The index in the longest common sequence
  k = i
  oriHunkStart = i
  newHunkStart = j
  oriHunkEnd = i
  newHunkEnd = j

  while (i < oriLen || j < newLen) {
    while (i < oriLen && oriIsInLcs[i] === false) {
      i++
    }
    oriHunkEnd = i

    while (j < newLen && newIsInLcs[j] === false) {
      j++
    }
    newHunkEnd = j

    // Find the trailing context
    trailingContext = []
    while (i < oriLen && oriIsInLcs[i] === true && j < newLen && newIsInLcs[j] === true) {
      trailingContext.push(oriLines[i] ?? '')
      k++
      i++
      j++
    }

    if (
      k >= lcsLen || // No more in longest common lines
      trailingContext.length >= 2 * context
    ) {
      // Context break found
      if (trailingContext.length < 2 * context) {
        // It must be last block of common lines but not a context break
        trailingContext = []

        // Force break out
        i = oriLen
        j = newLen

        // Update hunk ends to force output to the end
        oriHunkEnd = oriLen
        newHunkEnd = newLen
      }

      // Output the diff hunk

      // Trim the leading and trailing context block
      actualLeadingContext = regularizeLeadingContext(leadingContext)
      actualTrailingContext = regularizeTrailingContext(trailingContext)

      oriHunkStart -= actualLeadingContext.length
      newHunkStart -= actualLeadingContext.length
      oriHunkEnd += actualTrailingContext.length
      newHunkEnd += actualTrailingContext.length

      oriHunkLineNo = oriHunkStart + 1
      newHunkLineNo = newHunkStart + 1
      oriHunkSize = oriHunkEnd - oriHunkStart
      newHunkSize = newHunkEnd - newHunkStart

      // Build header
      unidiff += [
        HEADER_PREFIX,
        ORIGINAL_INDICATOR,
        oriHunkLineNo,
        RANGE_SEPARATOR,
        oriHunkSize,
        ' ',
        NEW_INDICATOR,
        newHunkLineNo,
        RANGE_SEPARATOR,
        newHunkSize,
        HEADER_SUFFIX,
        NEW_LINE,
      ].join('')

      // Build the diff hunk content
      while (oriHunkStart < oriHunkEnd || newHunkStart < newHunkEnd) {
        if (oriHunkStart < oriHunkEnd && oriIsInLcs[oriHunkStart] === true && newIsInLcs[newHunkStart] === true) {
          // The context line
          unidiff += CONTEXT_INDICATOR + (oriLines[oriHunkStart] ?? '') + NEW_LINE
          oriHunkStart++
          newHunkStart++
        } else if (oriHunkStart < oriHunkEnd && oriIsInLcs[oriHunkStart] === false) {
          // The deletion line
          unidiff += DELETION_INDICATOR + (oriLines[oriHunkStart] ?? '') + NEW_LINE
          oriHunkStart++
        } else if (newHunkStart < newHunkEnd && newIsInLcs[newHunkStart] === false) {
          // The additional line
          unidiff += ADDITION_INDICATOR + (newLines[newHunkStart] ?? '') + NEW_LINE
          newHunkStart++
        }
      }

      // Update hunk position and leading context
      oriHunkStart = i
      newHunkStart = j
      leadingContext = trailingContext
    }
  }

  // Trim the trailing new line if it exists
  if (unidiff.length > 0 && unidiff.charAt(unidiff.length) === NEW_LINE) {
    unidiff = unidiff.slice(0, -1)
  }

  return unidiff
}
