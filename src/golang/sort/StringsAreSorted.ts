export function StringsAreSorted(a: string[]): boolean {
  //      discuss at: https://locutus.io/golang/sort/StringsAreSorted
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: StringsAreSorted(['a', 'b', 'c'])
  //       returns 1: true
  //       example 2: StringsAreSorted(['a', 'c', 'b'])
  //       returns 2: false
  //       example 3: StringsAreSorted(['only'])
  //       returns 3: true

  for (let i = 1; i < a.length; i += 1) {
    const previous = a[i - 1]
    const current = a[i]
    if (previous === undefined || current === undefined) {
      continue
    }
    if (previous > current) {
      return false
    }
  }

  return true
}
