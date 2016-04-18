module.exports = function array_column (array, column_key, index_key)  {
  // +   original by: Marcelo Camargo (https://github.com/haskellcamargo/)
  // %        note 1: Works only with associative objects, returning an empty
  // %        note 1: object in case of failure.
  // *     example 1: var drink, color, power;
  // *     example 1: array_column([{x: 1, y: 2}, {x: 7, y: 1}], 'x')
  // *     returns 1: [{0: 1, 1: 7}]
  // *     example 2: array_column([{x: 1, k: 'a'}, {x: 7, k: 'b'}], 'x')
  // *     returns 2: [{a: 1, b: 7}]

  var result = {},
      len    = array.length;

  index_key = index_key || null;

  for (var i = 0; i < len; i++) {
    if (!typeof array[i] === "object") {
      continue;
    } else if (index_key === null && array[i].hasOwnProperty(column_key)) {
      result[i] = array[i][column_key];
    } else if (array[i].hasOwnProperty(index_key)) {
      if (column_key === null) {
        result[array[i][index_key]] = array[i];
      } else if (array[i].hasOwnProperty(column_key)) {
        result[array[i][index_key]] = array[i][column_key];
      }
    }
  }
  return result;
}
