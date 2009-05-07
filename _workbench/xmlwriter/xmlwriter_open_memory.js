function xmlwriter_open_memory () {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// *     example 1: xmlwriter_open_memory();
	// *     returns 1: true

    function XMLWriter () {

    }
    XMLWriter.prototype = {
        constructor:XMLWriter,

        endAttribute : function () {

            return true;
        },
        endCData : function () {

            return true;
        },
        endComment : function () {

            return true;
        },
        endDocument : function () {

            return true;
        },
        endDTDAttlist : function () {
    
            return true;
        },
        endDTDElement : function () {

            return true;
        },
        endDTDEntity : function () {

            return true;
        },
        endDTD : function () {

            return true;
        },
        endElement : function () {
            
            return true;
        },
        endPI : function () {

            return true;
        },
        flush : function (empty) {
            var buffer = this.buffer;
            echo(buffer);
            if (empty) {
                this.buffer = '';
            }
            return buffer; // gives old buffer contents?
        },
        fullEndElement : function () {

            return true;
        },
        openMemory : function () {
            return new XMLWriter(); // Should be static?
        },
        openURI : function (uri) {
            throw new Error('XMLWriter.openURI is not implemented');
        },
        outputMemory : function (flush) {
            if (flush) {
                echo(this.buffer);
                this.buffer = ''; // Todo: Should the buffer be cleared?
            }
            return this.buffer;
        },
        setIndentString : function (indentString) {
            this.indentString = indentString;
            return true;
        },
        setIndent : function (indent) {
            this.indent = indent;
            return true;
        },
        startAttributeNS : function (prefix, name, uri) {
            
            return true;
        },
        startAttribute : function (name) {

            return true;
        },
        startCData : function () {

            return true;
        },
        startComment : function () {

            return true;
        },
        startDocument : function (version, encoding, standalone) {

            return true;
        },
        startDTDAttlist : function (name) {

            return true;
        },
        startDTDElement : function (qualifiedName) {

            return true;
        },
        startDTDEntity : function (name, isparam) {

            return true;
        },
        startDTD : function (qualifiedName, publicId, systemId) {

            return true;
        },
        startElementNS : function (prefix, name, uri) {

            return true;
        },
        startElement : function (name) {

            return true;
        },
        startPI : function (target) {

            return true;
        },
        text : function (content) {

            return true;
        },
        writeAttributeNS : function (prefix, name, uri, content) {

            return true;
        },
        writeAttribute : function (name, value) {

            return true;
        },
        writeCData : function (content) {

            return true;
        },
        writeComment : function (content) {

            return true;
        },
        writeDTDAttlist : function (name, content) {

            return true;
        },
        writeDTDElement : function (name, content) {

            return true;
        },
        writeDTDEntity : function (name, content, pe, pubid, sysid, ndataid) {
            
            return true;
        },
        writeDTD : function (name, publicId, systemId, subset) {

            return true;
        },
        writeElementNS : function (prefix, name, uri, content) {

            return true;
        },
        writeElement : function (name, content) {

            return true;
        },
        writePI : function (target, content) {

            return true;
        },
        writeRaw : function (content) {
            
            return true;
        }
    };

    return new XMLWriter();
}