function readfile (filename, use_include_path, context) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// -    depends on: echo
    // *     example 1: readfile('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    var read_data = file_get_contents(filename, use_include_path, context); // bitwise-or use_include_path?
    echo(read_data);
    return read_data;
}