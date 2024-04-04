module.exports = function xdiff_string_diff(oldData, newData, contextLines, minimal) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/xdiff_string_diff
  // original by: Brett Zamir (https://brett-zamir.me)
  //    based on: Imgen Tata (https://www.myipdf.com/)
  // bugfixed by: Imgen Tata (https://www.myipdf.com/)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: The minimal argument is not currently supported
  //   example 1: xdiff_string_diff('', 'Hello world!')
  //   returns 1: '@@ -0,0 +1,1 @@\n+Hello world!'

  // (This code was done by Imgen Tata; I have only reformatted for use in Locutus)

  // See https://en.wikipedia.org/wiki/Diff#Unified_format
  let i = 0
  let j = 0
  let k = 0
  let oriHunkStart
  let newHunkStart
  let oriHunkEnd
  let newHunkEnd
  let oriHunkLineNo
  let newHunkLineNo
  let oriHunkSize
  let newHunkSize
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
  let oriLines
  let newLines
  const NEW_LINE = '\n'

  const _trim = function (text) {
    if (typeof text !== 'string') {
      throw new Error('String parameter required')
    }

    return text.replace(/(^\s*)|(\s*$)/g, '')
  }

  const _verifyType = function (type) {
    const args = arguments
    const argsLen = arguments.length
    const basicTypes = ['number', 'boolean', 'string', 'function', 'object', 'undefined']
    let basicType
    let i
    let j
    const typeOfType = typeof type
    if (typeOfType !== 'string' && typeOfType !== 'function') {
      throw new Error('Bad type parameter')
    }

    if (argsLen < 2) {
      throw new Error('Too few arguments')
    }

    if (typeOfType === 'string') {
      type = _trim(type)

      if (type === '') {
        throw new Error('Bad type parameter')
      }

      for (j = 0; j < basicTypes.length; j++) {
        basicType = basicTypes[j]

        if (basicType === type) {
          for (i = 1; i < argsLen; i++) {
            if (typeof args[i] !== type) {
              throw new Error('Bad type')
            }
          }

          return
        }
      }

      throw new Error('Bad type parameter')
    }

    // Not basic type. we need to use instanceof operator
    for (i = 1; i < argsLen; i++) {
      if (!(args[i] instanceof type)) {
        throw new Error('Bad type')
      }
    }
  }

  const _hasValue = function (array, value) {
    let i
    _verifyType(Array, array)

    for (i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return true
      }
    }

    return false
  }

  const _areTypeOf = function (type) {
    const args = arguments
    const argsLen = arguments.length
    const basicTypes = ['number', 'boolean', 'string', 'function', 'object', 'undefined']
    let basicType
    let i
    let j
    const typeOfType = typeof type

    if (typeOfType !== 'string' && typeOfType !== 'function') {
      throw new Error('Bad type parameter')
    }

    if (argsLen < 2) {
      throw new Error('Too few arguments')
    }

    if (typeOfType === 'string') {
      type = _trim(type)

      if (type === '') {
        return false
      }

      for (j = 0; j < basicTypes.length; j++) {
        basicType = basicTypes[j]

        if (basicType === type) {
          for (i = 1; i < argsLen; i++) {
            if (typeof args[i] !== type) {
              return false
            }
          }

          return true
        }
      }

      throw new Error('Bad type parameter')
    }

    // Not basic type. we need to use instanceof operator
    for (i = 1; i < argsLen; i++) {
      if (!(args[i] instanceof type)) {
        return false
      }
    }

    return true
  }

  const _getInitializedArray = function (arraySize, initValue) {
    const array = []
    let i
    _verifyType('number', arraySize)

    for (i = 0; i < arraySize; i++) {
      array.push(initValue)
    }

    return array
  }

  const _splitIntoLines = function (text) {
    _verifyType('string', text)

    if (text === '') {
      return []
    }
    return text.split('\n')
  }

  const _isEmptyArray = function (obj) {
    return _areTypeOf(Array, obj) && obj.length === 0
  }

  /**
   * Finds longest common sequence between two sequences
   * @see {@link https://wordaligned.org/articles/longest-common-subsequence}
   */
  const _findLongestCommonSequence = function (seq1, seq2, seq1IsInLcs, seq2IsInLcs) {
    if (!_areTypeOf(Array, seq1, seq2)) {
      throw new Error('Array parameters are required')
    }

    // Deal with edge case
    if (_isEmptyArray(seq1) || _isEmptyArray(seq2)) {
      return []
    }

    // Function to calculate lcs lengths
    const lcsLens = function (xs, ys) {
      let i
      let j
      let prev
      const curr = _getInitializedArray(ys.length + 1, 0)

      for (i = 0; i < xs.length; i++) {
        prev = curr.slice(0)
        for (j = 0; j < ys.length; j++) {
          if (xs[i] === ys[j]) {
            curr[j + 1] = prev[j] + 1
          } else {
            curr[j + 1] = Math.max(curr[j], prev[j + 1])
          }
        }
      }

      return curr
    }

    // Function to find lcs and fill in the array to indicate the optimal longest common sequence
    const _findLcs = function (xs, xidx, xIsIn, ys) {
      let i
      let xb
      let xe
      let llB
      let llE
      let pivot
      let max
      let yb
      let ye
      const nx = xs.length
      const ny = ys.length

      if (nx === 0) {
        return []
      }
      if (nx === 1) {
        if (_hasValue(ys, xs[0])) {
          xIsIn[xidx] = true
          return [xs[0]]
        }
        return []
      }
      i = Math.floor(nx / 2)
      xb = xs.slice(0, i)
      xe = xs.slice(i)
      llB = lcsLens(xb, ys)
      llE = lcsLens(xe.slice(0).reverse(), ys.slice(0).reverse())

      pivot = 0
      max = 0
      for (j = 0; j <= ny; j++) {
        if (llB[j] + llE[ny - j] > max) {
          pivot = j
          max = llB[j] + llE[ny - j]
        }
      }
      yb = ys.slice(0, pivot)
      ye = ys.slice(pivot)
      return _findLcs(xb, xidx, xIsIn, yb).concat(_findLcs(xe, xidx + i, xIsIn, ye))
    }

    // Fill in seq1IsInLcs to find the optimal longest common subsequence of first sequence
    _findLcs(seq1, 0, seq1IsInLcs, seq2)
    // Fill in seq2IsInLcs to find the optimal longest common subsequence
    // of second sequence and return the result
    return _findLcs(seq2, 0, seq2IsInLcs, seq1)
  }

  // First, check the parameters
  if (_areTypeOf('string', oldData, newData) === false) {
    return false
  }

  if (oldData === newData) {
    return ''
  }

  if (typeof contextLines !== 'number' || contextLines > MAX_CONTEXT_LINES || contextLines < MIN_CONTEXT_LINES) {
    contextLines = DEFAULT_CONTEXT_LINES
  }

  oriLines = _splitIntoLines(oldData)
  newLines = _splitIntoLines(newData)
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
      unidiff += NEW_LINE + DELETION_INDICATOR + oriLines[i]
    }

    for (j = 0; j < newLen; j++) {
      unidiff += NEW_LINE + ADDITION_INDICATOR + newLines[j]
    }

    return unidiff
  }

  let leadingContext = []
  let trailingContext = []
  let actualLeadingContext = []
  let actualTrailingContext = []

  // Regularize leading context by the contextLines parameter
  const regularizeLeadingContext = function (context) {
    if (context.length === 0 || contextLines === 0) {
      return []
    }

    const contextStartPos = Math.max(context.length - contextLines, 0)

    return context.slice(contextStartPos)
  }

  // Regularize trailing context by the contextLines parameter
  const regularizeTrailingContext = function (context) {
    if (context.length === 0 || contextLines === 0) {
      return []
    }

    return context.slice(0, Math.min(contextLines, context.length))
  }

  // Skip common lines in the beginning
  while (i < oriLen && oriIsInLcs[i] === true && newIsInLcs[i] === true) {
    leadingContext.push(oriLines[i])
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
      trailingContext.push(oriLines[i])
      k++
      i++
      j++
    }

    if (
      k >= lcsLen || // No more in longest common lines
      trailingContext.length >= 2 * contextLines
    ) {
      // Context break found
      if (trailingContext.length < 2 * contextLines) {
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
          unidiff += CONTEXT_INDICATOR + oriLines[oriHunkStart] + NEW_LINE
          oriHunkStart++
          newHunkStart++
        } else if (oriHunkStart < oriHunkEnd && oriIsInLcs[oriHunkStart] === false) {
          // The deletion line
          unidiff += DELETION_INDICATOR + oriLines[oriHunkStart] + NEW_LINE
          oriHunkStart++
        } else if (newHunkStart < newHunkEnd && newIsInLcs[newHunkStart] === false) {
          // The additional line
          unidiff += ADDITION_INDICATOR + newLines[newHunkStart] + NEW_LINE
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
