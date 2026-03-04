export function permutation<T>(arr: T[] | unknown, r?: number): T[][] {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/Array/permutation/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns all r-length permutations without repetition (default r = array length).
  //       example 1: permutation([1, 2, 3], 2)
  //       returns 1: [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]]
  //       example 2: permutation(['a', 'b'])
  //       returns 2: [['a', 'b'], ['b', 'a']]
  //       example 3: permutation([1, 2, 3], 0)
  //       returns 3: [[]]

  if (!Array.isArray(arr)) {
    return []
  }

  const target = r === undefined ? arr.length : Math.trunc(Number(r))
  if (!Number.isFinite(target) || target < 0 || target > arr.length) {
    return []
  }
  if (target === 0) {
    return [[]]
  }

  const out: T[][] = []
  const used = new Array<boolean>(arr.length).fill(false)
  const current: T[] = []

  const walk = (): void => {
    if (current.length === target) {
      out.push([...current])
      return
    }

    for (let i = 0; i < arr.length; i += 1) {
      if (used[i]) {
        continue
      }
      used[i] = true
      current.push(arr[i] as T)
      walk()
      current.pop()
      used[i] = false
    }
  }

  walk()
  return out
}
