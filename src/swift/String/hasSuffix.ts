export function hasSuffix(str: string, suffix: string): boolean {
  //  discuss at: https://locutus.io/swift/String/hasSuffix/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns true when str ends with suffix, like Swift hasSuffix(_:).
  //   example 1: hasSuffix('Locutus', 'tus')
  //   returns 1: true
  //   example 2: hasSuffix('Locutus', 'Tus')
  //   returns 2: false
  //   example 3: hasSuffix('', '')
  //   returns 3: true

  return String(str).endsWith(String(suffix))
}
