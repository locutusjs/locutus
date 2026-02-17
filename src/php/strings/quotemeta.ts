export function quotemeta(str: string): string {
  //      discuss at: https://locutus.io/php/quotemeta/
  // parity verified: PHP 8.3
  //     original by: Paulo Freitas
  //       example 1: quotemeta(". + * ? ^ ( $ )")
  //       returns 1: '\\. \\+ \\* \\? \\^ \\( \\$ \\)'

  return (str + '').replace(/([.\\+*?[^\]$()])/g, '\\$1')
}
