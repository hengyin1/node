const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url);
  console.log(parsedUrl);
  
  if (parsedUrl.pathname == '/favicon.ico') {
    response.writeHead(200);
    response.end();
    return;
  }
  
  if (parsedUrl.pathname == '/') {
    response.writeHead(200);
    fs.createReadStream(__dirname + '/normal-maps/cube/cube.html').pipe(response);
  }

  if (parsedUrl.pathname == '/dist/bundle.js') {
    response.writeHead(200);
    fs.createReadStream(__dirname + '/normal-maps/cube/dist/bundle.js').pipe(response);
  }

  if (parsedUrl.pathname == '/assets/normal_map.png') {
    response.writeHead(200);
    fs.createReadStream(__dirname + '/assets/normal_map.png').pipe(response);
  }

  if (parsedUrl.pathname == '/assets/airplane.jpg') {
    response.writeHead(200);
    fs.createReadStream(__dirname + '/assets/airplane.jpg').pipe(response);
  }

  if (parsedUrl.pathname == '/assets/airplane.json') {
    response.writeHead(200);
    fs.createReadStream(__dirname + '/assets/airplane.json').pipe(response);
  }
}).listen(3000, () => {
  console.log('listening 3000');
})