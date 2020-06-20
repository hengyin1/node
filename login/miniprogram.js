const Koa = require('Koa');
const mount = require('koa-mount');
const request = require('./request');

const app = new Koa();

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
    const chunk = await request(`https://api.weixin.qq.com/sns/jscode2session?appid=wx67fd121a844a87de&secret=ebf3061daaad76849da815982ded7447&js_code=${js_code}&grant_type=authorization_code`);
    ctx.status = 200;
    ctx.body = chunk;
  })
)

app.listen(3000, () => {
  console.log('listening 3000 port');
});