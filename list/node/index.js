const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const getData = require('./get-data');
const ReactDOMServer  = require('react-dom/server');
require('@babel/register')({
  presets: ['@babel/preset-react']
});

const template = require('./template')(__dirname + '/index.html');
const App = require('./app.jsx');

const app = new koa();

app.use(mount('/static', static(__dirname + '/source/static/'))); 

app.use(
  async (ctx) => {
    ctx.status = 200;
    const filtType = +(ctx.query.filt || 0);
    const sortType = +(ctx.query.sort || 0);
    const reactData = await getData(sortType, filtType);
    ctx.body = template({
      reactString: ReactDOMServer.renderToString(App(reactData))
    })
  }
);

app.listen(3000);