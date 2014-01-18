function quotemeta(str) {
  // From: http://phpjs.org/functions
  // +   based on: Paulo Freitas
  // *     example 1: quotemeta(". + * ? ^ ( $ )");
  // *     returns 1: '\\. \\+ \\* \\? \\^ \\( \\$ \\)'
  return (str + '').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
}
