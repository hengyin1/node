const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');

require('@babel/register')({
  presets: ['@babel/preset-react']
});
const ReactDOMServer  = require('react-dom/server');

app.use(mount('/static', static(__dirname + '/source/static/')));

app.use(
  async (ctx) => {
    
  }
);

app.listen(3000);