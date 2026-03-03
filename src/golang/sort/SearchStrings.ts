export function SearchStrings(a: string[], x: string): number {
  //      discuss at: https://locutus.io/golang/sort/SearchStrings
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: SearchStrings(['a', 'c', 'e', 'g'], 'e')
  //       returns 1: 2
  //       example 2: SearchStrings(['a', 'c', 'e', 'g'], 'd')
  //       returns 2: 2
  //       example 3: SearchStrings(['a', 'c', 'e', 'g'], 'z')
  //       returns 3: 4

  let low = 0
  let high = a.length

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2)
    const candidate = a[mid]
    if (candidate !== undefined && candidate < x) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  return low
}
