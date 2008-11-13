function file_exists (url) {
    // http://kevin.vanzonneveld.net
    // +   original by: Enrique González
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Mainly here for study purposes. 
    // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    var req = null;
    try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {  
       try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {  
           try { req = new XMLHttpRequest(); } catch(e) {}  
       }  
    }
    if (req == null) throw new Error('XMLHttpRequest not supported');
    req.open ('HEAD',url,false);
    req.send (null);
    return req.getResponseHeader('Content-Length'); 
}