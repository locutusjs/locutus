function ldap_connect (hostname, port) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: For CommonJS/Node (SSJS) only: Meant to work with https://github.com/joewalnes/node-ldapauth or https://github.com/jeremycx/node-LDAP, but not yet finalized
    // %        note 2: Creates an LDAP link (PHPJS_Resource)
    // *     example 1: var ldapconn = ldap_connect ('localhost');
    // *     returns 1: 'Resource id #1'

    var resource;

    hostname = hostname || null;
    var portPos = hostname && hostname.indexOf(':');
    port = port || (portPos > 0 ? hostname.slice(portPos+1) : 389);

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;
    // END REDUNDANT

    // The following class represents a PHP resource type, which LDAP in PHP requires.

    // BEGIN STATIC
    function PHPJS_Resource(type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
        // See http://php.net/manual/en/resource.php for types
        this.type = type;
        this.id = id;
        this.opener = opener;
    }
    PHPJS_Resource.prototype.toString = function () {
        return 'Resource id #' + this.id;
    };
    PHPJS_Resource.prototype.get_resource_type = function () {
        return this.type;
    };
    PHPJS_Resource.prototype.var_dump = function () {
        return 'resource(' + this.id + ') of type (' + this.type + ')';
    };
    // END STATIC

    this.php_js.resourceIdCounter++;
    resource = new PHPJS_Resource('ldap link', this.php_js.resourceIdCounter, 'ldap_connect');

    // Attaching LDAP-specific properties
    resource.hostname = hostname;
    resource.port = port;
    resource.ldapauth = require("ldapauth");

    return resource;
}
