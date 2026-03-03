export function endswith(suffix: string, str: string): boolean {
  //      discuss at: https://locutus.io/powershell/endswith/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: endswith('World', 'Hello World')
  //       returns 1: true
  //       example 2: endswith('Hello', 'Hello World')
  //       returns 2: false

  return String(str).endsWith(String(suffix))
}
