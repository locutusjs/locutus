function array_replace_recursive (arr) {
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_replace_recursive({'citrus' : ["orange"], 'berries' : ["blackberry", "raspberry"]}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']});
    // *     returns 1: {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}

    if (arguments.length < 2) {
        throw new Error('There should be at least 2 arguments passed to array_replace_recursive()');
    }

    // Although docs state that the arguments are passed in by reference, it seems they are not altered, but rather the copy that is returned (just guessing), so we make a copy here, instead of acting on arr itself
    var retObj = {};
    for (var prop in arr) {
        retObj[prop] = arr[prop];
    }

    for (var i = 1; i < arguments.length; i++) {
        for (var p in arguments[i]) {
            if (typeof retObj[p] === 'object' && retObj[p] !== null) {
                retObj[p] = this.array_replace_recursive(retObj[p], arguments[i][p]);
            } else {
                retObj[p] = arguments[i][p];
            }
        }
    }
    return retObj;
}
