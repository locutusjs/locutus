function preg_match(regex, input, result) {
	var i;
	var array = {};

	// store the result in the first indice of the array
	array[0] = regex.exec(input);

	// loop through the first indice of the array and store the values in the $result array
	for (i = 0; i < array[0].length; i++) {
		result[i] = array[0][i];
	}

    return (array[0].length ? true : false);
}
