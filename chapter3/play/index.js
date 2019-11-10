const fs = require('fs');
const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const graphqlHTTP = require('koa-graphql');
const { schema, rootValue } = require('./schema');

const app = new koa();

app.use(
  mount('/static', static(__dirname + '/source/static'))
);

app.use(
  //// 给koa-graphql传一个graphql的协议文件，就会自动帮你生成graphql-api
  mount('/api', graphqlHTTP({
    schema: schema,
    rootValue: rootValue
  }))
);

app.use(
  mount('/', (ctx) => {
    ctx.status = 200;
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8');
  })
);

app.listen(3000);