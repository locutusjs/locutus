function exit (status) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Paul
    // +   bugfixed by: Hyam Singer (http://www.impact-computing.com/)
    // +   improved by: Philip Peterson
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Should be considered experimental. Please comment on this function.
    // *     example 1: exit();
    // *     returns 1: null

    var i, that = this,
        _addEvent = function (el, type, handler, capturing) {
            if (el.addEventListener) { /* W3C */
                el.addEventListener(type, handler, !!capturing);
            }
            else if (el.attachEvent) { /* IE */
                el.attachEvent('on'+type, handler);
            }
            else { /* OLDER BROWSERS (DOM0) */
                el['on'+type] = handler;
            }
        },
        _stopEvent = function(e) {
            if (e.stopPropagation) { /* W3C */
                e.stopPropagation();
                e.preventDefault();
            }
            else {
                that.window.event.cancelBubble = true;
                that.window.event.returnValue = false;
            }
        };

    if (typeof status === 'string') {
        alert(status);
    }

    _addEvent(this.window, 'error', function (e) {_stopEvent(e);}, false);

    var handlers = [
        'copy', 'cut', 'paste',
        'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
        'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
        'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
    ];

    for (i=0; i < handlers.length; i++) {
        _addEvent(this.window, handlers[i], function (e) {_stopEvent(e);}, true);
    }

    if (this.window.stop) {
        this.window.stop();
    }

    throw '';
}
