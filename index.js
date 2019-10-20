const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

const game = require('./game.js')
let playerWon = 0;
let playerLastAction = null;
let sameCount = 0;

http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url);
  if (parsedUrl.pathname == '/favicon.ico') {
    response.writeHead(200);
    response.end();
    return;
  }

  if (parsedUrl.pathname == '/game') {
    const query = querystring.parse(parsedUrl.query);
    const playerAction = query.action;

    if (playerWon >= 3 || sameCount == 9) {
      response.writeHead(500);
      response.end('我再也不和你玩了');
    }

    if (playerLastAction && playerLastAction == playerAction) {
      sameCount++;
    } else {
      sameCount = 0;
    }
    playerLastAction = playerAction;

    if (sameCount >= 3) {
      response.writeHead(400);
      response.end('你作弊');
      sameCount = 9;
    }

    const gameResult = game(playerAction);

    response.writeHead(200);
    if (gameResult === 0) {
      response.end('平局了');
    } else if (gameResult === 1) {
      response.end('你赢了！');
      playerWon++;
    } else {
      response.end('你输了！');
    }
  }

  if (parsedUrl.pathname == '/') {
    response.writeHead(200);
    fs.createReadStream(__dirname + '/index.html').pipe(response);
  }
}).listen(3000);