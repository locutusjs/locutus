function quotemeta(str) {
  //  discuss at: http://phpjs.org/functions/quotemeta/
  // original by: Paulo Freitas
  //   example 1: quotemeta(". + * ? ^ ( $ )");
  //   returns 1: '\\. \\+ \\* \\? \\^ \\( \\$ \\)'

  return (str + '')
    .replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
}