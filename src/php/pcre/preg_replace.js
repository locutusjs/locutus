module.exports = function preg_replace(pattern, replacement, string) {
  // eslint-disable-line camelcase
  //   original by: rony2k6 (https://github.com/rony2k6)
  //   example 1: preg_replace('/xmas/i', 'Christmas', 'It was the night before Xmas.')
  //   returns 1: "It was the night before Christmas."
  //   example 2: preg_replace('/xmas/ig', 'Christmas', 'xMas: It was the night before Xmas.')
  //   returns 2: "Christmas: It was the night before Christmas."
  //   example 3: preg_replace('\/(\\w+) (\\d+), (\\d+)\/i', '$11,$3', 'April 15, 2003')
  //   returns 3: "April1,2003"
  //   example 4: preg_replace('/[^a-zA-Z0-9]+/', '', 'The Development of code . http://www.')
  //   returns 4: "TheDevelopmentofcodehttpwww"
  //   example 5: preg_replace('/[^A-Za-z0-9_\\s]/', '', 'D"usseldorfer H"auptstrasse')
  //   returns 5: "Dusseldorfer Hauptstrasse"
  let _flag = pattern.substr(pattern.lastIndexOf(pattern[0]) + 1)
  _flag = _flag !== '' ? _flag : 'g'
  const _pattern = pattern.substr(1, pattern.lastIndexOf(pattern[0]) - 1)
  const regex = new RegExp(_pattern, _flag)
  const result = string.replace(regex, replacement)

  return result
}
