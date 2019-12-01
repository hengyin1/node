const koa = new(require('koa'));
const mount = require('koa-mount');
const app = require('../app');

Object.keys(app).forEach(routePath => {
  koa.use(
    mount(routePath, async function (ctx) {
      ctx.status = 200;
      ctx.body = await app[routePath](ctx.query);
    })
  );
});

koa.listen(3000, () => {
  console.log('listen 3000');
});