module.exports = function array_column (array, columnName) { // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_column/
  // original by: Enzo Dañobeytía
  //   example 1: array_column({{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michel', value: 3}}, 'name')
  //   returns 1: ['Alex', 'Elvis', 'Michael']
  
	if (array !== null) {
		if (Array.isArray(array)) {
			return array.map(function(value,index) {
				return value[columnName];
			})
		} else if (typeof array === 'object') {
			var newarray = [];
			for (var key in array) {
				newarray.push(array[key][columnName]);
			}
			return newarray;
		}
	}
}
