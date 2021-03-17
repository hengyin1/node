const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { renderToString } = require('react-dom/server');

const SSR = require('../dist/main-server.js');

const port = 3000;

const tempalte = fs.readFileSync(path.resolve(__dirname, './search/index.html'), 'utf-8');
app.get('/', (req, res) => {
  const html = tempalte.replace('<!-- HTML-PLACEHOLDER -->', renderToString(SSR)).replace('<!-- GLOBAL-DATA -->', `<script>window.type=1</script>`);
  res.status(200).send(html);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});