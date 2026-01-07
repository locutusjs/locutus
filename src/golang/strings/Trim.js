module.exports = function Trim(s, cutset) {
  //      discuss at: https://locutus.io/golang/strings/Trim
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Unlike Go's strings.Trim which removes characters in cutset,
  //          note 1: this implementation removes exact matches of cutset from both ends
  //       example 1: Trim('!!!Hello, Gophers!!!', '!')
  //       returns 1: 'Hello, Gophers'
  //       example 2: Trim('  Hello  ', ' ')
  //       returns 2: 'Hello'

  s = s + ''
  cutset = cutset + ''

  // Build regex to match cutset characters at start and end
  const escaped = cutset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp('^[' + escaped + ']+|[' + escaped + ']+$', 'g')
  return s.replace(regex, '')
}
