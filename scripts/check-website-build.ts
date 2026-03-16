import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type PageExpectation = {
  path: string
  title: string
  includes: string[]
  ogUrl?: string
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.dirname(scriptDir)
const publicDir = path.join(rootDir, 'website', 'public')

function fail(message: string): never {
  throw new Error(message)
}

function readFile(relativePath: string): string {
  const fullPath = path.join(publicDir, relativePath)
  if (!fs.existsSync(fullPath)) {
    fail(`Missing website output: ${relativePath}`)
  }
  return fs.readFileSync(fullPath, 'utf8')
}

function requireIncludes(label: string, content: string, expected: string): void {
  if (!content.includes(expected)) {
    fail(`${label} is missing expected content: ${expected}`)
  }
}

function requireMatch(label: string, content: string, pattern: RegExp): void {
  if (!pattern.test(content)) {
    fail(`${label} did not match ${pattern}`)
  }
}

function countHtmlFiles(dir: string): number {
  let count = 0

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      count += countHtmlFiles(entryPath)
      continue
    }
    if (entry.isFile() && entry.name.endsWith('.html')) {
      count += 1
    }
  }

  return count
}

function checkTopLevelOutputs(): void {
  const requiredFiles = ['index.html', '404.html', 'atom.xml', 'content.json', 'robots.txt', 'CNAME']
  for (const relativePath of requiredFiles) {
    readFile(relativePath)
  }

  const indexHtml = readFile('index.html')
  requireIncludes('website/public/index.html', indexHtml, 'Locutus')
  requireIncludes('website/public/index.html', indexHtml, 'Resistance is futile')
  requireIncludes('website/public/index.html', indexHtml, '/atom.xml')
  requireIncludes('website/public/index.html', indexHtml, 'content.json')
  requireMatch('website/public/index.html', indexHtml, /<meta name="generator" content="Hexo [^"]+">/)

  const atomXml = readFile('atom.xml')
  requireIncludes('website/public/atom.xml', atomXml, '<feed')
  requireIncludes('website/public/atom.xml', atomXml, '<title>Locutus</title>')
  requireIncludes('website/public/atom.xml', atomXml, '<content type="html">')
  requireIncludes('website/public/atom.xml', atomXml, '<summary type="html">')
  const entryCount = (atomXml.match(/<entry>/g) || []).length
  if (entryCount < 5) {
    fail(`website/public/atom.xml has too few feed entries: ${entryCount}`)
  }

  const contentJson = JSON.parse(readFile('content.json')) as {
    meta?: unknown
    pages?: Array<{ path?: string }>
    posts?: unknown[]
    categories?: unknown[]
    tags?: unknown[]
  }

  if (!contentJson.meta || !Array.isArray(contentJson.pages) || !Array.isArray(contentJson.posts)) {
    fail('website/public/content.json has an unexpected top-level shape')
  }

  if (contentJson.pages.length < 200) {
    fail(`website/public/content.json has too few pages: ${contentJson.pages.length}`)
  }
  if (contentJson.posts.length < 5) {
    fail(`website/public/content.json has too few posts: ${contentJson.posts.length}`)
  }
  if (!Array.isArray(contentJson.tags) || contentJson.tags.length < 10) {
    fail(`website/public/content.json has too few tags: ${contentJson.tags?.length ?? 0}`)
  }

  const requiredIndexedPaths = [
    'tcl/index.html',
    'clojure/core/partition_by/index.html',
    'lua/string/gsub/index.html',
    'perl/POSIX/ceil/index.html',
    'rust/str/strip_prefix/index.html',
    'julia/Base/findall/index.html',
  ]
  const indexedPaths = new Set(contentJson.pages.map((page) => page.path).filter((value): value is string => !!value))
  for (const requiredPath of requiredIndexedPaths) {
    if (!indexedPaths.has(requiredPath)) {
      fail(`website/public/content.json is missing indexed path: ${requiredPath}`)
    }
  }

  const htmlCount = countHtmlFiles(publicDir)
  if (htmlCount < 800) {
    fail(`website/public has too few HTML files: ${htmlCount}`)
  }
}

function checkPage(expectation: PageExpectation): void {
  const html = readFile(expectation.path)
  requireIncludes(expectation.path, html, expectation.title)
  requireMatch(expectation.path, html, /<meta name="generator" content="Hexo [^"]+">/)

  for (const expected of expectation.includes) {
    requireIncludes(expectation.path, html, expected)
  }

  if (expectation.ogUrl) {
    requireIncludes(expectation.path, html, `<meta property="og:url" content="${expectation.ogUrl}">`)
  }
}

function main(): void {
  checkTopLevelOutputs()

  const pages: PageExpectation[] = [
    {
      path: 'tcl/index.html',
      title: 'Tcl commands  in TypeScript | Locutus',
      includes: ['Upstream Surface Inventory', 'Explicit non-goals', 'Intentional extras', 'dict ensemble'],
      ogUrl: 'https://locutus.io/tcl/index.html',
    },
    {
      path: 'clojure/core/partition_by/index.html',
      title: 'Clojure&#39;s core/partition_by in TypeScript | Locutus',
      includes: ['Verified: Clojure', 'locutus/clojure/core/partition_by'],
      ogUrl: 'https://locutus.io/clojure/core/partition_by/index.html',
    },
    {
      path: 'lua/string/gsub/index.html',
      title: 'Lua&#39;s string.gsub in TypeScript | Locutus',
      includes: ['Verified: Lua', 'locutus/lua/string/gsub'],
      ogUrl: 'https://locutus.io/lua/string/gsub/index.html',
    },
    {
      path: 'perl/POSIX/ceil/index.html',
      title: 'Perl&#39;s POSIX::ceil in TypeScript | Locutus',
      includes: ['Verified: Perl', 'locutus/perl/POSIX/ceil'],
      ogUrl: 'https://locutus.io/perl/POSIX/ceil/index.html',
    },
    {
      path: 'rust/str/strip_prefix/index.html',
      title: 'Rust&#39;s str::strip_prefix in TypeScript | Locutus',
      includes: ['Verified: Rust', 'locutus/rust/str/strip_prefix'],
      ogUrl: 'https://locutus.io/rust/str/strip_prefix/index.html',
    },
    {
      path: 'julia/Base/findall/index.html',
      title: 'Julia&#39;s findall in TypeScript | Locutus',
      includes: ['Verified: Julia', 'locutus/julia/Base/findall'],
      ogUrl: 'https://locutus.io/julia/Base/findall/index.html',
    },
  ]

  for (const expectation of pages) {
    checkPage(expectation)
  }

  console.log('website build verification passed')
}

main()
