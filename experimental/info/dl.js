function dl (library) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: The phpjs.extensions_detect_files custom option requires privileges (and Mozilla at present)
    // %        note 2: It is generally advised to use the compiler instead of relying on this feature
    // -   depends on: get_extension_funcs
    // -   depends on: include
    // -   depends on: file_get_contents
    // *     example 1: dl('strings');
    // *     returns 1: true

    var basepath = '', sep = '/', funcs = [], jsext = '.js', ret = false, i = 0, j = 0, subdirs = false, skipErrors = false,
        libraries = ['array', 'bc', 'classkit', 'classobj', 'ctype', 'datetime', 'errorfunc', 'exec', 'filesystem', 'funchand',
                            'i18n', 'inclued', 'info', 'json', 'language', 'math', 'misc', 'net-gopher', 'network', 'objaggregation',
                            'outcontrol', 'overload', 'pcre', 'runkit', 'session', 'stream', 'strings', 'tokenizer', 'url', 'var', 'xml',
                            'xmlreader', 'xmlwriter'],
        indexOf = function (value) {
            for (var i = 0, length=this.length; i < length; i++) {
                if (this[i] === value) {
                    return i;
                }
            }
            return -1;
        };

    this.php_js = this.php_js || {};
    var ini = this.php_js.ini = this.php_js.ini || {};

    var that = this;
    var _fgc = function (filestr) {
        var contents = that.file_get_contents(filestr).replace(/^(function\s+(.*?)\s*\()/gm, 'that.$2 = $1'); // We set the scope to 'this', assuming main functions are at the beginning of lines
        ret = !!eval(contents);
        return ret;
    };

    var _ini_get = function (varname) {
        if (ini[varname] && ini[varname].local_value !== undefined) {
            if (ini[varname].local_value === null) {
                return '';
            }
            return ini[varname].local_value;
        }
        return '';
    };
    if (_ini_get('enable_dl') === false || _ini_get('safe_mode')) {
        return false;
    }

    this.php_js.ini['phpjs.loaded_extensions'] = this.php_js.ini['phpjs.loaded_extensions'] || {};
    this.php_js.ini['phpjs.loaded_extensions'].local_value = this.php_js.ini['phpjs.loaded_extensions'].local_value || [];
    if (!this.php_js.ini['phpjs.loaded_extensions'].local_value.indexOf) {
        this.php_js.ini['phpjs.loaded_extensions'].local_value.indexOf = indexOf;
    }
    if (this.php_js.ini['phpjs.loaded_extensions'].local_value.indexOf(library) === -1) {
        this.php_js.ini['phpjs.loaded_extensions'].local_value.push(library);
    }

    var ext_dir = _ini_get('extension_dir'); // We allow this to be an array of directories as well as a string
    ext_dir = (typeof ext_dir === 'string') ? [ext_dir] : ext_dir;
    subdirs = _ini_get('phpjs.extension_dir_subdirs');
    skipErrors = _ini_get('phpjs.dl_skip_errors');

    // This option will load all files available in the extension_dir(s) as individual files; depending on the
    //  number of directories to check and the functions in the extension (or files in the directory), this could take
    //  quite a while (e.g., with individual string functions); this option should really just be used for local
    //  experimentation (e.g., with SVN files) on smaller sets of files
    if (_ini_get('phpjs.extensions_individual_files')) {
        if (_ini_get('phpjs.extensions_detect_files')) {
            // We might not want to depend on get_extension_funcs(), since that is for all possible functions in the
            //  extension and all must be present
//            sep = navigator.platform.indexOf('Win') !== -1 ? '\\' : '/'; // Here it may be in native form // We don't use so can be file URL and used in a local script tag
            for (j=0; j < ext_dir.length; j++) {
                basepath = subdirs ? ext_dir[j]+sep+library+sep : ext_dir[j]+sep;
                // Mozilla only
/** Use this instead of the following block (and uncomment the sep assignment above) if non-fileURLs are desired (fileURLs are more portable)
                var file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
                file.initWithPath(basepath);
//*/
/**/
                var ios = Components.classes["@mozilla.org/network/io-service;1"].
                                    getService(Components.interfaces.nsIIOService);
                var URL = ios.newURI(basepath, null, null);
                var file = URL.QueryInterface(Components.interfaces.nsIFileURL).file;
//*/

                try {
                    var entries = file.directoryEntries;
                } catch (e) {
                    continue;
                }
                while(entries.hasMoreElements()) {
                    var entry = entries.getNext();
                    entry.QueryInterface(Components.interfaces.nsIFile);
                    // For consistency, we'll get a file URI to still include via script tag
                    ios = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
                    URL = ios.newFileURI(entry);
                    var filen = URL.spec.slice(URL.spec.slice(0, -1).lastIndexOf('/')+1);
                    if (filen.charAt(0) !== '.') {
                        funcs.push(URL.spec);
                    }
                }
                for (i = 0; i < funcs.length; i++) {
                    //ret = !!this.include(funcs[i]);
                    try {
                        ret = _fgc(funcs[i]);
                    } catch(e) {
                    }
                }
            }
            return ret;
        }
        else {
            funcs = this.get_extension_funcs(library);
            for (i = 0; i < funcs.length; i++) {
                ret = false;
                for (j=0; j < ext_dir.length && !ret; j++) {
                    basepath = subdirs ? ext_dir[j]+sep+library+sep : ext_dir[j]+sep;
                    //ret = !!this.include(basepath+funcs[i]+jsext);
                    try {
                        ret = _fgc(basepath+funcs[i]+jsext);
                    }
                    catch(e) {
                    }
                }
                if (!ret) {
                    if (!skipErrors) {break;} // Fail on a single individual file not being found
                }
            }
            return ret;
        }
    } else {
        if (!libraries.indexOf) {
            libraries.indexOf = indexOf;
        }
        if (libraries.indexOf(library) === -1 && !_ini_get('phpjs.dl_allow_individual_funcs')) {
            throw 'The library or file is not recognized';
        }
        // Allow some checking to see if file exists, and if not, check other ext_dir indexes
        for (i=0; i < ext_dir.length && !ret; i++) { // Stop after success
            basepath = subdirs && !_ini_get('phpjs.dl_allow_individual_funcs') ? ext_dir[i]+sep+library+sep : ext_dir[i]+sep;
            // ret = !!this.include(basepath+library+jsext);
            // We use eval() since include() as currently implemented may still be loading the file asynchonously
            try {
                if (library.slice(-3) === jsext) {
                    library = library.slice(0, -3);
                }
                ret = _fgc(basepath+library+jsext);
            } catch(e) {
                this.get_extension_funcs(); // Doesn't need to exist as we're just setting up the global below
                for (var ext in this.php_js.exts) {
                    if (!this.php_js.exts[ext].indexOf) {
                        this.php_js.exts[ext].indexOf = indexOf;
                    }
                    if (this.php_js.exts[ext].indexOf(library) !== -1) {
                        try {
                            ret = _fgc(basepath+ext+sep+library+jsext);
                            return ret;
                        }
                        catch(e) { // Even with skipErrors off, we allow it to get errors in some of the extension directories
                        }
                    }
                }
            }
        }
        if (!skipErrors) {
            return false;
        }
        return ret;
    }
}
