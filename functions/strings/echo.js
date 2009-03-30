function echo ( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: echo is bad
    // +   improved by: Nate
    // +    revised by: Der Simon (http://innerdom.sourceforge.net/)
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // %        note 1: The function still has issues with outputting certain kinds of XML, such as
    // %        note 1: attributes defined with apostrophes, or creating namespaced XML, etc.
    // %        note 1: We might solve this by building on http://code.google.com/p/jssaxparser
    // %        note 1: and using that, but it would be even larger; if browsers start to support
    // %        note 1: DOM Level 3 Load and Save (parsing/serializing), we wouldn't need any
    // %        note 1: such long code (even most of the code below).
    // %        note 2: InnerHTML() is better because it works (and it's fast),
    // %        note 2: but using innerHTML on the BODY is very dangerous because
    // %        note 2: you will break all references to HTMLElements that were done before
    // *     example 1: echo('Hello', 'World');
    // *     returns 1: undefined
    
    var arg = '', argc = arguments.length, argv = arguments, i = 0;

    var stringToDOM = function (q){
        var d = document;
        var r = function(a){
            return a.replace(/\r/g,' ').replace(/\n/g,' ');
        };
        var s = function(a){
            return a.replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"');
        };
        var t = function(a){
            return a.replace(/ /g,'');
        };
        var u = function(a){
            var b,c,e,f,g,h,i;
            b=d.createDocumentFragment();
            c=a.indexOf(' ');
            if (c === -1) {
                b.appendChild(d.createElement(a.toLowerCase()));
            } else {
                i = t(a.substring(0,c)).toLowerCase();
                a = a.substr(c+1);
                b.appendChild(d.createElement(i));
                while(a.length){
                    e=a.indexOf('=');
                    if(e>=0){
                        f=t(a.substring(0,e)).toLowerCase();
                        g=a.indexOf('"');
                        a=a.substr(g+1);
                        g=a.indexOf('"');
                        h=s(a.substring(0,g));
                        a=a.substr(g+2);
                        b.lastChild.setAttribute(f,h);
                    }else{
                        break
                    }
                }
            }
            return b;
        }
        var v = function(a,b,c){
            var e,f;
            e=b;
            c=c.toLowerCase();
            f=e.indexOf('</'+c+'>');
            a=a.concat(e.substring(0,f));
            e=e.substr(f);
            while(a.indexOf('<'+c)!=-1){
                a=a.substr(a.indexOf('<'+c));
                a=a.substr(a.indexOf('>')+1);
                e=e.substr(e.indexOf('>')+1);
                f=e.indexOf('</'+c+'>');
                a=a.concat(e.substring(0,f));
                e=e.substr(f);
            }
            return b.length-e.length;
        };
        var w = function(a){
            var b,c,e,f,g,h,i,j,k,l,m,n,o,p,q;
            b=d.createDocumentFragment();
            while(a&&a.length){
                c=a.indexOf('<');
                if(c===-1){
                    a=s(a);
                    b.appendChild(d.createTextNode(a));
                    a=null;
                } else if(c){
                    q=s(a.substring(0,c));
                    b.appendChild(d.createTextNode(q));
                    a=a.substr(c);
                } else{
                    e=a.indexOf('<!--');
                    if(!e){
                        f=a.indexOf('-->');
                        g=a.substring(4,f);
                        g=s(g);
                        b.appendChild(d.createComment(g));
                        a=a.substr(f+3);
                    } else{
                        h=a.indexOf('>');
                        if(a.substring(h-1,h)==='/'){
                            i=a.indexOf('/>');
                            j=a.substring(1,i);
                            b.appendChild(u(j));
                            a=a.substr(i+2);
                        } else{
                            k=a.indexOf('>');
                            l=a.substring(1,k);
                            m=d.createDocumentFragment();
                            m.appendChild(u(l));
                            a=a.substr(k+1);
                            n=a.substring(0,a.indexOf('</'));
                            a=a.substr(a.indexOf('</'));
                            if(n.indexOf('<')!=-1){
                                o=m.lastChild.nodeName;
                                p=v(n,a,o);
                                n=n.concat(a.substring(0,p));
                                a=a.substr(p);
                            }
                            a=a.substr(a.indexOf('>')+1);
                            m.lastChild.appendChild(w(n));
                            b.appendChild(m);
                        }
                    }
                }
            }
            return b;
        };
        return w(q);
    }

    for (i = 0; i < argc; i++ ) {
        arg = argv[i];
        if (document.createDocumentFragment && document.createTextNode && document.appendChild) {
            if (document.body) {
                document.body.appendChild(stringToDOM(arg));
            } else {
                document.documentElement.appendChild(stringToDOM(arg));
            }
        } else if (document.write) {
            document.write(arg);
        } else {
            print(arg);
        }
    }
}