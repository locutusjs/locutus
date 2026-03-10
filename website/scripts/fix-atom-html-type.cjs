'use strict'

function resolveAtomFeedPath(config) {
  const feedConfig = config.feed || {}
  const types = Array.isArray(feedConfig.type) ? feedConfig.type : [feedConfig.type || 'atom']
  const paths = Array.isArray(feedConfig.path) ? feedConfig.path : [feedConfig.path || 'atom.xml']
  const atomIndex = types.indexOf('atom')

  if (atomIndex === -1) {
    return null
  }

  const atomPath = paths[atomIndex] || 'atom.xml'

  return atomPath.replace(/^\/+/, '')
}

function patchAtomHtmlTypes(xml) {
  return xml
    .replace(/<content(?![^>]*\btype=)([^>]*)>(?=\s*<!\[CDATA\[)/g, '<content type="html"$1>')
    .replace(/<summary(?![^>]*\btype=)([^>]*)>(?=\s*<!\[CDATA\[)/g, '<summary type="html"$1>')
}

if (typeof hexo !== 'undefined') {
  hexo.extend.filter.register('after_generate', async () => {
    const atomFeedPath = resolveAtomFeedPath(hexo.config)

    if (!atomFeedPath) {
      return
    }

    const stream = hexo.route.get(atomFeedPath)

    if (!stream) {
      return
    }

    const chunks = []

    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)))
    }

    const xml = Buffer.concat(chunks).toString('utf8')
    const nextXml = patchAtomHtmlTypes(xml)

    if (nextXml !== xml) {
      hexo.route.set(atomFeedPath, nextXml)
    }
  })
}

module.exports = {
  patchAtomHtmlTypes,
  resolveAtomFeedPath,
}
