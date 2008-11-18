function filesize (url) {
    // http://kevin.vanzonneveld.net
    // +   original by: Enrique Gonzalez
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes. 
    // *     example 1: filesize('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '3'

    var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) throw new Error('XMLHttpRequest not supported');
    
    req.open ('HEAD', url, false);
    req.send (null);
    
    if (!req.getResponseHeader || !req.getResponseHeader('Content-Length')) {
        return false;
    } else {
        return req.getResponseHeader('Content-Length'); 
    }
}