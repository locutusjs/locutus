export function hasPrefix(str: string, prefix: string): boolean {
  //  discuss at: https://locutus.io/swift/String/hasPrefix/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns true when str begins with prefix, like Swift hasPrefix(_:).
  //   example 1: hasPrefix('Locutus', 'Loc')
  //   returns 1: true
  //   example 2: hasPrefix('Locutus', 'loc')
  //   returns 2: false
  //   example 3: hasPrefix('', '')
  //   returns 3: true

  return String(str).startsWith(String(prefix))
}
