function echo ( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: echo is bad
    // +   improved by: Nate
    // +    revised by: Der Simon (http://innerdom.sourceforge.net/)
    // +   improved by: Brett Zamir
    // %        note 1: There are a few unsolved issues with this function. Summarizing:
    // %        note 1: converts all the special characters (e.g. tags) to HTML entities, 
    // %        note 1: thus reducing the usability of HTML formatting in echo().
    // %        note 1: 
    // %        note 1: InnerHTML() is better because it works (and it's fast),   
    // %        note 1: but using innerHTML on the BODY is very dangerous because
    // %        note 1: you will break all references to HTMLElements that were done before
    // %        note 1: 
    // %        note 1: There's no good place for a package like http://innerdom.sourceforge.net/
    // %        note 1: inside php.js
    // %        note 1:
    // *     example 1: echo('Hello', 'World');
    // *     returns 1: null
    
    var arg = '', argc = arguments.length, argv = arguments, i = 0;

    var stringToDOM = function (q){
        var d=document;
        function r(a){
            return a.replace(/\r/g,' ').replace(/\n/g,' ');
        }
        function s(a){
            return a.replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"');
        }
        function t(a){
            return a.replace(/ /g,'');
        }
        function u(a){
            var b,c,e,f,g,h,i;
            b=d.createDocumentFragment();
            c=a.indexOf(' ');
            if(c===-1){
                b.appendChild(d.createElement(a.toLowerCase()))
            }
            else{
                i=t(a.substring(0,c)).toLowerCase();
                a=a.substr(c+1);
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
                        b.lastChild.setAttribute(f,h)
                    }else{
                        break
                    }
                }
            }
            return b
        }
        function v(a,b,c){
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
                e=e.substr(f)
            }
            return b.length-e.length
        }
        function w(a){
            var b,c,e,f,g,h,i,j,k,l,m,n,o,p,q;
            b=d.createDocumentFragment();
            while(a&&a.length){
                c=a.indexOf('<');
                if(c===-1){
                    a=s(a);
                    b.appendChild(d.createTextNode(a));
                    a=null
                }
                else if(c){
                    q=s(a.substring(0,c));
                    b.appendChild(d.createTextNode(q));
                    a=a.substr(c)
                }
                else{
                    e=a.indexOf('<!--');
                    if(!e){
                        f=a.indexOf('-->');
                        g=a.substring(4,f);
                        g=s(g);
                        b.appendChild(d.createComment(g));
                        a=a.substr(f+3)
                    }
                    else{
                        h=a.indexOf('>');
                        if(a.substring(h-1,h)==='/'){
                            i=a.indexOf('/>');
                            j=a.substring(1,i);
                            b.appendChild(u(j));
                            a=a.substr(i+2)
                        }
                        else{
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
                                a=a.substr(p)
                            }
                            a=a.substr(a.indexOf('>')+1);
                            m.lastChild.appendChild(w(n));
                            b.appendChild(m)
                        }
                    }
                }
            }
            return b
        }
        return w(q)
    }

    for (i = 0; i < argc; i++ ) {
        arg = argv[i];
        if (document.createDocumentFragment && document.createTextNode && document.appendChild) {
            stringToDOM(arg);
        } else if (document.write) {
            document.write(arg);
        } else {
            print(arg);
        }
    }
    
    return null;
}