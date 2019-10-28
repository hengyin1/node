const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');
const app = new koa();

app.use(mount('/static',  static(__dirname + '/source/')));

app.use(
  mount('/', (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8');
  })
);

app.listen(3000);