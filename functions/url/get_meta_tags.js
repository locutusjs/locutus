function get_meta_tags(url, format) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Ricardo F. Santos
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
    // -    depends on: file_get_contents
    // *     example 1: get_meta_tags('http://kevin.vanzonneveld.net/pj_test_supportfile_2.htm');
    // *     returns 1: {description: 'a php manual', author: 'name', keywords: 'php documentation', 'geo_position': '49.33;-86.59'}

    var fulltxt = '';

    if (true) {
        // Use this for testing instead of the line above:
        fulltxt = '<meta name="author" content="name">'+
        '<meta name="keywords" content="php documentation">'+
        '<meta name="DESCRIPTION" content="a php manual">'+
        '<meta name="geo.position" content="49.33;-86.59">'+
        '</head>';
    } else {
        fulltxt = file_get_contents(file).match(/^[^]*<\/head>/i);
    }
    
    var patt = /<meta[^>]*?>/gim;
    var patt1 = /<meta\s+.*?name\s*=\s*(['"]?)(.*?)\1\s+.*?content\s*=\s*(['"]?)(.*?)\3/gim;
    var patt2 = /<meta\s+.*?content\s*=\s*(['"?])(.*?)\1\s+.*?name\s*=\s*(['"]?)(.*?)\3/gim;
    var txt, match, name, arr={};

    while ((txt = patt.exec(fulltxt)) != null) {
        while ((match = patt1.exec(txt)) != null) {
            name = match[2].replace(/\W/g, '_').toLowerCase();
            arr[name] = match[4];
        }
        while ((match = patt2.exec(txt)) != null) {
            name = match[4].replace(/\W/g, '_').toLowerCase();
            arr[name] = match[2];
        }
    }
    return arr;
}
