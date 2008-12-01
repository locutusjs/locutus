function chunk_split(body, chunklen, end) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Ricardo F. Santos
    // *     example 1: chunk_split('Hello world!', 1, '*');
    // *     returns 1: 'H*e*l*l*o* *w*o*r*l*d*!'
    // *     example 2: chunk_split('Hello world!', 10, '*');
    // *     returns 2: 'Hello worl*d!'
    
    if (chunklen < 1) {
        return false;
    }

    var result = '', chunklen = chunklen || 76, end = end || '\r\n';

    while (body.length > chunklen) {
        result += body.substring(0, chunklen) + end;
        body = body.substring(chunklen);
    }

    return result + body + end;
}