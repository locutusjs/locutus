function xmlwriter_open_memory () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: xmlwriter_open_memory();
    // *     returns 1: true

    var that = this;

    // Note: see echo for the type of Sax2 or the like which we want to be able to parse from strings

   // Create unique resource id
    if (!this.php_js.resourceIdCounter) {
        this.php_js.resourceIdCounter = 0;
    }
    this.php_js.resourceIdCounter++;


    function PHPJS_Resource (type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
        // See http://php.net/manual/en/resource.php for types
        this.type = type;
        this.id = id;
        this.opener = opener;
    }
    PHPJS_Resource.prototype = {
        constructor:PHPJS_Resource,
        // Our own API for Resources
        toString : function () {
            return 'Resource id #'+this.id;
        },
        get_resource_type : function () {
            return this.type;
        },
        var_dump : function () {
            return 'resource('+this.id+') of type ('+this.type+')';
        }
    };

    function XMLWriter () { // Might be used independently as well, as PHP allows

    }
    XMLWriter.prototype = new PHPJS_Resource('xmlwriter', this.php_js.resourceIdCounter, 'xmlwriter_open_memory'); // is the first argument the right resource type for XMLWriter?

    // XMLWriter.prototype.constructor = XMLWriter; // we may need to keep the constructor as PHPJS_Resource for type checking elsewhere; can use type property instead

    XMLWriter.prototype.endAttribute = function () {

        return true;
    };
    XMLWriter.prototype.endCData = function () {

        return true;
    };
    XMLWriter.prototype.endComment = function () {

        return true;
    };
    XMLWriter.prototype.endDocument = function () {

        return true;
    };
    XMLWriter.prototype.endDTDAttlist = function () {

        return true;
    };
    XMLWriter.prototype.endDTDElement = function () {

        return true;
    };
    XMLWriter.prototype.endDTDEntity = function () {

        return true;
    };
    XMLWriter.prototype.endDTD = function () {

        return true;
    };
    XMLWriter.prototype.endElement = function () {

        return true;
    };
    XMLWriter.prototype.endPI = function () {

        return true;
    };
    XMLWriter.prototype.flush = function (empty) {
        var buffer = this.buffer;
        that.echo(buffer);
        if (empty) {
            this.buffer = '';
        }
        return buffer; // gives old buffer contents?
    };
    XMLWriter.prototype.fullEndElement = function () {

        return true;
    };
    XMLWriter.prototype.openMemory = function () {
        return new XMLWriter(); // Should be static?
    };
    XMLWriter.prototype.openURI = function (uri) {
        throw new Error('XMLWriter.openURI is not implemented');
    };
    XMLWriter.prototype.outputMemory = function (flush) {
        if (flush) {
            that.echo(this.buffer);
            this.buffer = ''; // Todo: Should the buffer be cleared?
        }
        return this.buffer;
    };
    XMLWriter.prototype.setIndentString = function (indentString) {
        this.indentString = indentString;
        return true;
    };
    XMLWriter.prototype.setIndent = function (indent) {
        this.indent = indent;
        return true;
    };
    XMLWriter.prototype.startAttributeNS = function (prefix, name, uri) {

        return true;
    };
    XMLWriter.prototype.startAttribute = function (name) {

        return true;
    };
    XMLWriter.prototype.startCData = function () {

        return true;
    };
    XMLWriter.prototype.startComment = function () {

        return true;
    };
    XMLWriter.prototype.startDocument = function (version, encoding, standalone) {

        return true;
    };
    XMLWriter.prototype.startDTDAttlist = function (name) {

        return true;
    };
    XMLWriter.prototype.startDTDElement = function (qualifiedName) {

        return true;
    };
    XMLWriter.prototype.startDTDEntity = function (name, isparam) {

        return true;
    };
    XMLWriter.prototype.startDTD = function (qualifiedName, publicId, systemId) {

        return true;
    };
    XMLWriter.prototype.startElementNS = function (prefix, name, uri) {

        return true;
    };
    XMLWriter.prototype.startElement = function (name) {

        return true;
    };
    XMLWriter.prototype.startPI = function (target) {

        return true;
    };
    XMLWriter.prototype.text = function (content) {

        return true;
    };
    XMLWriter.prototype.writeAttributeNS = function (prefix, name, uri, content) {

        return true;
    };
    XMLWriter.prototype.writeAttribute = function (name, value) {

        return true;
    };
    XMLWriter.prototype.writeCData = function (content) {

        return true;
    };
    XMLWriter.prototype.writeComment = function (content) {

        return true;
    };
    XMLWriter.prototype.writeDTDAttlist = function (name, content) {

        return true;
    };
    XMLWriter.prototype.writeDTDElement = function (name, content) {

        return true;
    };
    XMLWriter.prototype.writeDTDEntity = function (name, content, pe, pubid, sysid, ndataid) {

        return true;
    };
    XMLWriter.prototype.writeDTD = function (name, publicId, systemId, subset) {

        return true;
    };
    XMLWriter.prototype.writeElementNS = function (prefix, name, uri, content) {

        return true;
    };
    XMLWriter.prototype.writeElement = function (name, content) {

        return true;
    };
    XMLWriter.prototype.writePI = function (target, content) {

        return true;
    };
    XMLWriter.prototype.writeRaw = function (content) {

        return true;
    };

    var xmlwriter = new XMLWriter();

    return xmlwriter;
}
