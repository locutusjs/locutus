function version_compare (version1, version2, operator) {
    // http://kevin.vanzonneveld.net
    // +      original by: Philippe Jausions (http://pear.php.net/user/jausions)
    // +      original by: Aidan Lister (http://aidanlister.com/)
    // + reimplemented by: Kankrelune (http://www.webfaktory.info/)
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // *        example 1: version_compare('8.2.5rc', '8.2.5a');
    // *        returns 1: 1
    // *        example 2: version_compare('8.2.50', '8.2.52', '<') ;
    // *        returns 2: true
    // *        example 3: version_compare('5.3.0-dev', '5.3.0') ;
    // *        returns 3: -1

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ENV = this.php_js.ENV || {};
    // END REDUNDANT

    if (!version1 || !version2) {
        throw 'version_compare() is missing a required argument';
    }
    
    var v1, v2, compare = 0, i = 0, x = 0;
    var i1, i2;

    var parseVersionString = function (v) {
        v = v.replace(/(^\s*)|(\s*$)/g, "").replace(/[-|_|+]/g,'.').replace(/([^0-9\.]+)/g,'.$1.');
        v = v.replace(/\.\.*/g,'.').toLowerCase().split('.');
        while (!v[0]) {
            v.shift();
        }
        while (!v[v.length-1]) {
            v.pop();
        }
        return v;
    };

    var versions = {
        'dev'   : -1,
        'alpha' : 1,
        'a'  : 1,
        'beta'  : 2,
        'b'  : 2,
        'rc'    : 3,
        '#'  : 4,
        'p'     : 5,
        'pl' : 5
    };

    v1 = parseVersionString(version1);
    v2 = parseVersionString(version2);
    x = (v1.length > v2.length) ? v2.length : v1.length;

    for (i = 0; i < x; i++) {
        if (v1[i] == v2[i]) {
            continue;
        }

        compare = 0;
        i1      = v1[i];
        i2      = v2[i];

        if (!isNaN(i1) && !isNaN(i2)) {
            if (parseInt(i1, 10) < parseInt(i2, 10)) {
                compare = -1;
            } else if (parseInt(i1, 10) > parseInt(i2, 10)){
                compare = 1;
            }
            break;
        }

        if (i1 == '#') {
            i1 = '';
        } else if (!isNaN(i1)) {
            i1 = '#';
        }

        if (i2 == '#') {
            i2 = '';
        } else if (!isNaN(i2)) {
            i2 = '#';
        }

        if (versions[i1] && versions[i2]) {
            if (versions[i1] < versions[i2])
                compare = -1;
            else if (versions[i1] > versions[i2])
                compare = 1;
        } else if (versions[i1]) {
            compare = 1;
        } else if (versions[i2]) {
            compare = -1;
        }
        break;
    }
    if (compare == 0 && v1.length != v2.length) {
        if (v2.length > v1.length) {
            if (versions[v2[i]]) {
                compare = (versions[v2[i]] < 4) ? 1 : -1;
            } else {
                compare = -1;
            }
        } else {
            if (versions[v1[i]]) {
                compare = (versions[v1[i]] < 4) ? -1 : 1;
            } else {
                compare = 1;
            }
        }
    }

    if (operator) {
        switch (operator.toLowerCase()) {
            case '>':
            case 'gt':
                return (compare > 0);
            case '>=':
            case 'ge':
                return (compare >= 0);
            case '<=':
            case 'le':
                return (compare <= 0);
            case '==':
            case '=':
            case 'eq':
                return (compare == 0);
            case '<>':
            case '!=':
            case 'ne':
                return (compare != 0);
            case '':
            case '<':
            case 'lt':
            default:
                return (compare < 0);
        }
    }

    return compare;
}