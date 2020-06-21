const Koa = require('Koa');
const mount = require('koa-mount');
const sslify = require('koa-sslify').default;
const https = require('https');
const fs = require('fs');

const request = require('./request.js');
const miniprogramConfig = require('./config/config.js');

const app = new Koa();

app.use(sslify());

app.use(
  mount('/favicon.ico', function (ctx) {
    ctx.status = 200;
    return;
  })
);

app.use(
  mount('/login', async function (ctx) {
    const query = ctx.query;
    console.log('query', query);
    const js_code = query.js_code;
    const chunk = await request(`https://api.weixin.qq.com/sns/jscode2session?appid=${miniprogramConfig.appid}&secret=${miniprogramConfig.secret}&js_code=${js_code}&grant_type=authorization_code`);
    ctx.status = 200;
    ctx.body = chunk;
  })
);

app.use(
  mount('/token', async function (ctx) {
    const chunk = await request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${miniprogramConfig.appid}&secret=${miniprogramConfig.secret}`);
    ctx.status = 200;
    ctx.body = chunk;
  })
);

const options = {
  key: fs.readFileSync('./ssl/private_key.pem'),
  cert: fs.readFileSync('./ssl/ca-cert.pem')
};
https.createServer(options, app.callback()).listen(8081);

// app.listen(3000, () => {
//   console.log('listening 3000 port');
// });