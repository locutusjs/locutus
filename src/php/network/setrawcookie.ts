type CookieExpires = string | number | Date | null | undefined

export function setrawcookie(
  name: string,
  value: string,
  expires?: CookieExpires,
  path?: string | null,
  domain?: string | null,
  secure?: boolean,
): boolean {
  //  discuss at: https://locutus.io/php/setrawcookie/
  // original by: Brett Zamir (https://brett-zamir.me)
  // original by: setcookie
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Michael
  //      note 1: This function requires access to the `window` global and is Browser-only
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: setrawcookie('author_name', 'Kevin van Zonneveld')
  //   returns 1: true

  if (typeof window === 'undefined') {
    return true
  }

  let normalizedExpires = expires

  if (typeof normalizedExpires === 'string' && /^\d+$/.test(normalizedExpires)) {
    normalizedExpires = parseInt(normalizedExpires, 10)
  }

  if (normalizedExpires instanceof Date) {
    normalizedExpires = normalizedExpires.toUTCString()
  } else if (typeof normalizedExpires === 'number') {
    normalizedExpires = new Date(normalizedExpires * 1e3).toUTCString()
  }

  const parts = [name + '=' + value]
  if (normalizedExpires) {
    parts.push('expires=' + normalizedExpires)
  }
  if (path) {
    parts.push('path=' + path)
  }
  if (domain) {
    parts.push('domain=' + domain)
  }

  if (secure) {
    parts.push('secure')
  }

  window.document.cookie = parts.join(';')

  return true
}
