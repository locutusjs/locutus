import { basename } from '../filesystem/basename.ts'

type PathInfoOptionName =
  | 'PATHINFO_DIRNAME'
  | 'PATHINFO_BASENAME'
  | 'PATHINFO_EXTENSION'
  | 'PATHINFO_FILENAME'
  | 'PATHINFO_ALL'
type PathInfoOptions = number | PathInfoOptionName | PathInfoOptionName[]
type PathInfoMap = {
  dirname?: string
  basename?: string
  extension?: string
  filename?: string
}

export function pathinfo(path: string, options?: PathInfoOptions): PathInfoMap | string | false {
  //  discuss at: https://locutus.io/php/pathinfo/
  // original by: Nate
  //  revised by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Dmitry Gorelenkov
  //    input by: Timo
  //      note 1: Inspired by actual PHP source: php5-5.2.6/ext/standard/string.c line #1559
  //      note 1: The way the bitwise arguments are handled allows for greater flexibility
  //      note 1: & compatability. We might even standardize this
  //      note 1: code and use a similar approach for
  //      note 1: other bitwise PHP functions
  //      note 1: Locutus tries very hard to stay away from a core.js
  //      note 1: file with global dependencies, because we like
  //      note 1: that you can just take a couple of functions and be on your way.
  //      note 1: But by way we implemented this function,
  //      note 1: if you want you can still declare the PATHINFO_*
  //      note 1: yourself, and then you can use:
  //      note 1: pathinfo('/www/index.html', PATHINFO_BASENAME | PATHINFO_EXTENSION);
  //      note 1: which makes it fully compliant with PHP syntax.
  //   example 1: pathinfo('/www/htdocs/index.html', 1)
  //   returns 1: '/www/htdocs'
  //   example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME')
  //   returns 2: 'index.html'
  //   example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION')
  //   returns 3: 'html'
  //   example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME')
  //   returns 4: 'index'
  //   example 5: pathinfo('/www/htdocs/index.html', 2 | 4)
  //   returns 5: {basename: 'index.html', extension: 'html'}
  //   example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL')
  //   returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
  //   example 7: pathinfo('/www/htdocs/index.html')
  //   returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}

  const tmpArr: PathInfoMap = {}
  let basenameValue: string | null = null
  let extensionValue: string | false | null = null
  let filenameValue: string | null = null

  // Input defaulting & sanitation
  if (!path) {
    return false
  }
  const optionsInput = options ?? 'PATHINFO_ALL'

  // Initialize binary arguments. Both the string & integer (constant) input is
  // allowed
  const OPTS: { [key in PathInfoOptionName]: number } = {
    PATHINFO_DIRNAME: 1,
    PATHINFO_BASENAME: 2,
    PATHINFO_EXTENSION: 4,
    PATHINFO_FILENAME: 8,
    PATHINFO_ALL: 15,
  }

  let resolvedOptions = 0
  if (typeof optionsInput === 'number') {
    resolvedOptions = optionsInput
  } else {
    const optionList = Array.isArray(optionsInput) ? optionsInput : [optionsInput]
    for (const option of optionList) {
      const flag = OPTS[option]
      if (flag) {
        resolvedOptions = resolvedOptions | flag
      }
    }
  }

  // Internal Functions
  const _getExt = function (pathValue: string): string | false {
    const str = pathValue + ''
    const dotP = str.lastIndexOf('.') + 1
    return !dotP ? false : dotP !== str.length ? str.substr(dotP) : ''
  }

  // Gather path infos
  if (resolvedOptions & OPTS.PATHINFO_DIRNAME) {
    const dirName = path.replace(/\\/g, '/').replace(/\/[^/]*\/?$/, '') // dirname
    tmpArr.dirname = dirName === path ? '.' : dirName
  }

  if (resolvedOptions & OPTS.PATHINFO_BASENAME) {
    if (basenameValue === null) {
      basenameValue = basename(path)
    }
    tmpArr.basename = basenameValue
  }

  if (resolvedOptions & OPTS.PATHINFO_EXTENSION) {
    if (basenameValue === null) {
      basenameValue = basename(path)
    }
    if (extensionValue === null) {
      extensionValue = _getExt(basenameValue)
    }
    if (extensionValue !== false) {
      tmpArr.extension = extensionValue
    }
  }

  if (resolvedOptions & OPTS.PATHINFO_FILENAME) {
    if (basenameValue === null) {
      basenameValue = basename(path)
    }
    if (extensionValue === null) {
      extensionValue = _getExt(basenameValue)
    }
    if (filenameValue === null) {
      filenameValue = basenameValue.slice(
        0,
        basenameValue.length - (extensionValue ? extensionValue.length + 1 : extensionValue === false ? 0 : 1),
      )
    }

    tmpArr.filename = filenameValue
  }

  // If array contains only 1 element: return string
  const values = Object.values(tmpArr).filter((value): value is string => typeof value === 'string')
  if (values.length === 1) {
    return values[0] ?? ''
  }

  // Return full-blown array
  return tmpArr
}
