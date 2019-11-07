const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');

require('@babel/register')({
  presets: ['@babel/preset-react']
});
const ReactDOMServer  = require('react-dom/server');

const App = require('./app,jsx');

app.use(mount('/static', static(__dirname + '/source/static/')));
const template = require('./template')(__dirname + '/index.htm');

app.use(
  async (ctx) => {
    const filtType = +(ctx.query.filt || 0);
    const sortType = +(ctx.query.sort || 0);
    const reactData = await getData(sortType, filtType);
    ctx.status = 200;
    ctx.body = ReactDOMServer.renderToString(App(reactData));
  }
);

app.listen(3000);