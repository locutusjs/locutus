function date_format (obj, format) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: date() (and an object passed in which was created by the DateTime class--e.g., date_create)
    // Note: finished but basically useless until date_create() is implemented
    return this.date(format, obj.getTimestamp());
}
