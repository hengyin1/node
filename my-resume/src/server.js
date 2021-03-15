const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { renderToString } = require('react-dom/server');

const SSR = require('../dist/main-server.js');

const port = 3000;

app.get('/', (req, res) => {
  const HTML = fs.readFileSync(path.resolve(__dirname, './search/index.html'), 'utf-8');
  res.status(200).send(HTML.replace('<!-- serchSSR -->', renderToString(SSR)));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});