function octdec(oct_string) {
  // From: http://phpjs.org/functions
  // +   based on: Philippe Baumann
  // *     example 1: octdec('77');
  // *     returns 1: 63
  oct_string = (oct_string + '').replace(/[^0-7]/gi, '');
  return parseInt(oct_string, 8);
}
