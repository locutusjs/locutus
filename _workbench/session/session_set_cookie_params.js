/**
    * Update the params of the cookie
    */
    function session_set_cookie_params (l, p, d, s) {
        lifetime = l;
        path = p;
        domain = d;
        secure = !!s; //make sure bool
    }
function session_set_cookie_params(lifetime, path, domain, secure) {
    
}