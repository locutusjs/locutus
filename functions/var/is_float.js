function is_float (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: is_float(186.31);
  // *     returns 1: true

  return +mixed_var === mixed_var && (!isFinite(mixed_var) || !!(mixed_var % 1));
}
