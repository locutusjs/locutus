export function normalizePhpArrayKey(key: string): string | number {
  if (/^(0|-?[1-9]\d*)$/.test(key)) {
    const numericKey = Number(key)
    if (Number.isSafeInteger(numericKey)) {
      return numericKey
    }
  }

  return key
}
