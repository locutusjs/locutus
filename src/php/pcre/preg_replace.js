module.exports = function preg_replace (pattern, replacement, string, limit) { // eslint-disable-line camelcase
  //   original by: rony2k6 (https://github.com/rony2k6)
  //   example 1: preg_replace("\/(\\w+) (\\d+), (\\d+)\/i", "${1}1,$3", "April 15, 2003")
  //   returns 1: April1,2003
  if (limit === undefined) {
    limit = -1
  }
  var _flag = pattern.substr(pattern.lastIndexOf(pattern[0]) + 1)
  var _pattern = pattern.substr(1, pattern.lastIndexOf(pattern[0]) - 1)
  var regex = new RegExp(_pattern, _flag)
  var resArray = []
  var x = 0
  var y = 0
  var result = string

  if (limit === -1) {
    var tmp = []
    while (_flag.indexOf('g') !== -1) {
      tmp = regex.exec(string)
      if (tmp !== null) {
        resArray.push(tmp)
      }
    }
  } else {
    resArray.push(regex.exec(string))
  }

  for (x = (resArray.length - 1); x > -1; x--) { // explore match
    tmp = replacement
    for (y = (resArray[x].length - 1); y > -1; y--) {
      tmp = tmp.replace('${' + y + '}', resArray[x][y])
      .replace('$' + y, resArray[x][y])
      .replace('\\' + y, resArray[x][y])
    }
    result = result.replace(resArray[x][0], tmp)
  }
  return result
}
