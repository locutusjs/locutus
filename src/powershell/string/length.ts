export function length(str: string): number {
  //      discuss at: https://locutus.io/powershell/length/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: length('Hello')
  //       returns 1: 5
  //       example 2: length('')
  //       returns 2: 0

  return String(str).length
}
