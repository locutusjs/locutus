import { file_get_contents as fileGetContents } from '../filesystem/file_get_contents.ts'
import { sha1 } from '../strings/sha1.ts'

export function sha1_file(str_filename: string): string | false {
  //      discuss at: https://locutus.io/php/sha1_file/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Relies on file_get_contents which does not work in the browser, so Node only.
  //          note 2: Keep in mind that in accordance with PHP, the whole file is buffered and then
  //          note 2: hashed. We'd recommend Node's native crypto modules for faster and more
  //          note 2: efficient hashing
  //       example 1: sha1_file('test/never-change.txt')
  //       returns 1: '0ea65a1f4b4d69712affc58240932f3eb8a2af66'

  const buf = fileGetContents(str_filename)

  if (buf === false) {
    return false
  }

  return sha1(buf)
}
