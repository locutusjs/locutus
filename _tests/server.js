var http = require('http');
var send = require('send');
var port = process.env.PORT || 8080;

http.createServer(function(req, res) {
  if (req.url === '/') {
    res.writeHead(301, {'Location': '/_tests/index.html'});
    res.end();
    return;
  }

  send(req, req.url)
    .root(__dirname+'/../')
    .pipe(res);
}).listen(port);

console.log('Test demo running at http://localhost:' + port + '/');
