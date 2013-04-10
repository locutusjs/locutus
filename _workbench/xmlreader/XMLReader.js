function XMLReader () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var xr = new XMLReader();
    // *     returns 1: {}

    // Fix: Add and inherit from PHPJS_Resource

    function XMLReader () {
    }
    XMLReader.prototype = {
        close : function () { //  Close the XMLReader input

        },
        expand : function () { //  Returns a copy of the current node as a DOM object

        },
        getAttribute : function () { //  Get the value of a named attribute

        },
        getAttributeNo : function () { //  Get the value of an attribute by index

        },
        getAttributeNs : function () { //  Get the value of an attribute by localname and URI

        },
        getParserProperty : function () { //  Indicates if specified property has been set

        },
        isValid : function () { //  Indicates if the parsed document is valid

        },
        lookupNamespace : function () { //  Lookup namespace for a prefix

        },
        moveToAttribute : function () { //  Move cursor to a named attribute

        },
        moveToAttributeNo : function () { //  Move cursor to an attribute by index

        },
        moveToAttributeNs : function () { //  Move cursor to a named attribute

        },
        moveToElement : function () { //  Position cursor on the parent Element of current Attribute

        },
        moveToFirstAttribute : function () { //  Position cursor on the first Attribute

        },
        moveToNextAttribute : function () { //  Position cursor on the next Attribute

        },
        next : function () { //  Move cursor to next node skipping all subtrees

        },
        open : function () { //  Set the URI containing the XML to parse

        },
        read : function () { //  Move to next node in document

        },
        readInnerXML : function () { //  Retrieve XML from current node

        },
        readOuterXML : function () { //  Retrieve XML from current node, including it self

        },
        readString : function () { //  Reads the contents of the current node as an string

        },
        setParserProperty : function () { //  Set or Unset parser options

        },
        setRelaxNGSchema : function () { //  Set the filename or URI for a RelaxNG Schema

        },
        setRelaxNGSchemaSource : function () { //  Set the data containing a RelaxNG Schema

        },
        setSchema : function () { //  Validate document against XSD

        },
        XML : function () { //  Set the data containing the XML to parse

        }
    };
    return XMLReader;
}
