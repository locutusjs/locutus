import { runInDocker } from './docker.ts'
import type { DiscoveredUpstreamSurfaceNamespaceCatalog, UpstreamSurfaceSnapshot } from './types.ts'
import { buildDiscoveredUpstreamSurfaceSnapshot, uniqueSorted } from './upstream-surface-discovery.ts'

const textCache = new Map<string, Promise<string>>()
const FETCH_RETRY_DELAYS_MS = [250, 750, 1500]
const DISCOVERY_CONCURRENCY = 12
const FETCH_TIMEOUT_MS = 20000

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function mapWithConcurrency<T, R>(
  values: T[],
  limit: number,
  mapper: (value: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(values.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < values.length) {
      const currentIndex = nextIndex++
      const value = values[currentIndex]
      if (value === undefined) {
        continue
      }
      results[currentIndex] = await mapper(value, currentIndex)
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, () => worker()))
  return results
}

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

export async function fetchText(url: string): Promise<string> {
  if (!textCache.has(url)) {
    textCache.set(
      url,
      (async () => {
        let lastError: unknown

        for (let attempt = 0; attempt <= FETCH_RETRY_DELAYS_MS.length; attempt++) {
          const controller = new AbortController()
          const timeout = setTimeout(() => controller.abort(new Error(`Timed out fetching ${url}`)), FETCH_TIMEOUT_MS)
          try {
            const response = await fetch(url, { signal: controller.signal })
            if (!response.ok) {
              throw new Error(`Unable to fetch ${url}: ${response.status} ${response.statusText}`)
            }
            return await response.text()
          } catch (error) {
            lastError = error
            if (attempt === FETCH_RETRY_DELAYS_MS.length) {
              throw error
            }
            await sleep(FETCH_RETRY_DELAYS_MS[attempt] ?? 250)
          } finally {
            clearTimeout(timeout)
          }
        }

        throw lastError instanceof Error ? lastError : new Error(`Unable to fetch ${url}`)
      })().catch((error) => {
        textCache.delete(url)
        throw error
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
  const namespaces = await mapWithConcurrency(input.catalog.namespaces, DISCOVERY_CONCURRENCY, async (namespace) => {
    const sourceRef = input.sourceRefForNamespace(namespace)
    const entries = await input.discoverEntries(namespace, sourceRef)
    return {
      namespace,
      title: input.titleForNamespace?.(namespace),
      sourceRef,
      entries,
    }
  })

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

function extractKotlinEntryNamesFromSegments(segments: string[]): string[] {
  const entrySegments: string[] = []

  for (const segment of segments) {
    if (segment === '.' || segment === '..') {
      return []
    }

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
    }
  }

  return entrySegments
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

function normalizeSwiftEntryName(name: string): string | null {
  const cleaned = stripHtml(name).trim()
  if (!cleaned) {
    return null
  }

  const parenIndex = cleaned.indexOf('(')
  const normalized = (parenIndex >= 0 ? cleaned.slice(0, parenIndex) : cleaned).trim()
  return normalized || null
}

const AWK_CATALOG_TARGET = 'GNU AWK 5.3'
const AWK_CATALOG_SOURCE_REF = 'https://www.gnu.org/software/gawk/manual/'

const C_CATALOG_TARGET = 'C23'
const C_CATALOG_SOURCE_REF = 'https://en.cppreference.com/w/c/header'
const PERL_CATALOG_TARGET = 'Perl 5.40'
const PERL_DOCKER_IMAGE = 'perl:5.40'
const PERL_CATALOG_SOURCE_REF = 'perl:5.40:core-runtime-modules'
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
const POWERSHELL_CATALOG_TARGET = 'PowerShell 7.4'
const POWERSHELL_CATALOG_SOURCE_REF = 'https://learn.microsoft.com/dotnet/api/'
const POWERSHELL_TYPE_NAMESPACES = [
  {
    namespace: 'string',
    title: 'System.String instance methods',
    typeName: 'System.String',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.string',
  },
  {
    namespace: 'math',
    title: 'System.Math static methods',
    typeName: 'System.Math',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.math',
  },
  {
    namespace: 'char',
    title: 'System.Char static methods',
    typeName: 'System.Char',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.char',
  },
  {
    namespace: 'convert',
    title: 'System.Convert static methods',
    typeName: 'System.Convert',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.convert',
  },
  {
    namespace: 'array',
    title: 'System.Array static methods',
    typeName: 'System.Array',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.array',
  },
  {
    namespace: 'datetime',
    title: 'System.DateTime static and instance methods',
    typeName: 'System.DateTime',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.datetime',
  },
  {
    namespace: 'uri',
    title: 'System.Uri static and instance methods',
    typeName: 'System.Uri',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.uri',
  },
  {
    namespace: 'guid',
    title: 'System.Guid static and instance methods',
    typeName: 'System.Guid',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.guid',
  },
  {
    namespace: 'version',
    title: 'System.Version static and instance methods',
    typeName: 'System.Version',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.version',
  },
  {
    namespace: 'timespan',
    title: 'System.TimeSpan static and instance methods',
    typeName: 'System.TimeSpan',
    sourceRef: 'https://learn.microsoft.com/dotnet/api/system.timespan',
  },
] as const

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
  if (namespace === 'math') {
    return extractMatches(html, /title="c\/numeric\/math\/([a-z_0-9]+)"/g, normalizeCFunctionName)
  }

  const synopsisMatch = html.match(
    /<span class="mw-headline" id="Synopsis">Synopsis<\/span><\/h3>([\s\S]*?)(?:<!--|<h[23])/,
  )
  if (!synopsisMatch?.[1]) {
    return []
  }

  const synopsis = decodeHtmlEntities(synopsisMatch[1]).replace(/<[^>]+>/g, '')
  return uniqueSorted(
    [...synopsis.matchAll(/\b([A-Za-z_][A-Za-z0-9_]*)\s*\([^;]*?\)\s*;/gs)]
      .map((match) => match[1] ?? '')
      .filter((name): name is string => !!normalizeCFunctionName(name)),
  )
}

function discoverPerlRuntimeModuleCatalog(): {
  target: string
  sourceKind: 'runtime'
  sourceRef: string
  namespaces: string[]
} {
  const script = `
use Config;
use File::Find;
use JSON::PP;

my @roots = sort { length($b) <=> length($a) } grep { defined($_) && -d $_ } ($Config{privlibexp}, $Config{archlibexp});
my %modules = (core => 1);

find(
  {
    wanted => sub {
      return unless -f $_ && /\\.(?:pm|pod)\\z/;
      my $path = $File::Find::name;
      for my $root (@roots) {
        next unless index($path, "$root/") == 0;
        my $relative = substr($path, length($root) + 1);
        my $module = $relative;
        $module =~ s{/}{::}g;
        $module =~ s{\\\\}{::}g;
        $module =~ s/\\.(?:pm|pod)\\z//;
        return if !$module || $module eq 'CORE';
        $modules{$module} = 1;
        last;
      }
    },
    no_chdir => 1,
  },
  @roots,
);

print encode_json([sort keys %modules]);
`.trim()
  const result = runInDocker(PERL_DOCKER_IMAGE, ['perl', '-e', script], {
    timeout: 120000,
    maxBuffer: 32 * 1024 * 1024,
  })

  if (!result.success) {
    throw new Error(result.error || 'Unable to discover Perl core runtime modules')
  }

  const parsed = JSON.parse(result.output) as unknown
  if (!Array.isArray(parsed)) {
    throw new Error('Perl runtime namespace catalog output was not an array')
  }

  return {
    target: PERL_CATALOG_TARGET,
    sourceKind: 'runtime',
    sourceRef: PERL_CATALOG_SOURCE_REF,
    namespaces: parsed.filter((entry): entry is string => typeof entry === 'string').sort(),
  }
}

export function discoverPerlUpstreamNamespaceCatalog(): Promise<DiscoveredUpstreamSurfaceNamespaceCatalog> {
  return Promise.resolve(discoverPerlRuntimeModuleCatalog())
}

function perlNamespaceSourceRef(namespace: string): string {
  return `${PERL_DOCKER_IMAGE}:${namespace}`
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
    "HASKELL_GHC_PKG=$(find /opt/ghc -path '*/bin/ghc-pkg' 2>/dev/null | sort | head -n1); test -n \"$HASKELL_GHC_PKG\"; \"$HASKELL_GHC_PKG\" field base exposed-modules | sed '1s/^exposed-modules: //' | tr ',' '\\n' | sed 's/^ *//' | sed '/^$/d' | sort",
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
      `HASKELL_GHCI=$(find /opt/ghc -path '*/bin/ghci' 2>/dev/null | sort | head -n1); test -n "$HASKELL_GHCI"; cat <<'__LOCUTUS_GHCI__' | "$HASKELL_GHCI" -ignore-dot-ghci 2>/dev/null\n${ghciScript}\n__LOCUTUS_GHCI__`,
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
  return {
    target: POWERSHELL_CATALOG_TARGET,
    sourceKind: 'source_manifest',
    sourceRef: POWERSHELL_CATALOG_SOURCE_REF,
    namespaces: POWERSHELL_TYPE_NAMESPACES.map((namespace) => namespace.namespace),
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
  const catalog = discoverPerlRuntimeModuleCatalog()
  const beginMarker = '__LOCUTUS_PERL_JSON_BEGIN__'
  const endMarker = '__LOCUTUS_PERL_JSON_END__'
  const script = `
use JSON::PP;
use Pod::Functions;

my @modules = @{decode_json($ARGV[0])};
my @namespaces;

my @core_entries = sort grep {
  $_ !~ /^__/
    && $_ !~ m{/}
    && $_ ne 'import'
    && $_ ne 'unimport'
} keys %Pod::Functions::Type;

push @namespaces, {
  namespace => 'core',
  entries => \\@core_entries,
};

for my $module (@modules) {
  next if $module eq 'core';

  my %entries;
  my $loaded;
  {
    local $SIG{__WARN__} = sub { };
    local *STDOUT;
    local *STDERR;
    open STDOUT, '>', \\my $stdout;
    open STDERR, '>', \\my $stderr;
    $loaded = eval "require $module; 1";
  }
  if ($loaded) {
    no strict 'refs';
    my $stash = \\%{"\${module}::"};
    for my $name (keys %{$stash}) {
      next if $name =~ /^_/;
      next if $name =~ /::$/;
      next unless defined &{"\${module}::\${name}"};
      $entries{$name} = 1;
    }
  }

  push @namespaces, {
    namespace => $module,
    entries => [sort keys %entries],
  };
}

print "${beginMarker}\\n";
print encode_json({
  language => 'perl',
  namespaces => \\@namespaces,
});
print "\\n${endMarker}\\n";
`.trim()
  const result = runInDocker(PERL_DOCKER_IMAGE, ['perl', '-e', script, JSON.stringify(catalog.namespaces)], {
    timeout: 120000,
    maxBuffer: 64 * 1024 * 1024,
  })

  if (!result.success) {
    throw new Error(result.error || 'Unable to discover Perl upstream surface')
  }

  const beginIndex = result.output.indexOf(`${beginMarker}\n`)
  const endIndex = result.output.lastIndexOf(`\n${endMarker}`)
  if (beginIndex < 0 || endIndex < 0 || endIndex <= beginIndex) {
    throw new Error('Perl upstream surface output did not contain a marked JSON payload')
  }

  const json = result.output.slice(beginIndex + beginMarker.length + 1, endIndex)
  const parsed = JSON.parse(json) as {
    language: string
    namespaces: Array<{ namespace: string; entries: string[] }>
  }

  return Promise.resolve(
    buildDiscoveredUpstreamSurfaceSnapshot({
      language: 'perl',
      catalog,
      namespaces: parsed.namespaces.map((namespace) => ({
        namespace: namespace.namespace,
        title: namespace.namespace,
        sourceRef: perlNamespaceSourceRef(namespace.namespace),
        entries: namespace.entries,
      })),
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
    const namespaces = new Map<string, { entries: Set<string>; packagePath: string }>()
    const catalogBaseUrl = new URL(KOTLIN_CATALOG_SOURCE_REF)
    const catalogPathPrefix = '/api/core/kotlin-stdlib/'

    for (const href of extractMatches(html, /href="([^"]+)"/g, (value) => stripHtml(value).trim() || null)) {
      let url: URL
      try {
        url = new URL(href, KOTLIN_CATALOG_SOURCE_REF)
      } catch {
        continue
      }

      if (url.origin !== catalogBaseUrl.origin || !url.pathname.startsWith(catalogPathPrefix)) {
        continue
      }

      const relativePath = url.pathname.slice(catalogPathPrefix.length)
      if (!relativePath.endsWith('.html')) {
        continue
      }

      const segments = relativePath.split('/').filter(Boolean)
      if (!segments.length) {
        continue
      }

      const packageSegments: string[] = []
      let isInvalidPath = false

      for (const segment of segments) {
        if (segment === '.' || segment === '..') {
          isInvalidPath = true
          break
        }

        if (segment.endsWith('.html') || segment.startsWith('-')) {
          break
        }

        packageSegments.push(segment)
      }

      if (!packageSegments.length || isInvalidPath) {
        continue
      }

      const namespace = packageSegments.join('.')
      const packagePath = packageSegments.join('/')
      const namespaceData = namespaces.get(namespace) ?? { entries: new Set<string>(), packagePath }
      for (const entry of extractKotlinEntryNamesFromSegments(segments.slice(packageSegments.length))) {
        namespaceData.entries.add(entry)
      }
      namespaces.set(namespace, namespaceData)
    }

    return Promise.all(
      [...namespaces.entries()].map(async ([namespace, data]) => {
        const namespaceUrl = `https://kotlinlang.org/api/core/kotlin-stdlib/${data.packagePath}/`
        const namespaceHtml = await fetchText(namespaceUrl)
        const namespaceBaseUrl = new URL(namespaceUrl)
        const namespacePathPrefix = `${catalogPathPrefix}${data.packagePath}/`

        for (const href of extractMatches(
          namespaceHtml,
          /href="([^"]+)"/g,
          (value) => stripHtml(value).trim() || null,
        )) {
          let url: URL
          try {
            url = new URL(href, namespaceUrl)
          } catch {
            continue
          }

          if (url.origin !== catalogBaseUrl.origin || !url.pathname.startsWith(namespacePathPrefix)) {
            continue
          }

          const relativePath = url.pathname.slice(namespacePathPrefix.length)
          if (!relativePath || relativePath.startsWith('../')) {
            continue
          }

          for (const entry of extractKotlinEntryNamesFromSegments(relativePath.split('/').filter(Boolean))) {
            data.entries.add(entry)
          }
        }

        return {
          namespace,
          title: namespace,
          sourceRef: namespaceBaseUrl.toString(),
          entries: [...data.entries],
        }
      }),
    ).then((discoveredNamespaces) =>
      buildDiscoveredUpstreamSurfaceSnapshot({
        language: 'kotlin',
        catalog: {
          target: KOTLIN_CATALOG_TARGET,
          sourceKind: 'source_manifest',
          sourceRef: KOTLIN_CATALOG_SOURCE_REF,
        },
        namespaces: discoveredNamespaces,
      }),
    )
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
    { timeout: 120000, maxBuffer: 16 * 1024 * 1024, platform: 'linux/arm64' },
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
            entries: encodedEntries
              ? uniqueSorted(
                  encodedEntries
                    .split('\u001f')
                    .map((entry) => normalizeSwiftEntryName(entry))
                    .filter((entry): entry is string => !!entry),
                )
              : [],
          }
        }),
    }),
  )
}

export function discoverPowerShellUpstreamSurface(): Promise<UpstreamSurfaceSnapshot> {
  const catalog = discoverPowerShellUpstreamNamespaceCatalog()
  return Promise.all(
    POWERSHELL_TYPE_NAMESPACES.map(async (metadata) => {
      const html = await fetchText(metadata.sourceRef)
      const memberPrefix = `${metadata.typeName.toLowerCase()}.`
      const constructorPrefix = `${metadata.typeName.toLowerCase()}.-ctor`
      const memberEntries = extractMatches(html, /href="([^"]+)\?view=[^"]+"/g, (href) => {
        const normalizedHref = stripHtml(href).trim().toLowerCase()
        if (!normalizedHref.startsWith(memberPrefix)) {
          return null
        }

        const memberName = stripHtml(href)
          .trim()
          .slice(memberPrefix.length)
          .replace(/\?view=.*$/, '')
          .split('#')[0]
        const normalizedMemberName = memberName ?? ''
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(normalizedMemberName)) {
          return null
        }
        return normalizedMemberName
      })
      const constructorName = metadata.typeName.split('.').pop()
      const constructorEntries =
        constructorName && html.toLowerCase().includes(constructorPrefix) ? [constructorName] : []

      return {
        namespace: metadata.namespace,
        title: metadata.title,
        sourceKind: 'source_manifest' as const,
        sourceRef: metadata.sourceRef,
        entries: uniqueSorted([...memberEntries, ...constructorEntries].filter((entry): entry is string => !!entry)),
      }
    }),
  ).then((namespaces) =>
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
  getLocutusEntry?: (func: { category: string; name: string }) => { namespace: string; name: string } | null
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
          target: snapshot.catalog?.target ?? firstNamespace.target,
          sourceKind: snapshot.catalog?.sourceKind ?? firstNamespace.sourceKind,
          sourceRef: snapshot.catalog?.sourceRef ?? firstNamespace.sourceRef,
          namespaces: snapshot.namespaces.map((namespace) => namespace.namespace).sort((a, b) => a.localeCompare(b)),
        }
      }),
    getLocutusEntry:
      config.getLocutusEntry ??
      ((func: { category: string; name: string }) => ({
        namespace: func.category,
        name: func.name,
      })),
  }
}
