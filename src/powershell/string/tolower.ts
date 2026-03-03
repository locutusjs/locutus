export function tolower(str: string): string {
  //      discuss at: https://locutus.io/powershell/tolower/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: tolower('HELLO WORLD')
  //       returns 1: 'hello world'
  //       example 2: tolower('Locutus')
  //       returns 2: 'locutus'

  return String(str).toLowerCase()
}
