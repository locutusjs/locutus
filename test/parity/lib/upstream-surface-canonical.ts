import { runInDocker } from './docker.ts'
import type { DiscoveredUpstreamSurfaceNamespaceCatalog, UpstreamSurfaceSnapshot } from './types.ts'
import { buildDiscoveredUpstreamSurfaceSnapshot, uniqueSorted } from './upstream-surface-discovery.ts'

const textCache = new Map<string, Promise<string>>()

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

async function discoverNamespacesFromCatalog(input: {
  language: string
  catalog: DiscoveredUpstreamSurfaceNamespaceCatalog
  sourceRefForNamespace: (namespace: string) => string
  titleForNamespace?: (namespace: string) => string | undefined
  discoverEntries: (namespace: string, sourceRef: string) => Promise<string[]>
}): Promise<UpstreamSurfaceSnapshot> {
  const namespaces = await Promise.all(
    input.catalog.namespaces.map(async (namespace) => {
      const sourceRef = input.sourceRefForNamespace(namespace)
      const entries = await input.discoverEntries(namespace, sourceRef)
      return {
        namespace,
        title: input.titleForNamespace?.(namespace),
        sourceRef,
        entries,
      }
    }),
  )

  return buildDiscoveredUpstreamSurfaceSnapshot({
    language: input.language,
    catalog: input.catalog,
    namespaces,
  })
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

function normalizeKotlinName(name: string): string | null {
  const cleaned = stripHtml(name).trim()
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(cleaned)) {
    return null
  }
  return cleaned
}

function normalizeKotlinDocIdentifier(segment: string): string | null {
  const cleaned = segment.replace(/\.html$/, '').trim()
  if (!cleaned) {
    return null
  }

  const words = cleaned.replace(/^-/, '').split('-').filter(Boolean)
  if (!words.length) {
    return null
  }

  const normalized = cleaned.startsWith('-')
    ? words.map((word) => word[0]?.toUpperCase() + word.slice(1)).join('')
    : words.map((word, index) => (index === 0 ? word : word[0]?.toUpperCase() + word.slice(1))).join('')

  return normalizeKotlinName(normalized)
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

const AWK_CATALOG_TARGET = 'GNU AWK 5.3'
const AWK_CATALOG_SOURCE_REF = 'https://www.gnu.org/software/gawk/manual/'

const C_CATALOG_TARGET = 'C23'
const C_CATALOG_SOURCE_REF = 'https://en.cppreference.com/w/c/header'
const PERL_CATALOG_TARGET = 'Perl 5.40'
const PERL_CATALOG_SOURCE_REF = 'https://perldoc.perl.org/modules'
const PERL_FUNCTIONS_SOURCE_REF = 'https://perldoc.perl.org/functions'
const RUST_CATALOG_TARGET = 'Rust 1.85'
const RUST_CATALOG_SOURCE_REF = 'https://doc.rust-lang.org/std/index.html'
const HASKELL_DOCKER_IMAGE = 'haskell:9.10'
const HASKELL_CATALOG_TARGET = 'Haskell 9.10 base'
const HASKELL_CATALOG_SOURCE_REF = 'haskell:9.10:base-exposed-modules'
const KOTLIN_CATALOG_TARGET = 'Kotlin 2.2 stdlib'
const KOTLIN_CATALOG_SOURCE_REF = 'https://kotlinlang.org/api/core/kotlin-stdlib/all-types.html'
const SWIFT_DOCKER_IMAGE = 'swift:6.0'
const SWIFT_CATALOG_TARGET = 'Swift 6.0'
const SWIFT_CATALOG_SOURCE_REF = 'swift:6.0:symbolgraph-extract'
const POWERSHELL_DOCKER_IMAGE = 'mcr.microsoft.com/powershell:7.4-ubuntu-22.04'
const POWERSHELL_CATALOG_TARGET = 'PowerShell 7.4'
const POWERSHELL_CATALOG_SOURCE_REF = 'powershell:7.4:get-command'

export function discoverAwkUpstreamNamespaceCatalog(): DiscoveredUpstreamSurfaceNamespaceCatalog {
  return {
    target: AWK_CATALOG_TARGET,
    sourceKind: 'manual',
    sourceRef: AWK_CATALOG_SOURCE_REF,
    namespaces: ['builtin'],
  }
}

export function discoverCUpstreamNamespaceCatalog(): Promise<DiscoveredUpstreamSurfaceNamespaceCatalog> {
  return fetchText(C_CATALOG_SOURCE_REF).then((html) => ({
    target: C_CATALOG_TARGET,
    sourceKind: 'source_manifest' as const,
    sourceRef: C_CATALOG_SOURCE_REF,
    namespaces: uniqueSorted(
      extractMatches(html, /title="c\/header\/([^"]+)"/g, (value) => stripHtml(value).trim() || null),
    ),
  }))
}

function cHeaderSourceRef(namespace: string): string {
  return `https://en.cppreference.com/w/c/header/${namespace}`
}

function discoverCHeaderEntries(namespace: string, html: string): string[] {
  const titlePattern = /title="c\/[^"]+\/([A-Za-z_][A-Za-z0-9_]*)"/g
  const names = extractMatches(html, titlePattern, normalizeCFunctionName)

  if (namespace === 'stdio') {
    const special = extractMatches(html, /title="c\/io\/v?fprintf"[^>]*>([\s\S]*?)<\/a>/g, (block) =>
      uniqueSorted(extractMatches(block, /<span>([^<]+)<\/span>/g, normalizeCFunctionName)).join('\n'),
    )
      .flatMap((block) => block.split('\n'))
      .filter(Boolean)
    return uniqueSorted([...names, ...special])
  }

  return names
}

export function discoverPerlUpstreamNamespaceCatalog(): Promise<DiscoveredUpstreamSurfaceNamespaceCatalog> {
  return fetchText(PERL_CATALOG_SOURCE_REF).then((html) => ({
    target: PERL_CATALOG_TARGET,
    sourceKind: 'source_manifest' as const,
    sourceRef: PERL_CATALOG_SOURCE_REF,
    namespaces: uniqueSorted([
      'core',
      ...extractMatches(html, /href="\/([A-Za-z0-9_:]+)"/g, (name) => {
        const cleaned = stripHtml(name).trim()
        if (cleaned === 'core' || cleaned.startsWith('5.') || cleaned.startsWith('perl')) {
          return null
        }
        if (!cleaned.includes('::') && !['POSIX', 'Encode'].includes(cleaned)) {
          return null
        }
        return normalizePerlFunctionName(cleaned)
      }),
    ]),
  }))
}

function perlNamespaceSourceRef(namespace: string): string {
  return namespace === 'core' ? PERL_FUNCTIONS_SOURCE_REF : `https://perldoc.perl.org/${namespace}`
}

export function discoverRustUpstreamNamespaceCatalog(): Promise<DiscoveredUpstreamSurfaceNamespaceCatalog> {
  return fetchText(RUST_CATALOG_SOURCE_REF).then((html) => {
    const modules = extractMatches(html, /href="([a-z0-9_/.-]+\/index\.html)"/g, (path) => {
      const cleaned = path.replace(/^\.\.\//, '').replace(/\/index\.html$/, '')
      if (!cleaned || cleaned === 'std' || cleaned.includes('../')) {
        return null
      }
      return `module:${cleaned}`
    })
    const primitives = extractMatches(html, /href="(primitive\.[A-Za-z0-9_]+\.html)"/g, (path) => {
      const match = path.match(/^primitive\.([A-Za-z0-9_]+)\.html$/)
      return match?.[1] ? `primitive:${match[1]}` : null
    })
    const types = extractMatches(
      html,
      /href="([a-z0-9_/.-]+\/(?:enum|struct|trait)\.[A-Za-z0-9_]+\.html)"/g,
      (path) => {
        const match = path.match(/^([a-z0-9_/.-]+)\/((?:enum|struct|trait)\.[A-Za-z0-9_]+)\.html$/)
        if (!match?.[1] || !match[2]) {
          return null
        }
        return `${match[2].replace('.', ':')}:${match[1]}`
      },
    )
    return {
      target: RUST_CATALOG_TARGET,
      sourceKind: 'source_manifest' as const,
      sourceRef: RUST_CATALOG_SOURCE_REF,
      namespaces: uniqueSorted([...modules, ...primitives, ...types]),
    }
  })
}

function rustNamespaceSourceRef(namespace: string): string {
  if (namespace.startsWith('module:')) {
    return `https://doc.rust-lang.org/std/${namespace.slice('module:'.length)}/index.html`
  }
  if (namespace.startsWith('primitive:')) {
    return `https://doc.rust-lang.org/std/primitive.${namespace.slice('primitive:'.length)}.html`
  }
  const match = namespace.match(/^(enum|struct|trait):([^:]+):(.+)$/)
  if (!match?.[1] || !match[2] || !match[3]) {
    throw new Error(`Unsupported Rust namespace ${namespace}`)
  }
  return `https://doc.rust-lang.org/std/${match[3]}/${match[1]}.${match[2]}.html`
}

function discoverHaskellUpstreamSurfaceRuntime(): UpstreamSurfaceSnapshot {
  const modulesResult = runInDocker(HASKELL_DOCKER_IMAGE, [
    'sh',
    '-lc',
    "/opt/ghc/9.10.3/bin/ghc-pkg field base exposed-modules | sed '1s/^exposed-modules: //' | tr ',' '\\n' | sed 's/^ *//' | sed '/^$/d' | sort",
  ])
  if (!modulesResult.success) {
    throw new Error(modulesResult.error || 'Unable to discover Haskell base modules')
  }

  const modules = uniqueSorted(
    modulesResult.output
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => !!line && !line.startsWith('GHC.')),
  )

  const beginMarker = '__LOCUTUS_NAMESPACE__ '
  const endMarker = '__LOCUTUS_END__'
  const ghciScript = [
    ...modules.flatMap((moduleName) => [
      `putStrLn "${beginMarker}${moduleName}"`,
      `:module + ${moduleName}`,
      `:browse! ${moduleName}`,
      `putStrLn "${endMarker}"`,
    ]),
    ':quit',
  ].join('\n')
  const result = runInDocker(
    HASKELL_DOCKER_IMAGE,
    [
      'sh',
      '-lc',
      `cat <<'__LOCUTUS_GHCI__' | /opt/ghc/9.10.3/bin/ghci -ignore-dot-ghci 2>/dev/null\n${ghciScript}\n__LOCUTUS_GHCI__`,
    ],
    { timeout: 120000, maxBuffer: 64 * 1024 * 1024 },
  )
  if (!result.success) {
    throw new Error(result.error || 'Unable to discover Haskell upstream surface')
  }

  const namespaces = new Map<string, Set<string>>()
  let currentNamespace: string | null = null
  for (const rawLine of result.output.split('\n')) {
    let line = rawLine.trim()
    if (!line || line.startsWith('GHCi,') || line.startsWith('--')) {
      continue
    }

    // ghci prefixes interactive output with prompts; strip them before looking
    // for our markers or exported names.
    line = line
      .replace(/^ghci>\s*/, '')
      .replace(/^\*?[A-Z][\w.]*>\s*/, '')
      .trim()
    if (!line) {
      continue
    }
    if (line.startsWith(beginMarker)) {
      currentNamespace = line.slice(beginMarker.length).trim()
      if (currentNamespace) {
        namespaces.set(currentNamespace, namespaces.get(currentNamespace) ?? new Set<string>())
      }
      continue
    }
    if (line === endMarker) {
      currentNamespace = null
      continue
    }
    if (!currentNamespace) {
      continue
    }

    const name = line
      .split('::')[0]
      ?.trim()
      .replace(/^type\s+/, '')
      .replace(/^data\s+/, '')
      .split(/\s+/)[0]

    if (!name || !normalizeHaskellName(name)) {
      continue
    }

    namespaces.get(currentNamespace)?.add(name)
  }

  return buildDiscoveredUpstreamSurfaceSnapshot({
    language: 'haskell',
    catalog: {
      target: HASKELL_CATALOG_TARGET,
      sourceKind: 'runtime',
      sourceRef: HASKELL_CATALOG_SOURCE_REF,
    },
    namespaces: [...namespaces.entries()].map(([namespace, entries]) => ({
      namespace,
      title: namespace,
      sourceRef: `${HASKELL_DOCKER_IMAGE}:${namespace}`,
      entries: [...entries],
    })),
  })
}

export function discoverPowerShellUpstreamNamespaceCatalog(): DiscoveredUpstreamSurfaceNamespaceCatalog {
  const script = [
    '$mods = Get-Module -ListAvailable Microsoft.PowerShell.* | Select-Object -ExpandProperty Name -Unique | Sort-Object',
    '$mods | ForEach-Object { $_ }',
  ].join('; ')
  const result = runInDocker(POWERSHELL_DOCKER_IMAGE, ['pwsh', '-NoLogo', '-NoProfile', '-Command', script], {
    platform: 'linux/amd64',
    timeout: 120000,
  })
  if (!result.success) {
    throw new Error(result.error || 'Unable to discover PowerShell modules')
  }

  return {
    target: POWERSHELL_CATALOG_TARGET,
    sourceKind: 'runtime',
    sourceRef: POWERSHELL_CATALOG_SOURCE_REF,
    namespaces: uniqueSorted(
      result.output
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    ),
  }
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
    buildDiscoveredUpstreamSurfaceSnapshot({
      language: 'awk',
      catalog: {
        target: AWK_CATALOG_TARGET,
        sourceKind: 'manual',
        sourceRef: AWK_CATALOG_SOURCE_REF,
      },
      namespaces: [
        {
          namespace: 'builtin',
          title: 'GNU AWK built-ins',
          entries: result.output
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => /^[a-z_][a-z0-9_]*$/i.test(line)),
        },
      ],
    }),
  )
}

export function discoverCUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverCUpstreamNamespaceCatalog().then((catalog) =>
    discoverNamespacesFromCatalog({
      language: 'c',
      catalog,
      sourceRefForNamespace: cHeaderSourceRef,
      titleForNamespace: (namespace) => `${namespace}.h`,
      discoverEntries: async (namespace, sourceRef) => discoverCHeaderEntries(namespace, await fetchText(sourceRef)),
    }),
  )
}

export function discoverPerlUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverPerlUpstreamNamespaceCatalog().then((catalog) =>
    discoverNamespacesFromCatalog({
      language: 'perl',
      catalog,
      sourceRefForNamespace: perlNamespaceSourceRef,
      titleForNamespace: (namespace) => namespace,
      discoverEntries: async (namespace, sourceRef) => {
        const html = await fetchText(sourceRef)

        if (namespace === 'core') {
          return extractMatches(html, /href="\/(?:5\.\d+\.\d+\/)?functions\/([^"]+)"/g, normalizePerlFunctionName)
        }

        if (namespace === 'POSIX' || namespace === 'Math::Trig') {
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
      },
    }),
  )
}

export function discoverRustUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return discoverRustUpstreamNamespaceCatalog().then((catalog) =>
    discoverNamespacesFromCatalog({
      language: 'rust',
      catalog,
      sourceRefForNamespace: rustNamespaceSourceRef,
      titleForNamespace: (namespace) =>
        namespace
          .replace(/^module:/, '')
          .replace(/^primitive:/, '')
          .replace(/^(enum|struct|trait):/, '$1 '),
      discoverEntries: async (_namespace, sourceRef) => {
        const html = await fetchText(sourceRef)
        if (sourceRef.includes('/primitive.') || sourceRef.includes('/enum.') || sourceRef.includes('/struct.')) {
          return extractMatches(html, /href="#method\.([^"]+)"/g, normalizeRustName)
        }
        return extractMatches(html, /<a class="fn" href="[^"]+" title="fn [^"]+">([\s\S]*?)<\/a>/g, normalizeRustName)
      },
    }),
  )
}

export function discoverKotlinUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return fetchText(KOTLIN_CATALOG_SOURCE_REF).then((html) => {
    const namespaces = new Map<string, Set<string>>()

    for (const href of extractMatches(html, /href="([^"]+)"/g, (value) => stripHtml(value).trim() || null)) {
      if (!href.endsWith('.html') || href.startsWith('http') || href.startsWith('/')) {
        continue
      }

      const segments = href.split('/').filter(Boolean)
      if (!segments.length) {
        continue
      }

      const packageSegments: string[] = []
      const entrySegments: string[] = []

      for (const segment of segments) {
        if (segment.endsWith('.html')) {
          const normalized = normalizeKotlinDocIdentifier(segment)
          if (normalized && segment !== 'index.html') {
            entrySegments.push(normalized)
          }
          continue
        }

        if (segment.startsWith('-')) {
          const normalized = normalizeKotlinDocIdentifier(segment)
          if (normalized) {
            entrySegments.push(normalized)
          }
          continue
        }

        packageSegments.push(segment)
      }

      if (!packageSegments.length) {
        continue
      }

      const namespace = packageSegments.join('.')
      const entries = namespaces.get(namespace) ?? new Set<string>()
      for (const entry of entrySegments) {
        entries.add(entry)
      }
      namespaces.set(namespace, entries)
    }

    return buildDiscoveredUpstreamSurfaceSnapshot({
      language: 'kotlin',
      catalog: {
        target: KOTLIN_CATALOG_TARGET,
        sourceKind: 'source_manifest',
        sourceRef: KOTLIN_CATALOG_SOURCE_REF,
      },
      namespaces: [...namespaces.entries()].map(([namespace, entries]) => ({
        namespace,
        title: namespace,
        sourceRef: `https://kotlinlang.org/api/core/kotlin-stdlib/${namespace}/`,
        entries: [...entries],
      })),
    })
  })
}

export function discoverHaskellUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  return Promise.resolve(discoverHaskellUpstreamSurfaceRuntime())
}

export function discoverSwiftUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  const result = runInDocker(
    SWIFT_DOCKER_IMAGE,
    [
      'sh',
      '-lc',
      `tmp=$(mktemp -d) && \
swift symbolgraph-extract -module-name Swift -target aarch64-unknown-linux-gnu -output-dir "$tmp" -pretty-print >/dev/null && \
cat <<'__LOCUTUS_SWIFT__' > "$tmp/reduce.swift"
import Foundation

struct SymbolGraph: Decodable {
  struct Symbol: Decodable {
    let pathComponents: [String]?
  }

  let symbols: [Symbol]
}

let input = URL(fileURLWithPath: CommandLine.arguments[1])
let data = try Data(contentsOf: input)
let graph = try JSONDecoder().decode(SymbolGraph.self, from: data)
var namespaces: [String: Set<String>] = [:]

for symbol in graph.symbols {
  let components = symbol.pathComponents ?? []
  guard !components.isEmpty else { continue }
  let namespace = components.count == 1 ? "Swift" : components[0]
  let entry = components.last ?? ""
  guard !entry.isEmpty else { continue }
  namespaces[namespace, default: []].insert(entry)
}

for namespace in namespaces.keys.sorted() {
  let entries = namespaces[namespace, default: []].sorted().joined(separator: "\\u{001F}")
  print("\\(namespace)\\t\\(entries)")
}
__LOCUTUS_SWIFT__
swift "$tmp/reduce.swift" "$tmp/Swift.symbols.json"`,
    ],
    { timeout: 120000, maxBuffer: 16 * 1024 * 1024 },
  )
  if (!result.success) {
    throw new Error(result.error || 'Unable to discover Swift upstream surface')
  }

  return Promise.resolve(
    buildDiscoveredUpstreamSurfaceSnapshot({
      language: 'swift',
      catalog: {
        target: SWIFT_CATALOG_TARGET,
        sourceKind: 'runtime',
        sourceRef: SWIFT_CATALOG_SOURCE_REF,
      },
      namespaces: result.output
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [namespace, encodedEntries = ''] = line.split('\t')
          if (!namespace) {
            throw new Error('Unable to parse Swift upstream surface row')
          }
          return {
            namespace,
            title: namespace,
            sourceRef: `${SWIFT_DOCKER_IMAGE}:${namespace}`,
            entries: encodedEntries ? encodedEntries.split('\u001f').filter(Boolean).sort() : [],
          }
        }),
    }),
  )
}

export function discoverPowerShellUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  const catalog = discoverPowerShellUpstreamNamespaceCatalog()
  const namespaces = catalog.namespaces.map((namespace) => {
    const script = [
      `$cmds = Get-Command -Module '${namespace}' | Select-Object -ExpandProperty Name -Unique | Sort-Object`,
      '$cmds | ForEach-Object { $_ }',
    ].join('; ')
    const result = runInDocker(POWERSHELL_DOCKER_IMAGE, ['pwsh', '-NoLogo', '-NoProfile', '-Command', script], {
      platform: 'linux/amd64',
      timeout: 120000,
    })
    if (!result.success) {
      throw new Error(result.error || `Unable to discover PowerShell upstream surface for ${namespace}`)
    }
    return {
      namespace,
      title: namespace,
      sourceRef: `${POWERSHELL_DOCKER_IMAGE}:${namespace}`,
      entries: result.output
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    }
  })

  return Promise.resolve(
    buildDiscoveredUpstreamSurfaceSnapshot({
      language: 'powershell',
      catalog,
      namespaces,
    }),
  )
}

export interface InventoryOnlyDiscovererConfig {
  language: string
  discover: () => Promise<UpstreamSurfaceSnapshot> | UpstreamSurfaceSnapshot
  discoverUsesDocker?: boolean
  discoverNamespaceCatalog?: () =>
    | Promise<DiscoveredUpstreamSurfaceNamespaceCatalog>
    | DiscoveredUpstreamSurfaceNamespaceCatalog
}

export function buildInventoryOnlyUpstreamSurface(config: InventoryOnlyDiscovererConfig) {
  return {
    discover: config.discover,
    discoverMode: 'live' as const,
    discoverUsesDocker: config.discoverUsesDocker ?? false,
    discoverNamespaceCatalog:
      config.discoverNamespaceCatalog ??
      (async () => {
        const snapshot = await config.discover()
        const firstNamespace = snapshot.namespaces[0]
        if (!firstNamespace) {
          throw new Error(`No upstream surface namespaces were discovered for ${config.language}.`)
        }
        return {
          target: firstNamespace.target,
          sourceKind: firstNamespace.sourceKind,
          sourceRef: firstNamespace.sourceRef,
          namespaces: snapshot.namespaces.map((namespace) => namespace.namespace).sort((a, b) => a.localeCompare(b)),
        }
      }),
    getLocutusEntry: (func: { category: string; name: string }) => ({
      namespace: func.category,
      name: func.name,
    }),
  }
}
