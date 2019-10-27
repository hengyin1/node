const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const rpcClient = require('./client');

const app = new koa();

app.use(mount('/static', static(__dirname + '/source/static/')));

app.use(
  mount('/', async (ctx) => {
    if (!ctx.query.columnid) {
      ctx.status = 400;
      ctx.body = 'invalid columnid';
      return;
    }

    const result = await new Promise((resolve, reject) => {
      rpcClient.write({
        columnid: ctx.query.columnid
      }, function (err, data) {
        err ? reject(err) : resolve(data)
      })
      resolve();
    })

    ctx.status = 200;
    ctx.body = '';
  })
);

app.listen(3000);
