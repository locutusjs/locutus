function date_create (time, timezone) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: DateTime
    // *     example 1: var tzo = timezone_open('Asia/Hong_Kong');
    // *     example 1: date_create('now', tzo);
    // *     returns 1: {}

    return new this.DateTime(time, timezone);
}
