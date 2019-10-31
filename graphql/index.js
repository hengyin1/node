const koa = require('koa');
const query = require('./server');
const graphqlHTTP = require('koa-graphql');

const app = new koa();

app.use(
  async (ctx) => {
    const result = await query(ctx.query.hello);
    ctx.body = result;
  }
)

// query('{ hello}').then((response) => {
//   console.log(response);
// });

app.listen(3000);