function classkit_import (file) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // -    depends on: file_get_contents
    // %        note 1: does not return an associative array as in PHP
    // *     example 1: classkit_import('http://example.com/somefile.js');
    // *     returns 1: undefined
    
	eval(file_get_contents(file));
}