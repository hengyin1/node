const mount = require('koa-mount');
const requestFactory = require('../server/request-factory.js');
requestFactory.registerProtocol('geek-rpc', require('../server/requestors/geek-rpc'));
requestFactory.registerProtocol('http', require('../server/requestors/http'));

module.exports = function (app) {
  const koa = new(require('koa'));
  
  Object.keys(app).forEach(routePath => {
    const dataConfig = app[routePath].data;
    const requests = Object.keys(dataConfig).reduce((ret, key) => {
      ret[key] = requestFactory(dataConfig[key]);
      return ret;
    }, {});

    koa.use(
      mount(routePath, async function (ctx) {
        ctx.status = 200;
        const result = {};
        await Promise.all(Object.keys(requests).map(key => {
          return requests[key](ctx.query).then(res => {
            result[key] = res;
            return;
          });
        }));
      })
    );
  });
  
  koa.listen(3000, () => {
    console.log('listen 3000');
  });
};
