import remarkToc from 'remark-toc'

/**
 * @typedef {import('remark-stringify').Options} Options
 */

const remarkConfig = {
  /** @type {Options} */
  settings: {
    bullet: '-',
    fences: true,
    listItemIndent: 'one',
  },
  plugins: [[remarkToc, { maxDepth: 3 }]],
}

export default remarkConfig
