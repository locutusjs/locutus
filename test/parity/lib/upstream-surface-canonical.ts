import { runInDocker } from './docker.ts'
import type { DiscoveredUpstreamSurfaceNamespaceCatalog, UpstreamSurfaceSnapshot } from './types.ts'
import type { DiscoveredUpstreamSurfaceNamespace } from './upstream-surface-scope.ts'
import {
  buildScopedUpstreamSurfaceSnapshot,
  discoverUpstreamSurfaceNamespaceCatalogFromScope,
  getUpstreamSurfaceLanguageScope,
  getUpstreamSurfaceNamespaceScope,
} from './upstream-surface-scope.ts'

const textCache = new Map<string, Promise<string>>()
const jsonCache = new Map<string, Promise<unknown>>()

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/<wbr\s*\/?>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#([0-9]+);/g, (_match, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_match, code: string) => String.fromCodePoint(parseInt(code, 16)))
}

function stripHtml(value: string): string {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, ''))
}

function uniqueSorted(values: Iterable<string>): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
}

async function fetchText(url: string): Promise<string> {
  if (!textCache.has(url)) {
    textCache.set(
      url,
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to fetch ${url}: ${response.status} ${response.statusText}`)
        }
        return response.text()
      }),
    )
  }
  const cached = textCache.get(url)
  if (!cached) {
    throw new Error(`Text cache missing entry for ${url}`)
  }
  return await cached
}

async function fetchJson<T = unknown>(url: string): Promise<T> {
  if (!jsonCache.has(url)) {
    jsonCache.set(
      url,
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to fetch ${url}: ${response.status} ${response.statusText}`)
        }
        return response.json()
      }),
    )
  }
  const cached = jsonCache.get(url)
  if (!cached) {
    throw new Error(`JSON cache missing entry for ${url}`)
  }
  return (await cached) as T
}

async function discoverNamespacesFromScope(
  language: string,
  discoverEntries: (namespace: string, sourceRef: string) => Promise<string[]>,
): Promise<UpstreamSurfaceSnapshot> {
  const languageScope = getUpstreamSurfaceLanguageScope(language)
  const namespaces: DiscoveredUpstreamSurfaceNamespace[] = []

  for (const namespace of Object.keys(languageScope.namespaces).sort()) {
    const namespaceScope = languageScope.namespaces[namespace]
    if (!namespaceScope) {
      throw new Error(`Missing upstream namespace scope for ${language}/${namespace}`)
    }
    const entries = await discoverEntries(namespace, namespaceScope.sourceRef)
    namespaces.push({
      namespace,
      entries,
    })
  }

  return buildScopedUpstreamSurfaceSnapshot(language, namespaces)
}

function catalogFromScope(language: string): DiscoveredUpstreamSurfaceNamespaceCatalog {
  return discoverUpstreamSurfaceNamespaceCatalogFromScope(language)
}

function extractMatches(text: string, pattern: RegExp, normalize?: (match: string) => string | null): string[] {
  const values: string[] = []
  for (const match of text.matchAll(pattern)) {
    const raw = match[1]
    if (!raw) {
      continue
    }
    const normalized = normalize ? normalize(raw) : raw
    if (normalized) {
      values.push(normalized)
    }
  }
  return uniqueSorted(values)
}

function normalizeRustName(name: string): string | null {
  const cleaned = stripHtml(name).replace(/\s+/g, '')
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(cleaned)) {
    return null
  }
  return cleaned
}

function normalizePerlFunctionName(name: string): string | null {
  const decoded = decodeURIComponent(name)
  if (!/^[A-Za-z_][A-Za-z0-9_:]*$/.test(decoded)) {
    return null
  }
  return decoded
}

function normalizePowerShellMemberName(title: string): string | null {
  const cleaned = stripHtml(title).trim()
  const base = cleaned.replace(/\(.*$/, '')
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(base)) {
    return null
  }
  return base
}

function normalizeSwiftMemberTitle(title: string): string | null {
  const cleaned = stripHtml(title).trim()
  const base = cleaned
    .replace(/^`|`$/g, '')
    .replace(/\(.*$/, '')
    .replace(/^subscript$/, 'subscript')
  if (!/^[A-Za-z][A-Za-z0-9_.]*$/.test(base)) {
    return null
  }
  return base
}

function normalizeKotlinName(name: string): string | null {
  const cleaned = stripHtml(name).trim()
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(cleaned)) {
    return null
  }
  return cleaned
}

function normalizeHaskellName(name: string): string | null {
  const cleaned = stripHtml(name).trim()
  if (!/^[A-Za-z_][A-Za-z0-9_']*$/.test(cleaned)) {
    return null
  }
  return cleaned
}

function normalizeCFunctionName(name: string): string | null {
  const cleaned = stripHtml(name).trim()
  if (!/^[a-z_][a-z0-9_]*$/.test(cleaned)) {
    return null
  }
  return cleaned
}

export function discoverAwkUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  const script = `
BEGIN {
  for (name in FUNCTAB) print name
}
`.trim()
  const result = runInDocker('alpine:3.21', [
    'sh',
    '-lc',
    "apk add --no-cache gawk >/dev/null 2>&1 && gawk '" + script.replace(/'/g, "'\\''") + "' /dev/null | sort",
  ])

  if (!result.success) {
    throw new Error(result.error || 'Unable to discover GNU AWK built-ins')
  }

  return Promise.resolve(
    buildScopedUpstreamSurfaceSnapshot('awk', [
      {
        namespace: 'builtin',
        entries: uniqueSorted(
          result.output
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => /^[a-z_][a-z0-9_]*$/i.test(line)),
        ),
      },
    ]),
  )
}

export function discoverCUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverNamespacesFromScope('c', async (namespace, sourceRef) => {
    const html = await fetchText(sourceRef)
    const byteHtml =
      namespace === 'ctype' || namespace === 'string' || namespace === 'stdlib'
        ? await fetchText('https://en.cppreference.com/w/c/string/byte')
        : ''
    const mathHtml = namespace === 'stdlib' ? await fetchText('https://en.cppreference.com/w/c/numeric/math') : ''
    const algorithmHtml = namespace === 'stdlib' ? await fetchText('https://en.cppreference.com/w/c/algorithm') : ''
    const randomHtml = namespace === 'stdlib' ? await fetchText('https://en.cppreference.com/w/c/numeric/random') : ''

    const extractCNamesFromPage = (page: string, path: string) =>
      extractMatches(
        page,
        new RegExp(`<a[^>]+title="${path.replace(/\//g, '\\/')}"[^>]*>([\\s\\S]*?)<\\/a>`, 'g'),
        (block) => uniqueSorted(extractMatches(block, /<span>([^<]+)<\/span>/g, normalizeCFunctionName)).join('\n'),
      )
        .flatMap((block) => block.split('\n'))
        .filter(Boolean)

    if (namespace === 'math') {
      return extractMatches(html, /title="c\/numeric\/math\/([A-Za-z_][A-Za-z0-9_]*)"/g, normalizeCFunctionName).filter(
        (name) => name !== 'abs',
      )
    }

    if (namespace === 'stdio') {
      return uniqueSorted(
        [
          ...extractMatches(html, /title="c\/io\/([A-Za-z_][A-Za-z0-9_]*)"/g, normalizeCFunctionName),
          ...extractCNamesFromPage(html, 'c/io/fprintf'),
          ...extractCNamesFromPage(html, 'c/io/vfprintf'),
        ].filter((name): name is string => !!normalizeCFunctionName(name)),
      )
    }

    if (namespace === 'stdlib') {
      return uniqueSorted(
        [
          ...extractMatches(html, /title="c\/program\/([A-Za-z_][A-Za-z0-9_]*)"/g, normalizeCFunctionName),
          ...extractCNamesFromPage(html, 'c/program/getenv'),
          ...extractCNamesFromPage(byteHtml, 'c/string/byte/atoi'),
          ...extractCNamesFromPage(byteHtml, 'c/string/byte/atof'),
          ...extractCNamesFromPage(byteHtml, 'c/string/byte/strtol'),
          ...extractCNamesFromPage(byteHtml, 'c/string/byte/strtof'),
          ...extractCNamesFromPage(algorithmHtml, 'c/algorithm/qsort'),
          ...extractCNamesFromPage(algorithmHtml, 'c/algorithm/bsearch'),
          ...extractCNamesFromPage(randomHtml, 'c/numeric/random/rand'),
          ...extractCNamesFromPage(randomHtml, 'c/numeric/random/srand'),
          ...(mathHtml.includes('title="c/numeric/math/abs"') ? ['abs'] : []),
        ].filter((name): name is string => !!normalizeCFunctionName(name)),
      )
    }

    const byteNames = extractMatches(
      byteHtml || html,
      /title="c\/string\/byte\/([A-Za-z_][A-Za-z0-9_]*)"/g,
      normalizeCFunctionName,
    )

    if (namespace === 'ctype') {
      return byteNames.filter((name) => /^is[a-z]/.test(name) || name === 'tolower' || name === 'toupper')
    }

    if (namespace === 'string') {
      return byteNames.filter((name) => !/^is[a-z]/.test(name) && name !== 'tolower' && name !== 'toupper')
    }

    return []
  })
}

export function discoverPerlUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverNamespacesFromScope('perl', async (namespace, sourceRef) => {
    const html = await fetchText(sourceRef)

    if (namespace === 'core') {
      return extractMatches(html, /href="\/(?:5\.\d+\.\d+\/)?functions\/([^"]+)"/g, normalizePerlFunctionName)
    }

    if (namespace === 'POSIX') {
      return extractMatches(html, /<dt id="([A-Za-z_][A-Za-z0-9_:]*)"/g, normalizePerlFunctionName)
    }

    if (namespace === 'Math::Trig') {
      return extractMatches(html, /<dt id="([A-Za-z_][A-Za-z0-9_:]*)"/g, normalizePerlFunctionName)
    }

    if (namespace === 'Math::Complex') {
      return uniqueSorted(
        extractMatches(
          html,
          /\b(Re|Im|abs|acos|asin|atan2|cplx|cos|exp|log|pi|rho|sin|sqrt|tan|theta)\b/g,
          normalizePerlFunctionName,
        ),
      )
    }

    if (namespace === 'Unicode::Normalize') {
      return extractMatches(
        html,
        /<code>\$?[A-Za-z0-9_,\s()=-]*?([A-Za-z_][A-Za-z0-9_]*)\(/g,
        normalizePerlFunctionName,
      )
    }

    if (namespace === 'Encode') {
      return extractMatches(html, /<h3 id="([A-Za-z_][A-Za-z0-9_]*)"/g, normalizePerlFunctionName)
    }

    if (namespace === 'Text::ParseWords') {
      return uniqueSorted(
        extractMatches(
          html,
          /\b(nested_quotewords|old_parse_line|old_shellwords|parse_line|quotewords|shellwords)\b/g,
          normalizePerlFunctionName,
        ),
      )
    }

    if (namespace === 'Text::Tabs' || namespace === 'File::Basename') {
      return extractMatches(html, /<dt id="([^"]+)"/g, normalizePerlFunctionName)
    }

    return extractMatches(html, /<h2 id="([A-Za-z_][A-Za-z0-9_:]*)"/g, normalizePerlFunctionName)
  })
}

export function discoverRustUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverNamespacesFromScope('rust', async (_namespace, sourceRef) => {
    const html = await fetchText(sourceRef)
    if (sourceRef.includes('/primitive.') || sourceRef.includes('/enum.')) {
      return extractMatches(html, /href="#method\.([^"]+)"/g, normalizeRustName)
    }
    return extractMatches(html, /<a class="fn" href="[^"]+" title="fn [^"]+">([\s\S]*?)<\/a>/g, normalizeRustName)
  })
}

export function discoverKotlinUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverNamespacesFromScope('kotlin', async (_namespace, sourceRef) => {
    const html = await fetchText(sourceRef)
    return extractMatches(html, /class="token function">([^<]+)</g, normalizeKotlinName)
  })
}

export function discoverHaskellUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverNamespacesFromScope('haskell', async (_namespace, sourceRef) => {
    const html = await fetchText(sourceRef)
    return extractMatches(html, /id="v:([^"]+)"/g, normalizeHaskellName)
  })
}

function toAppleJsonUrl(sourceRef: string): string {
  const url = new URL(sourceRef)
  const path = url.pathname.replace(/^\/documentation\//, '')
  return `https://developer.apple.com/tutorials/data/documentation/${path}.json`
}

interface AppleDocReference {
  identifier?: string
  kind?: string
  title?: string
  url?: string
}

interface AppleDocJson {
  references?: Record<string, AppleDocReference>
}

export function discoverSwiftUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverNamespacesFromScope('swift', async (namespace, sourceRef) => {
    const json = await fetchJson<AppleDocJson>(toAppleJsonUrl(sourceRef))
    const refs = json.references ?? {}
    const identifierPrefix =
      namespace === 'UnicodeScalar'
        ? 'doc://com.apple.Swift/documentation/Swift/Unicode/Scalar/'
        : `doc://com.apple.Swift/documentation/Swift/${namespace}/`

    return uniqueSorted(
      Object.entries(refs)
        .filter(([identifier, ref]) => identifier.startsWith(identifierPrefix) && ref.kind === 'symbol')
        .map(([, ref]) => normalizeSwiftMemberTitle(ref.title ?? ''))
        .filter((value): value is string => !!value),
    )
  })
}

function powerShellTypeSlugFromSourceRef(sourceRef: string): string {
  const pathname = new URL(sourceRef).pathname
  const slug = pathname.split('/').filter(Boolean).pop()
  if (!slug) {
    throw new Error(`Unable to derive PowerShell type slug from ${sourceRef}`)
  }
  return slug.toLowerCase()
}

export function discoverPowerShellUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverNamespacesFromScope('powershell', async (_namespace, sourceRef) => {
    const url = sourceRef.includes('?') ? sourceRef : `${sourceRef}?view=net-9.0`
    const html = await fetchText(url)
    const slug = powerShellTypeSlugFromSourceRef(sourceRef)
    const escaped = slug.replace(/\./g, '\\.')
    return extractMatches(
      html,
      new RegExp(`<a class="xref" href="${escaped}\\.[^"]+?"[^>]*>([\\s\\S]*?)<\\/a>`, 'g'),
      normalizePowerShellMemberName,
    )
  })
}

export interface InventoryOnlyDiscovererConfig {
  language: string
  discover: () => Promise<UpstreamSurfaceSnapshot> | UpstreamSurfaceSnapshot
  discoverNamespaceCatalog?: () =>
    | Promise<DiscoveredUpstreamSurfaceNamespaceCatalog>
    | DiscoveredUpstreamSurfaceNamespaceCatalog
}

export function buildInventoryOnlyUpstreamSurface(config: InventoryOnlyDiscovererConfig) {
  return {
    discover: config.discover,
    discoverMode: 'live' as const,
    discoverUsesDocker: false,
    discoverNamespaceCatalog: config.discoverNamespaceCatalog ?? (() => catalogFromScope(config.language)),
    getLocutusEntry: (func: { category: string; name: string }) => ({
      namespace: func.category,
      name: func.name,
    }),
  }
}
