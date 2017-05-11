/**
 * replace using regular expression
 * @param {Array.<string>|string=} pattern        - string or an array of strings (regular expressions, optional with i,g,.. regex flags).
 * @param {Array.<string>|string=} replacement    - an array of strings.
 * @param {string}                 subject        - string to do replacements on.
 * @param {number=}                limit          - * PHP - TODO:implement it
 * @param {number=}                count          - * PHP - TODO:implement it
 * @return {string}                               - the original strings, have applied with all replacements.
 */
preg_replace = function (pattern, replacement, subject, limit, count) {
  // original by: Elad Karako (http://icompile.eladkarako.com)
  // example 1: preg_replace([/a/g,/o/gi],['@','#'],'some where Over the rainbow')
  // returns 1: "s#me where #ver the r@inb#w"

  //From PHP defaults TODO:implement it
  limit = ("undefined" === typeof limit) ? (-1) : limit;
  count = ("undefined" === typeof count) ? null : count;

  //variable fixing
  subject = ("string" === typeof subject) ? subject : "";

  //variable averaging (for algorithm)
  pattern = ("string" === typeof pattern) ? [pattern] : pattern; //represent as an array
  replacement = ("string" === typeof replacement) ? [replacement] : replacement; //represent as an array


  pattern.forEach(function (element, index) {
    subject = subject.replace(element, replacement[index % replacement.length]);
  });

  return subject;
}
