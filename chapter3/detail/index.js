const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const rpcClient = require('./client');
const compileTemplate = require('./template');

const app = new koa();

const detailTemplate = compileTemplate(__dirname + '/template/index.html');

app.use(mount('/static', static(__dirname + '/source/static/')));

app.use(
  async (ctx) => {
    if (!ctx.query.columnid) {
      ctx.status = 400;
      ctx.body = 'invalid columnid';
      return;
    }

    const result = await new Promise((resolve, reject) => {
      console.log("columnid", ctx.query.columnid);
      rpcClient.write({
        columnid: ctx.query.columnid
      }, function (err, data) {
        console.log("data", data);
        
        err ? reject(err) : resolve(data)
      })
    })

    console.log("result", result);

    ctx.status = 200;
    ctx.body = detailTemplate(result);
  }
);

module.exports = app;
// app.listen(3000);
