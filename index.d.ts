// Type definitions for locutus
// Project: https://locutus.io
// Definitions: https://github.com/locutusjs/locutus

/**
 * Locutus - All your standard libraries will be assimilated into our JavaScript collective.
 * This module provides ports of standard library functions from PHP, Go, Python, Ruby, and C.
 */

// ============================================================================
// PHP Functions
// ============================================================================

export namespace php {
  // Array functions
  namespace array {
    function array_change_key_case(arr: object, changeCase?: number): object
    function array_chunk<T>(input: T[], size: number, preserveKeys?: boolean): T[][]
    function array_column(input: object[], columnKey: string | number, indexKey?: string | number): any[]
    function array_combine(keys: any[], values: any[]): object
    function array_count_values(arr: any[]): object
    function array_diff<T>(arr1: T[], ...arrays: T[][]): T[]
    function array_fill(startIndex: number, num: number, value: any): any[]
    function array_filter<T>(arr: T[], callback?: (value: T, key?: string | number) => boolean): T[]
    function array_flip(arr: object): object
    function array_key_exists(key: string | number, arr: object): boolean
    function array_keys(input: object, searchValue?: any, strict?: boolean): (string | number)[]
    function array_map<T, U>(callback: (value: T) => U, ...arrays: T[][]): U[]
    function array_merge<T>(...arrays: T[][]): T[]
    function array_merge_recursive(arr1: object, arr2: object): object
    function array_pop<T>(arr: T[]): T | undefined
    function array_push<T>(arr: T[], ...items: T[]): number
    function array_reduce<T, U>(arr: T[], callback: (accumulator: U, value: T) => U, initial?: U): U
    function array_reverse<T>(arr: T[], preserveKeys?: boolean): T[]
    function array_search(needle: any, haystack: any[], strict?: boolean): string | number | false
    function array_shift<T>(arr: T[]): T | undefined
    function array_slice<T>(arr: T[], offset: number, length?: number, preserveKeys?: boolean): T[]
    function array_splice<T>(arr: T[], offset: number, length?: number, replacement?: T[]): T[]
    function array_sum(arr: number[]): number
    function array_unique<T>(arr: T[], sortFlags?: number): T[]
    function array_unshift<T>(arr: T[], ...items: T[]): number
    function array_values<T>(input: object): T[]
    function count(arr: any[] | object): number
    function in_array(needle: any, haystack: any[], strict?: boolean): boolean
    function sizeof(arr: any[] | object): number
    function usort<T>(arr: T[], compareFunc: (a: T, b: T) => number): boolean
  }

  // String functions
  namespace strings {
    function addslashes(str: string): string
    function bin2hex(str: string): string
    function chr(code: number): string
    function chunk_split(body: string, chunklen?: number, end?: string): string
    function explode(delimiter: string, str: string, limit?: number): string[]
    function hex2bin(hex: string): string
    function htmlentities(str: string, quoteStyle?: number, charset?: string): string
    function htmlspecialchars(str: string, quoteStyle?: number, charset?: string): string
    function htmlspecialchars_decode(str: string, quoteStyle?: number): string
    function implode(glue: string, pieces: any[]): string
    function join(glue: string, pieces: any[]): string
    function lcfirst(str: string): string
    function ltrim(str: string, charlist?: string): string
    function md5(str: string): string
    function nl2br(str: string, useXhtml?: boolean): string
    function number_format(number: number, decimals?: number, decPoint?: string, thousandsSep?: string): string
    function ord(str: string): number
    function parse_str(str: string, result?: object): void
    function printf(format: string, ...args: any[]): number
    function quoted_printable_decode(str: string): string
    function quoted_printable_encode(str: string): string
    function quotemeta(str: string): string
    function rtrim(str: string, charlist?: string): string
    function sha1(str: string): string
    function sprintf(format: string, ...args: any[]): string
    function str_pad(input: string, padLength: number, padString?: string, padType?: number): string
    function str_repeat(input: string, multiplier: number): string
    function str_replace(search: string | string[], replace: string | string[], subject: string): string
    function str_split(str: string, length?: number): string[]
    function strcasecmp(str1: string, str2: string): number
    function strcmp(str1: string, str2: string): number
    function strip_tags(str: string, allowedTags?: string): string
    function stripos(haystack: string, needle: string, offset?: number): number | false
    function stripslashes(str: string): string
    function strlen(str: string): number
    function strpos(haystack: string, needle: string, offset?: number): number | false
    function strrev(str: string): string
    function strstr(haystack: string, needle: string, beforeNeedle?: boolean): string | false
    function strtolower(str: string): string
    function strtoupper(str: string): string
    function substr(str: string, start: number, length?: number): string
    function trim(str: string, charlist?: string): string
    function ucfirst(str: string): string
    function ucwords(str: string, delimiters?: string): string
    function wordwrap(str: string, width?: number, breakChar?: string, cut?: boolean): string
  }

  // Math functions
  namespace math {
    function abs(n: number): number
    function ceil(n: number): number
    function floor(n: number): number
    function max(...values: number[]): number
    function min(...values: number[]): number
    function pow(base: number, exp: number): number
    function rand(min?: number, max?: number): number
    function round(n: number, precision?: number): number
    function sqrt(n: number): number
  }

  // JSON functions
  namespace json {
    function json_decode(str: string, assoc?: boolean): any
    function json_encode(value: any): string
  }

  // Variable functions
  namespace _var {
    function empty(value: any): boolean
    function floatval(value: any): number
    function gettype(value: any): string
    function intval(value: any, base?: number): number
    function is_array(value: any): boolean
    function is_bool(value: any): boolean
    function is_float(value: any): boolean
    function is_int(value: any): boolean
    function is_null(value: any): boolean
    function is_numeric(value: any): boolean
    function is_object(value: any): boolean
    function is_string(value: any): boolean
    function isset(...values: any[]): boolean
    function print_r(value: any, returnOutput?: boolean): string | boolean
    function serialize(value: any): string
    function unserialize(str: string): any
    function var_dump(...values: any[]): void
    function var_export(value: any, returnOutput?: boolean): string | null
  }

  // Date/Time functions
  namespace datetime {
    function checkdate(month: number, day: number, year: number): boolean
    function date(format: string, timestamp?: number): string
    function getdate(timestamp?: number): object
    function gettimeofday(returnFloat?: boolean): object | number
    function gmdate(format: string, timestamp?: number): string
    function idate(format: string, timestamp?: number): number
    function mktime(
      hour?: number,
      minute?: number,
      second?: number,
      month?: number,
      day?: number,
      year?: number,
    ): number
    function strftime(format: string, timestamp?: number): string
    function strtotime(str: string, now?: number): number | false
    function time(): number
  }

  // URL functions
  namespace url {
    function base64_decode(encodedData: string): string
    function base64_encode(data: string): string
    function http_build_query(data: object, numericPrefix?: string, argSeparator?: string): string
    function parse_url(url: string, component?: number): object | string | number | null | false
    function rawurldecode(str: string): string
    function rawurlencode(str: string): string
    function urldecode(str: string): string
    function urlencode(str: string): string
  }
}

// ============================================================================
// Go Functions
// ============================================================================

export namespace golang {
  namespace strings {
    function Contains(s: string, substr: string): boolean
    function Count(s: string, substr: string): number
    function HasPrefix(s: string, prefix: string): boolean
    function HasSuffix(s: string, suffix: string): boolean
    function Index(s: string, substr: string): number
    function Join(elems: string[], sep: string): string
    function LastIndex(s: string, substr: string): number
    function Repeat(s: string, count: number): string
    function Replace(s: string, old: string, newStr: string, n: number): string
    function Split(s: string, sep: string): string[]
    function ToLower(s: string): string
    function ToUpper(s: string): string
    function Trim(s: string, cutset: string): string
    function TrimSpace(s: string): string
  }
}

// ============================================================================
// Python Functions
// ============================================================================

export namespace python {
  namespace string {
    function ascii_letters(): string
    function ascii_lowercase(): string
    function ascii_uppercase(): string
    function capwords(str: string): string
    function digits(): string
    function hexdigits(): string
    function octdigits(): string
    function printable(): string
    function punctuation(): string
    function whitespace(): string
  }

  namespace math {
    function factorial(n: number): number
    function gcd(a: number, b: number): number
    function isfinite(x: number): boolean
    function isinf(x: number): boolean
    function isnan(x: number): boolean
    function pow(x: number, y: number): number
    function sqrt(x: number): number
  }
}

// ============================================================================
// Ruby Functions
// ============================================================================

export namespace ruby {
  namespace Math {
    function acos(arg: number): number
  }

  namespace String {
    function capitalize(str: string): string
    function chomp(str: string, separator?: string): string
    function chop(str: string): string
    function downcase(str: string): string
    function end_with(str: string, suffix: string): boolean
    function include(str: string, other: string): boolean
    function length(str: string): number
    function reverse(str: string): string
    function start_with(str: string, prefix: string): boolean
    function strip(str: string): string
    function upcase(str: string): string
  }

  namespace Array {
    function compact<T>(arr: (T | null | undefined)[]): T[]
    function first<T>(arr: T[], n?: number): T | T[]
    function flatten<T>(arr: any[], depth?: number): T[]
    function last<T>(arr: T[], n?: number): T | T[]
    function sample<T>(arr: T[], n?: number): T | T[]
    function uniq<T>(arr: T[]): T[]
  }
}

// ============================================================================
// C Functions
// ============================================================================

export namespace c {
  namespace math {
    function abs(n: number): number
    function frexp(arg: number): [number, number]
  }

  namespace stdio {
    function sprintf(format: string, ...args: any[]): string
  }

  namespace ctype {
    function isalnum(c: string): boolean
    function isalpha(c: string): boolean
    function isdigit(c: string): boolean
    function islower(c: string): boolean
    function isspace(c: string): boolean
    function isupper(c: string): boolean
    function tolower(c: string): string
    function toupper(c: string): string
  }

  namespace stdlib {
    function atof(str: string): number
    function atoi(str: string): number
  }

  namespace string {
    function strcat(dest: string, src: string): string
    function strchr(str: string, c: string): string | null
    function strcmp(str1: string, str2: string): number
    function strlen(str: string): number
    function strstr(haystack: string, needle: string): string | null
  }
}

// Default export
declare const locutus: {
  php: typeof php
  golang: typeof golang
  python: typeof python
  ruby: typeof ruby
  c: typeof c
}

export default locutus
