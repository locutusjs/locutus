function timezone_location_get (tzo) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var tzo = timezone_open('Europe/Prague');
    // *     example 1: timezone_location_get(tzo);
    // *     returns 1: {country_code : 'CZ', latitude : 50.08333, longitude : 14.43333, comments : ''}

    return tzo.getLocation();
}
