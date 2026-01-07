#!/usr/bin/env node

import { Util } from './util.ts'

const util = new Util(process.argv)
const command = process.argv[2] as keyof Util

if (typeof util[command] === 'function') {
  ;(util[command] as (cb: (err: Error | null) => void) => void)(function (err) {
    if (err) {
      throw err
    }
    console.log('Done')
  })
} else {
  console.error(`Unknown command: ${command}`)
  console.error('Available commands: reindex, writetests, injectweb')
  process.exit(1)
}
