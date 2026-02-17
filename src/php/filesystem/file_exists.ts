import fs from 'fs'

export function file_exists(filename: string): boolean {
  //      discuss at: https://locutus.io/php/file_exists/
  // parity verified: PHP 8.3
  //     original by: Erik Niebla
  //          note 1: so this function is Node-only
  //       example 1: file_exists('test/never-change.txt')
  //       returns 1: true

  return fs.existsSync(filename)
}
