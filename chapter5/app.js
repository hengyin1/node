const fs = require('fs')
module.exports = {
  '/detail': {
    data: require('./business/page.data'),
    template: fs.readFileSync(__dirname + '/template/detail.html', 'utf-8')
  },
  // '/play': () => {
  //   return '/play';
  // },
  // '/list': () => {
  //   return '/list';
  // }
}