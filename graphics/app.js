const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url);
  if (parsedUrl.pathname == '/favicon.ico') {
    response.writeHead(200);
    response.end();
    return;
  }
  
  if (parsedUrl.pathname == '/') {
    response.writeHead(200);
    fs.createReadStream(__dirname + '/3d-camera/ogl-basic.html').pipe(response);
  }
}).listen(3000, () => {
  console.log('listening 3000');
})