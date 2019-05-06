module.exports = function array_column (input, column_key, index_key = null) { // eslint-disable-line camelcase
  //   discuss at: http://locutus.io/php/array_column/
  //   original by: Enzo Dañobeytía
  //   example 1: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], 'name')
  //   returns 1: ['Alex', 'Elvis', 'Michael']
  //   example 2: array_column({0: {name: 'Alex', value: 1}, 1: {name: 'Elvis', value: 2}, 2: {name: 'Michael', value: 3}}, 'name')
  //   returns 2: ['Alex', 'Elvis', 'Michael']
  //   example 3: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], 'name', 'value')
  //   returns 3: [empty, 1: 'Alex', 2: 'Elvis', 3: 'Michael']
  //   example 4: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], null, 'value')
  //   returns 4: [empty, 1: {name: 'Alex', value: 1}, 2: {name: 'Elvis', value: 2}, 3: {name: 'Michael', value: 3}]

	if (input !== null && (typeof input === 'object' || Array.isArray(input))) {
		var newarray = [];

		if (typeof input === 'object') {
		    let temparray = [];
			for (let key of Object.keys(input)) {
				temparray.push(input[key]);
		    }
		    input = temparray;
		}

		if (Array.isArray(input)) {
		    for (let key of input.keys()) {
				if (index_key && input[key][index_key]) {
			   	 	if (column_key) {
						newarray[input[key][index_key]] = input[key][column_key];
					} else {
						newarray[input[key][index_key]] = input[key];
					}

				} else {
			   		if (column_key) {
						newarray.push(input[key][column_key]);
			   		} else {
						newarray.push(input[key]);
			    	}
				}
		    }
		}

		return newarray;
	}
}
