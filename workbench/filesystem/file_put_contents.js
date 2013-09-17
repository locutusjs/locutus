function file_put_contents (aFile, data, flags, context) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Only works at present in Mozilla (and unfinished too); might also allow context to determine
    // %          note 1: whether for Mozilla, for HTTP PUT or POST requests, etc.
    // *     example 1: file_put_contents('file://Users/Kevin/someFile.txt', 'hello');
    // *     returns 1: 5


    // Fix: allow file to be placed outside of profile directory; fix: add PHP-style flags, etc.
    var opts = 0, i = 0;

    // Initialize binary arguments. Both the string & integer (constant) input is
    // allowed
    var OPTS = {
        FILE_USE_INCLUDE_PATH : 1,
        LOCK_EX : 2,
        FILE_APPEND : 8,
        FILE_TEXT : 32,
        FILE_BINARY : 64
    };
    if (typeof flags === 'number') {
        opts = flags;
    }
    else { // Allow for a single string or an array of string flags
        flags = [].concat(flags);
        for (i=0; i < flags.length; i++) {
            if (OPTS[flags[i]]) {
                opts = opts | OPTS[flags[i]];
            } else {

            }
        }
    }
    var append = opts & OPTS.FILE_APPEND;


    var charset = 'UTF-8'; // Can be any character encoding name that Mozilla supports
    // Setting earlier, but even with a different setting, it still seems to save as UTF-8

//        var em = Cc['@mozilla.org/extensions/manager;1'].
//                 getService(Ci.nsIExtensionManager);
//          the path may use forward slash ('/') as the delimiter
//        var file = em.getInstallLocation(MY_ID).getItemFile(MY_ID, 'content/'+filename);

var file;
if ((/^file:\/\//).test(aFile)) {
    // absolute file URL
    var ios = Components.classes["@mozilla.org/network/io-service;1"].
                        getService(Components.interfaces.nsIIOService);
    var URL = ios.newURI(aFile, null, null);
    file = URL.QueryInterface(Components.interfaces.nsIFileURL).file; // becomes nsIFile
}
else {
    //native

    file = Components.classes["@mozilla.org/file/local;1"].
                 createInstance(Components.interfaces.nsILocalFile);
    file.initWithPath(aFile); // e.g., "/home"
}
/**
//tmp
var file = Components.classes["@mozilla.org/file/directory_service;1"].
             getService(Components.interfaces.nsIProperties).
             get("TmpD", Components.interfaces.nsIFile);
file.append("suggestedName.tmp");
file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 438); // 0666
//
var file = Components.classes["@mozilla.org/file/directory_service;1"].
             getService(Components.interfaces.nsIProperties).
             get("ProfD", Components.interfaces.nsIFile);
//*/


    if (typeof file === 'string') {
        var tempfilename = file;
        file = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties).get('ProfD', Ci.nsILocalFile);
        file.append(tempfilename);
    }

    if( !file.exists() ) {   // if it doesn't exist, create  // || !file.isDirectory()
        file.create(Ci.nsIFile.NORMAL_FILE_TYPE, 511); // DIRECTORY_TYPE (0777)
    }
    else if (!append) {
        file.remove(false); // I needed to do this to avoid some apparent race condition (the effect of junk getting added to the end)
        file.create(Ci.nsIFile.NORMAL_FILE_TYPE, 511); // DIRECTORY_TYPE (0777)
    }
    // file.createUnique(Ci.nsIFile.NORMAL_FILE_TYPE, 436); // for temporary (0664)

    var foStream = Cc['@mozilla.org/network/file-output-stream;1'].createInstance(Ci.nsIFileOutputStream);
    var fileFlags = append ? (0x02 | 0x10) : 0x02; // use 0x02 | 0x10 to open file for appending.
    foStream.init(file, fileFlags, 436, 0); // 436 is 0664
    // foStream.init(file, 0x02 | 0x08 | 0x20, 436, 0); // write, create, truncate (436 is 0664)

    var os = Cc['@mozilla.org/intl/converter-output-stream;1'].createInstance(Ci.nsIConverterOutputStream);
    // This assumes that foStream is the nsIOutputStream you want to write to
    // 0x0000 instead of '?' will produce an exception: http://www.xulplanet.com/references/xpcomref/ifaces/nsIConverterOutputStream.html
    // If charset in xsl:output is ISO-8859-1, the file won't open--if it is GB2312, it will output as UTF-8--seems buggy or?
    os.init(foStream, charset, 0, 0x0000);
    os.writeString(data);
    os.close();
    foStream.close();
    // todo: return number of bytes written or false on failure
}
