const fs = require('fs');
const Koa = require('Koa');
const mount = require('koa-mount');

const game = require('./game.js');
let playerWon = 0;
let playerLastAction = null;
let sameCount = 0;

const app = new Koa();

app.use(
  mount('/favicon.ico', function (ctx) {
    ctx.status = 200;
    return;
  })
);

const gameKoa = new Koa();

gameKoa.use(
  async function (ctx, next) {
    if (playerWon >= 3 || sameCount == 9) {
      ctx.status = 500;
      ctx.body = '我再也不和你玩了';
      return;
    }

    await next();

    if (ctx.playerWon) {
      playerWon++;
    }
  }
)

gameKoa.use(
  async function (ctx, next) {
    const query = ctx.query;
    const playerAction = query.action;

    if (playerLastAction && playerLastAction == playerAction) {
      sameCount++;
      if (sameCount >= 3) {
        ctx.status = 400;
        ctx.body = '你作弊';
        sameCount = 9;
        return;
      }
    } else {
      sameCount = 0;
    }

    playerLastAction = playerAction;
    ctx.playerAction = playerAction;
    await next();
  }
)

gameKoa.use(
  async function (ctx, next) {
    const gameResult = game(ctx.playerAction);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        ctx.status = 200;
        if (gameResult === 0) {
          ctx.body = '平局了';
        } else if (gameResult === 1) {
          ctx.body = '你赢了！';
          ctx.playerWon = true;
        } else {
          ctx.body = '你输了！';
        }
        resolve();
      }, 500);
    })
  }
)

app.use(
  mount('/game', gameKoa)
);

app.use(
  mount('/', function (ctx) {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
  })
);

app.listen(3000);