const cp = require('child_process');

const child_process = cp.fork(__dirname + '/child.js');

child_process.send('hello');

child_process.on('message', (str) => {
  console.log(str);
});