export function toupper(str: string): string {
  //      discuss at: https://locutus.io/powershell/toupper/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: toupper('hello world')
  //       returns 1: 'HELLO WORLD'
  //       example 2: toupper('Locutus')
  //       returns 2: 'LOCUTUS'

  return String(str).toUpperCase()
}
