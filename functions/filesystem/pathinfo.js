function pathinfo (path, options) {
    // http://kevin.vanzonneveld.net
    // +   original by: Nate
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: Inspired by actual PHP source: php5-5.2.6/ext/standard/string.c line #1559
    // %        note 1: The way the bitwise arguments are handled allows for greater flexibility
    // %        note 1: & compatability. We might even standardize this code and use a similar approach for
    // %        note 1: other bitwise PHP functions
    // %        note 2: PHP.JS tries very hard to stay away from a core.js file with global dependencies, because we like
    // %        note 2: that you can just take a couple of functions and be on your way.
    // %        note 2: But by way we implemented this function, if you want you can still declare the PATHINFO_*
    // %        note 2: yourself, and then you can use: pathinfo('/www/index.html', PATHINFO_BASENAME | PATHINFO_EXTENSION);
    // %        note 2: which makes it fully compliant with PHP syntax.
    // -    depends on: dirname
    // -    depends on: basename
    // *     example 1: pathinfo('/www/htdocs/index.html', 1);
    // *     returns 1: '/www/htdocs'
    // *     example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');
    // *     returns 2: 'index.html'
    // *     example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');
    // *     returns 3: 'html'
    // *     example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');
    // *     returns 4: 'index'
    // *     example 5: pathinfo('/www/htdocs/index.html', 2 | 4);
    // *     returns 5: {basename: 'index.html', extension: 'html'}
    // *     example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');
    // *     returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
    // *     example 7: pathinfo('/www/htdocs/index.html');
    // *     returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}

    // Working vars
    var key = '', tmp_arr = {}, cnt = 0;
    var have_basename = false, have_extension = false, have_filename = false;
    
    // Initialize binary arguments. Both the string & integer (constant) input is
    // allowed
    var def = {
        'PATHINFO_DIRNAME': 1,
        'PATHINFO_BASENAME': 2,
        'PATHINFO_EXTENSION': 4,
        'PATHINFO_FILENAME': 8,
        'PATHINFO_ALL': 0
    };
    // PATHINFO_ALL sums up all previously defined PATHINFOs
    for (key in def) {
        def['PATHINFO_ALL'] = def['PATHINFO_ALL'] | def[key];
    }

    // Input defaulting & sanitation
    if (!path)    return false;
    if (!options) options = 'PATHINFO_ALL';

    // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
    if (def[options]) {
        options = def[options];
    }

    // Internal Functions
    var __getExt = function(path) {
        var str  = path+'';
        var dotP = str.lastIndexOf('.')+1;
        return str.substr(dotP);
    }


    // Gather path infos
    if ((options & def['PATHINFO_DIRNAME']) == def['PATHINFO_DIRNAME']) {
        tmp_arr['dirname'] = dirname(path);
    }

    if ((options & def['PATHINFO_BASENAME']) == def['PATHINFO_BASENAME']) {
        if (false === have_basename) {
            have_basename = basename(path);
        }
        tmp_arr['basename'] = have_basename;
    }

    if ((options & def['PATHINFO_EXTENSION']) == def['PATHINFO_EXTENSION']) {
        if (false === have_basename) {
            have_basename = basename(path);
        }
        if (false === have_extension) {
            have_extension = __getExt(have_basename);
        }
        tmp_arr['extension'] = have_extension;
    }
    
    if ((options & def['PATHINFO_FILENAME']) == def['PATHINFO_FILENAME']) {
        if (false === have_basename) {
            have_basename = basename(path);
        }
        if (false === have_extension) {
            have_extension = __getExt(have_basename);
        }
        if (false === have_filename) {
            have_filename  = have_basename.substr(0, (have_basename.length - have_extension.length)-1);
        }

        tmp_arr['filename'] = have_filename;
    }


    // If array contains only 1 element: return string
    cnt = 0;
    for (key in tmp_arr){
        cnt++;
    }
    if (cnt == 1) {
        return tmp_arr[key];
    }

    // Return full-blown array
    return tmp_arr;
}