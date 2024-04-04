module.exports = function array_column(input, ColumnKey, IndexKey = null) {
  // eslint-disable-line camelcase
  //   discuss at: https://locutus.io/php/array_column/
  //   original by: Enzo Dañobeytía
  //   example 1: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], 'name')
  //   returns 1: {0: "Alex", 1: "Elvis", 2: "Michael"}
  //   example 2: array_column({0: {name: 'Alex', value: 1}, 1: {name: 'Elvis', value: 2}, 2: {name: 'Michael', value: 3}}, 'name')
  //   returns 2: {0: "Alex", 1: "Elvis", 2: "Michael"}
  //   example 3: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], 'name', 'value')
  //   returns 3: {1: "Alex", 2: "Elvis", 3: "Michael"}
  //   example 4: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], null, 'value')
  //   returns 4: {1: {name: 'Alex', value: 1}, 2: {name: 'Elvis', value: 2}, 3: {name: 'Michael', value: 3}}

  if (input !== null && (typeof input === 'object' || Array.isArray(input))) {
    const newarray = []
    if (typeof input === 'object') {
      const temparray = []
      for (const key of Object.keys(input)) {
        temparray.push(input[key])
      }
      input = temparray
    }
    if (Array.isArray(input)) {
      for (const key of input.keys()) {
        if (IndexKey && input[key][IndexKey]) {
          if (ColumnKey) {
            newarray[input[key][IndexKey]] = input[key][ColumnKey]
          } else {
            newarray[input[key][IndexKey]] = input[key]
          }
        } else {
          if (ColumnKey) {
            newarray.push(input[key][ColumnKey])
          } else {
            newarray.push(input[key])
          }
        }
      }
    }
    return Object.assign({}, newarray)
  }
}
