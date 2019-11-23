const http = require('http');
const fs = require('fs');

const leak = [];
http.createServer(function (req, res) {
  res.writeHead(200);

  setTimeout(() => {
    // console.log(window.location.href);
    const result = fs.readFileSync(__dirname + '/index.html', 'utf-8');

    leak.push(result);
    res.end(result);
  }, 50);
}).listen(3000, () => {
  console.log('listening 3000'); 
})