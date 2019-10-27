const EasySock = require('easy_sock');

const easySock = new EasySock({
  ip: '127.0.0.1',
  port: 400,
  timeout: 500,
  keepAlive: true
})

