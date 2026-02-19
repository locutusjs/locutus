export function uniqid(prefix?: string, moreEntropy?: boolean): string {
  //  discuss at: https://locutus.io/php/uniqid/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //  revised by: Kankrelune (https://www.webfaktory.info/)
  //      note 1: Uses an internal counter (in locutus global) to avoid collision
  //   example 1: var $id = uniqid()
  //   example 1: var $result = $id.length === 13
  //   returns 1: true
  //   example 2: var $id = uniqid('foo')
  //   example 2: var $result = $id.length === (13 + 'foo'.length)
  //   returns 2: true
  //   example 3: var $id = uniqid('bar', true)
  //   example 3: var $result = $id.length === (23 + 'bar'.length)
  //   returns 3: true

  const normalizedPrefix = prefix ?? ''

  let retId = ''
  const formatSeed = (seed: number, reqWidth: number): string => {
    const hexSeed = Number.parseInt(String(seed), 10).toString(16) // to hex str
    if (reqWidth < hexSeed.length) {
      // so long we split
      return hexSeed.slice(hexSeed.length - reqWidth)
    }
    if (reqWidth > hexSeed.length) {
      // so short we pad
      return new Array(1 + (reqWidth - hexSeed.length)).join('0') + hexSeed
    }
    return hexSeed
  }

  const locutusValue = Reflect.get(globalThis, '$locutus')
  const locutus = typeof locutusValue === 'object' && locutusValue !== null ? locutusValue : {}
  if (locutus !== locutusValue) {
    Reflect.set(globalThis, '$locutus', locutus)
  }
  const phpValue = Reflect.get(locutus, 'php')
  const php = typeof phpValue === 'object' && phpValue !== null ? phpValue : {}
  if (php !== phpValue) {
    Reflect.set(locutus, 'php', php)
  }

  const uniqidSeedValue = Reflect.get(php, 'uniqidSeed')
  let uniqidSeed = typeof uniqidSeedValue === 'number' ? uniqidSeedValue : Math.floor(Math.random() * 0x75bcd15) // init seed with big random int
  uniqidSeed++
  Reflect.set(php, 'uniqidSeed', uniqidSeed)

  // start with prefix, add current milliseconds hex string
  retId = normalizedPrefix
  retId += formatSeed(Number.parseInt(String(new Date().getTime() / 1000), 10), 8)
  // add seed hex string
  retId += formatSeed(uniqidSeed, 5)
  if (moreEntropy) {
    // for more entropy we add a float lower to 10
    retId += (Math.random() * 10).toFixed(8).toString()
  }

  return retId
}
