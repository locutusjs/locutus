    function require (filename) {
        // http://kevin.vanzonneveld.net
        // +   original by: Michael White (http://getsprink.com)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +      input by: Brett Zamir (http://brett-zamir.me)
        // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   input by: Yen-Wei Liu
        // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
        // +   improved by: Kaiserbaldo (https://github.com/kaiserbaldo/)
        // -    depends on: file_exists
        // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
        // *     example 1: require('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
        // *     returns 1: 2


        if (file_exists(filename)) {

            try {
                var d = this.window.document;
                var isXML = d.documentElement.nodeName !== 'HTML' || !d.write; // Latter is for silly comprehensiveness
                var js = d.createElementNS && isXML ? d.createElementNS('http://www.w3.org/1999/xhtml', 'script') : d.createElement('script');
                js.setAttribute('type', 'text/javascript');
                js.setAttribute('src', filename);
                js.setAttribute('defer', 'defer');
                d.getElementsByTagNameNS && isXML ? (d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'head')[0] ? d.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'head')[0].appendChild(js) : d.documentElement.insertBefore(js, d.documentElement.firstChild) // in case of XUL
                    ) : d.getElementsByTagName('head')[0].appendChild(js);

                return true;

            } catch (e) {

                return false;
            }

        } else {

            throw new Error("Require ():" + filename +" not found");

        }



    }
