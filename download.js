const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');

const app = new koa();

app.use(
  mount('/', (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8');
  })
)

app.listen(3000);