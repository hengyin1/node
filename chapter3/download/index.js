const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');
const app = new koa();

app.use(mount('/static',  static(__dirname + '/source/')));

const str =fs.readFileSync(__dirname + '/source/index.html', 'utf-8');
app.use(
  mount('/', (ctx) => {
    ctx.body = str;
  })
);

module.exports = app;
// app.listen(3000);