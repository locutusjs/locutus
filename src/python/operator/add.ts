import { pythonAdd } from '../_helpers/_operator.ts'

export function add(a: unknown, b: unknown): number | string | unknown[] {
  //      discuss at: https://locutus.io/python/operator/add/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Adds numbers and concatenates strings or arrays like Python's operator.add.
  //       example 1: add(2, 3)
  //       returns 1: 5
  //       example 2: add('py', 'thon')
  //       returns 2: 'python'

  return pythonAdd(a, b, 'add')
}
