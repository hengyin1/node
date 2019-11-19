const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');
const app = new koa();

app.use(mount('/static',  static(__dirname + '/source/')));

const buffer = fs.readFileSync(__dirname + '/source/index.html');
app.use(
  mount('/', (ctx) => {
    ctx.status = 200;
    ctx.type = 'html';
    ctx.body = buffer;
  })
);

module.exports = app;
// app.listen(3000);