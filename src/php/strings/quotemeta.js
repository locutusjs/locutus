module.exports = function quotemeta(str) {
  //  discuss at: https://locutus.io/php/quotemeta/
  //   verified: 8.3
  // original by: Paulo Freitas
  //   example 1: quotemeta(". + * ? ^ ( $ )")
  //   returns 1: '\\. \\+ \\* \\? \\^ \\( \\$ \\)'

  return (str + '').replace(/([.\\+*?[^\]$()])/g, '\\$1')
}
