const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const getData = require('./get-data');
const ReactDOMServer  = require('react-dom/server');
require('babel-register')({
  presets: ['react']
});

const App = require('./app.jsx');
const template = require('./template')(__dirname + '/index.html');

const app = new koa();

app.use(mount('/static', static(__dirname + '/source'))); 

app.use(
  mount('/data', async (ctx) => {
    ctx.status = 200;
    const filtType = +(ctx.query.filt || 0);
    const sortType = +(ctx.query.sort || 0);
    const reactData = await getData(sortType, filtType);
    ctx.body = reactData;
  })
)

app.use(
  async (ctx) => {
    ctx.status = 200;
    const filtType = +(ctx.query.filt || 0);
    const sortType = +(ctx.query.sort || 0);
    const reactData = await getData(sortType, filtType);
   
    ctx.body = template({
      reactString: ReactDOMServer.renderToString(App(reactData)),
      reactData,
      filtType,
      sortType
    })
  }
);

module.exports = app;
// app.listen(3000);