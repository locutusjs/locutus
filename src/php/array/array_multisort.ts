import type { PhpAssoc } from '../_helpers/_phpTypes.ts'

type SortValue = {} | null | undefined
type SortableObject = PhpAssoc<SortValue>
type SortComparator = (a: SortValue, b: SortValue) => number
type ComparablePrimitive = string | number | bigint | boolean | Date
type SortArg = SortValue[] | SortableObject | SortFlag

const hasOwn = Object.prototype.hasOwnProperty

const flags: Readonly<{
  SORT_REGULAR: number
  SORT_NUMERIC: number
  SORT_STRING: number
  SORT_ASC: number
  SORT_DESC: number
}> = {
  SORT_REGULAR: 16,
  SORT_NUMERIC: 17,
  SORT_STRING: 18,
  SORT_ASC: 32,
  SORT_DESC: 40,
}

type SortFlag = keyof typeof flags

const isSortableObject = (value: SortValue): value is SortableObject =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

const isSortFlag = (value: SortValue): value is SortFlag => typeof value === 'string' && value in flags

const isComparablePrimitive = (value: SortValue): value is ComparablePrimitive =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'bigint' ||
  typeof value === 'boolean' ||
  value instanceof Date

const copyBackToObject = (target: SortableObject, values: SortValue[], keys: string[]): void => {
  for (const key in target) {
    if (hasOwn.call(target, key)) {
      delete target[key]
    }
  }
  for (let index = 0; index < values.length; index++) {
    const key = keys[index]
    if (key === undefined) {
      continue
    }
    target[key] = values[index]
  }
}

const compareRegular = (leftValue: SortValue, rightValue: SortValue): number => {
  if (leftValue === rightValue) {
    return 0
  }
  if (leftValue === null || leftValue === undefined) {
    return -1
  }
  if (rightValue === null || rightValue === undefined) {
    return 1
  }

  if (isComparablePrimitive(leftValue) && isComparablePrimitive(rightValue)) {
    return leftValue > rightValue ? 1 : -1
  }

  const left = String(leftValue)
  const right = String(rightValue)
  return left > right ? 1 : left < right ? -1 : 0
}

export function array_multisort(arr: SortValue[] | SortableObject, ...rest: SortArg[]): boolean {
  //  discuss at: https://locutus.io/php/array_multisort/
  // original by: Theriault (https://github.com/Theriault)
  // improved by: Oleg Andreyev (https://github.com/oleg-andreyev)
  //   example 1: array_multisort([1, 2, 1, 2, 1, 2], [1, 2, 3, 4, 5, 6])
  //   returns 1: true
  //   example 2: var $characters = {A: 'Edward', B: 'Locke', C: 'Sabin', D: 'Terra', E: 'Edward'}
  //   example 2: var $jobs = {A: 'Warrior', B: 'Thief', C: 'Monk', D: 'Mage', E: 'Knight'}
  //   example 2: array_multisort($characters, 'SORT_DESC', 'SORT_STRING', $jobs, 'SORT_ASC', 'SORT_STRING')
  //   returns 2: true
  //   example 3: var $lastnames = [ 'Carter','Adams','Monroe','Tyler','Madison','Kennedy','Adams']
  //   example 3: var $firstnames = ['James', 'John' ,'James', 'John', 'James',  'John',   'John']
  //   example 3: var $president = [ 39, 6, 5, 10, 4, 35, 2 ]
  //   example 3: array_multisort($firstnames, 'SORT_DESC', 'SORT_STRING', $lastnames, 'SORT_ASC', 'SORT_STRING', $president, 'SORT_NUMERIC')
  //   returns 3: true
  //   example 4: array_multisort(["productIds[]", "_"], 'SORT_ASC', ["productIds[]=977385529", "_=1502965788347"])
  //   returns 4: true
  //      note 1: flags: Translation table for sort arguments.
  //      note 1: Each argument turns on certain bits in the flag byte through addition.
  //      note 1: bits: HGFE DCBA
  //      note 1: args: Holds pointer to arguments for reassignment

  let i = 0
  let j = 0
  let l = 0
  let sal = 0
  let vkey = ''
  let elIndex = 0
  let zlast: SortValue

  const sortFlag: number[] = [0]
  const thingsToSort: boolean[] = []
  let nLastSort: number[] = []
  let lastSort: number[] = []
  const args: SortArg[] = [arr, ...rest]

  const sortDuplicator: SortComparator = function () {
    return nLastSort.shift() ?? 0
  }

  const sortFunctions: SortComparator[][] = [
    [
      function (a: SortValue, b: SortValue) {
        const result = compareRegular(a, b)
        lastSort.push(result)
        return result
      },
      function (a: SortValue, b: SortValue) {
        const result = compareRegular(b, a)
        lastSort.push(result)
        return result
      },
    ],
    [
      function (a: SortValue, b: SortValue) {
        const result = Number(a) - Number(b)
        lastSort.push(result)
        return result
      },
      function (a: SortValue, b: SortValue) {
        const result = Number(b) - Number(a)
        lastSort.push(result)
        return result
      },
    ],
    [
      function (a: SortValue, b: SortValue) {
        const left = String(a)
        const right = String(b)
        const result = left > right ? 1 : left < right ? -1 : 0
        lastSort.push(result)
        return result
      },
      function (a: SortValue, b: SortValue) {
        const left = String(b)
        const right = String(a)
        const result = left > right ? 1 : left < right ? -1 : 0
        lastSort.push(result)
        return result
      },
    ],
  ]

  const sortArrs: SortValue[][] = [[]]

  const sortKeys: string[][] = [[]]

  // Store first argument into sortArrs and sortKeys if an Object.
  // First Argument should be either a Javascript Array or an Object,
  // otherwise function would return FALSE like in PHP
  if (Array.isArray(arr)) {
    sortArrs[0] = arr
  } else if (isSortableObject(arr)) {
    const firstSortKeys = sortKeys[0]
    const firstSortValues = sortArrs[0]
    if (!firstSortKeys || !firstSortValues) {
      return false
    }
    for (const key in arr) {
      if (hasOwn.call(arr, key)) {
        firstSortKeys.push(key)
        firstSortValues.push(arr[key])
      }
    }
  } else {
    return false
  }

  // arrMainLength: Holds the length of the first array.
  // All other arrays must be of equal length, otherwise function would return FALSE like in PHP
  // sortComponents: Holds 2 indexes per every section of the array
  // that can be sorted. As this is the start, the whole array can be sorted.
  const primarySortArray = sortArrs[0]
  if (!primarySortArray) {
    return false
  }
  const arrMainLength = primarySortArray.length
  let sortComponents = [0, arrMainLength]

  // Loop through all other arguments, checking lengths and sort flags
  // of arrays and adding them to the above variables.
  const argl = args.length
  for (j = 1; j < argl; j++) {
    const arg = args[j]
    if (Array.isArray(arg)) {
      sortArrs[j] = arg
      sortFlag[j] = 0
      if (arg.length !== arrMainLength) {
        return false
      }
    } else if (isSortableObject(arg)) {
      const currentSortKeys: string[] = (sortKeys[j] = [])
      const currentSortValues: SortValue[] = (sortArrs[j] = [])
      sortFlag[j] = 0
      for (const key in arg) {
        if (hasOwn.call(arg, key)) {
          currentSortKeys.push(key)
          currentSortValues.push(arg[key])
        }
      }
      if (currentSortValues.length !== arrMainLength) {
        return false
      }
    } else if (typeof arg === 'string') {
      if (!isSortFlag(arg)) {
        return false
      }
      const lFlag = sortFlag.pop() ?? 0
      // Keep extra parentheses around latter flags check
      // to avoid minimization leading to CDATA closer
      if (((flags[arg] >>> 4) & (lFlag >>> 4)) > 0) {
        return false
      }
      sortFlag.push(lFlag + flags[arg])
    } else {
      return false
    }
  }

  for (i = 0; i !== arrMainLength; i++) {
    thingsToSort.push(true)
  }

  // Sort all the arrays....
  for (const iKey in sortArrs) {
    if (hasOwn.call(sortArrs, iKey)) {
      const iNum = Number(iKey)
      const lastSorts: number[][] = []
      let tmpArray: SortValue[] = []
      elIndex = 0
      nLastSort = []
      lastSort = []
      const currentSortArr = sortArrs[iNum]
      if (!currentSortArr) {
        continue
      }

      // If there are no sortComponents, then no more sorting is neeeded.
      // Copy the array back to the argument.
      if (sortComponents.length === 0) {
        const arg = args[iNum]
        if (Array.isArray(arg)) {
          args[iNum] = currentSortArr
        } else if (isSortableObject(arg)) {
          const currentSortKeySet = sortKeys[iNum] ?? []
          sal = currentSortArr.length
          for (j = 0, vkey = ''; j < sal; j++) {
            vkey = currentSortKeySet[j] ?? ''
            if (vkey !== '') {
              arg[vkey] = currentSortArr[j]
            }
          }
        }
        sortArrs.splice(iNum, 1)
        sortKeys.splice(iNum, 1)
        continue
      }

      // Sort function for sorting. Either sorts asc or desc, regular/string or numeric.
      const currentSortFlag = sortFlag[iNum] ?? 0
      const functionGroup = sortFunctions[currentSortFlag & 3]
      if (!functionGroup) {
        return false
      }
      let sFunction = functionGroup[(currentSortFlag & 8) > 0 ? 1 : 0] ?? functionGroup[0]

      // Sort current array.
      for (l = 0; l !== sortComponents.length; l += 2) {
        const componentStart = sortComponents[l]
        const componentEnd = sortComponents[l + 1]
        if (componentStart === undefined || componentEnd === undefined) {
          continue
        }
        tmpArray = currentSortArr.slice(componentStart, componentEnd + 1)
        tmpArray.sort(sFunction)
        // Is there a better way to copy an array in Javascript?
        lastSorts[l] = [...lastSort]
        elIndex = componentStart
        for (const value of tmpArray) {
          currentSortArr[elIndex] = value
          elIndex++
        }
      }

      // Duplicate the sorting of the current array on future arrays.
      sFunction = sortDuplicator
      for (const jKey in sortArrs) {
        if (hasOwn.call(sortArrs, jKey)) {
          const jNum = Number(jKey)
          const targetSortArr = sortArrs[jNum]
          if (!targetSortArr || targetSortArr === currentSortArr) {
            continue
          }
          for (l = 0; l !== sortComponents.length; l += 2) {
            const componentStart = sortComponents[l]
            const componentEnd = sortComponents[l + 1]
            if (componentStart === undefined || componentEnd === undefined) {
              continue
            }
            tmpArray = targetSortArr.slice(componentStart, componentEnd + 1)
            // alert(l + ':' + nLastSort);
            nLastSort = [...(lastSorts[l] ?? [])]
            tmpArray.sort(sFunction)
            elIndex = componentStart
            for (const value of tmpArray) {
              targetSortArr[elIndex] = value
              elIndex++
            }
          }
        }
      }

      // Duplicate the sorting of the current array on array keys
      for (const jKey in sortKeys) {
        if (hasOwn.call(sortKeys, jKey)) {
          const jNum = Number(jKey)
          const targetSortKeys = sortKeys[jNum]
          if (!targetSortKeys) {
            continue
          }
          for (l = 0; l !== sortComponents.length; l += 2) {
            const componentStart = sortComponents[l]
            const componentEnd = sortComponents[l + 1]
            if (componentStart === undefined || componentEnd === undefined) {
              continue
            }
            tmpArray = targetSortKeys.slice(componentStart, componentEnd + 1)
            nLastSort = [...(lastSorts[l] ?? [])]
            tmpArray.sort(sFunction)
            elIndex = componentStart
            for (const value of tmpArray) {
              targetSortKeys[elIndex] = String(value)
              elIndex++
            }
          }
        }
      }

      // Generate the next sortComponents
      zlast = null
      sortComponents = []
      let lastIndex = 0
      for (let idx = 0; idx < currentSortArr.length; idx++) {
        lastIndex = idx
        if (!thingsToSort[idx]) {
          if (sortComponents.length & 1) {
            sortComponents.push(idx - 1)
          }
          zlast = null
          continue
        }
        if (!(sortComponents.length & 1)) {
          if (zlast !== null) {
            if (currentSortArr[idx] === zlast) {
              sortComponents.push(idx - 1)
            } else {
              thingsToSort[idx] = false
            }
          }
          zlast = currentSortArr[idx]
        } else if (currentSortArr[idx] !== zlast) {
          sortComponents.push(idx - 1)
          zlast = currentSortArr[idx]
        }
      }

      if (sortComponents.length & 1) {
        sortComponents.push(lastIndex)
      }
      const arg = args[iNum]
      if (Array.isArray(arg)) {
        args[iNum] = currentSortArr
      } else if (isSortableObject(arg)) {
        copyBackToObject(arg, currentSortArr, sortKeys[iNum] ?? [])
      }
      sortArrs.splice(iNum, 1)
      sortKeys.splice(iNum, 1)
    }
  }
  return true
}
