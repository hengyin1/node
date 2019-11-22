const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200);
  res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
}).listen(3000, () => {
  console.log('listening 3000');
})