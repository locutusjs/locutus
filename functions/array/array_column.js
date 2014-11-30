/**
 * Return the values from a single column in the input array
 * 
 * array_column() returns the values from a single column of the array,
 * identified by the column_key. Optionally, you may provide an index_key
 * to index the values in the returned array by the values from the
 * index_key column in the input array. 
 * 
 * @param {Array} inputArray A multi-dimensional array (record set) from which to pull a column of values.
 * @param {String|Number} columnId The column of values to return. This value may be the integer key of the column you wish to retrieve, or it may be the string key name for an associative array. It may also be NULL to return complete arrays (useful together with index_key to reindex the array).
 * @param {String|Number} indexId The column to use as the index/keys for the returned array. This value may be the integer key of the column, or it may be the string key name.
 * @returns {Array} Returns an array of values representing a single column from the input array.
 */
function array_column(inputArray, columnId, indexId) {
    // discuss at: http://phpjs.org/functions/array_column/
    // original by: Milan Lesichkov (http://lesichkov.co.uk/)
    // example 1: array_column([{'ID':3},{'ID':2},{'ID':1}], 'ID');
    // returns 1: [3,2,1]
    // example 2: array_column([{'ID':3,'Name':'Dom'},{'ID':2,'Name':'Tom'},{'ID':1,'Name':'Peter'}], 'ID', 'Name');
    // returns 2: {'Dom':3,'Tom':2,'Peter':1}

    /* Sanitize input array */
    if (inputArray instanceof Array === false) {
        return [];
    }

    /* Sanitize columnId */
    if (typeof columnId !== 'string' && typeof columnId !== 'number') {
        return [];
    }

    var useIndexId = typeof indexId === 'undefined' ? false : true;

    /* Sanitize indexId */
    if (useIndexId === true && typeof indexId !== 'string' && typeof indexId !== 'number') {
        return [];
    }

    var values = [];

    for (var i = 0; i < inputArray.length; i++) {
        /* Does column exists? */
        if (typeof inputArray[i][columnId] === 'undefined') {
            continue;
        }

        if (useIndexId === true) {
            /* Does index exists? */
            if (typeof inputArray[i][columnId] === 'undefined') {
                continue;
            }

            var index = inputArray[i][indexId];
            var value = inputArray[i][columnId];
            values[index] = value;
        } else {
            values[values.length] = inputArray[i][columnId];
        }
    }

    return values;
}