function ldap_bind (link_id, bind_rdn, bind_pass, successCb, errorCb) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: For CommonJS/Node (SSJS) only: Meant to work with https://github.com/joewalnes/node-ldapauth or https://github.com/jeremycx/node-LDAP, but not yet finalized
    // %        note 2: We break somewhat with the PHP API by necessity in order to allow
    // %        note 2: asynchronous callbacks, having the last two arguments being a
    // %        note 2: successful callback and an error callback respectively, with the
    // %        note 2: latter being passed the error and result and the former being
    // %        note 2: passed the result only.
    // *     example 1: var ldapconn = ldap_connect ('localhost');
    // *     example 1: var ldapbind = ldap_bind(ldapconn, 'brettz', 'dontyouwish', function success (result) {res.redirect('/res_need_login');}, function error (err, result) {res.send("auth error");});
    // *     returns 1: true

    bind_rdn= bind_rdn || null;
    bind_pass = bind_pass || null;
    if (typeof link_id !== 'object' || !link_id.get_resource_type) { // Duck type for PHPJS_Resource
        return false;
    }
    link_id.ldapauth.authenticate(link_id.hostname, link_id.port, bind_rdn, bind_pass,
        function (err, result) {
            if (err) {
                errorCb(err, result);
                return;
            }
            successCb(result);
        }
    );
    return true;
}
