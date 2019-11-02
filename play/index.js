const koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const { schema, rootValue } = require('./schema');

const app = new koa();

app.use(
  //// 给koa-graphql传一个graphql的协议文件，就会自动帮你生成graphql-api
  mount('/api', graphqlHTTP({
    schema: schema,
    rootValue: rootValue
  }))
);

app.listen(3000);