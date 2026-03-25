import { pythonGetItem } from '../_helpers/_operator.ts'

export function getitem(a: unknown, b: unknown): unknown {
  //      discuss at: https://locutus.io/python/operator/getitem/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Indexes strings and arrays with Python-style negative indexes and object key lookup.
  //       example 1: getitem(['a', 'b', 'c'], -1)
  //       returns 1: 'c'
  //       example 2: getitem('banana', 2)
  //       returns 2: 'n'

  return pythonGetItem(a, b)
}
