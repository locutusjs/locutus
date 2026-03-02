/**
 * Locutus Stats Tags
 * @description Provide dynamic stats (function count, language list) for use in markdown content.
 * @example
 *     {% locutus_func_count %}        → "497"
 *     {% locutus_lang_count %}        → "12"
 *     {% locutus_lang_list %}         → "PHP, Go, Python, Ruby, C, Perl, Lua, R, Julia, Elixir, Clojure, and AWK"
 */

hexo.extend.tag.register('locutus_func_count', function () {
  return String(hexo.locals.get('pages').find({ type: 'function' }).length)
})

hexo.extend.tag.register('locutus_lang_count', function () {
  return String(hexo.locals.get('pages').find({ type: 'language' }).length)
})

hexo.extend.tag.register('locutus_lang_list', function () {
  var langs = []
  hexo.locals.get('pages').find({ type: 'language' }).sort('order').each(function (lang) {
    langs.push(lang.human || lang.language)
  })
  if (langs.length === 0) {
    return ''
  }
  if (langs.length === 1) {
    return langs[0]
  }
  return langs.slice(0, -1).join(', ') + ', and ' + langs[langs.length - 1]
})
