import fs from 'fs'
import type { PhpRuntimeValue } from '../_helpers/_phpTypes.ts'

type FileGetContentsInput = PhpRuntimeValue

export function file_get_contents(
  url: string,
  _flags?: FileGetContentsInput,
  _context?: FileGetContentsInput,
  _offset?: number,
  _maxLen?: number,
): string | false {
  //       discuss at: https://locutus.io/php/file_get_contents/
  //      original by: Legaev Andrey
  //         input by: Jani Hartikainen
  //         input by: Raphael (Ao) RUDLER
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Brett Zamir (https://brett-zamir.me)
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  // reimplemented by: Kevin van Zonneveld (https://kvz.io)
  //           note 1: This used to work in the browser via blocking ajax
  //           note 1: requests in 1.3.2 and earlier
  //           note 1: but then people started using that for real app,
  //           note 1: so we deprecated this behavior,
  //           note 1: so this function is now Node-only
  //        example 1: var $buf = file_get_contents('test/never-change.txt')
  //        example 1: var $result = $buf.indexOf('hash') !== -1
  //        returns 1: true

  return fs.readFileSync(url, 'utf-8')
}
