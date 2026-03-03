export function startswith(prefix: string, str: string): boolean {
  //      discuss at: https://locutus.io/powershell/startswith/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: startswith('Hello', 'Hello World')
  //       returns 1: true
  //       example 2: startswith('World', 'Hello World')
  //       returns 2: false

  return String(str).startsWith(String(prefix))
}
