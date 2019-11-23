 const cluster = require('cluster');

 if (cluster.isMaster) {
   cluster.fork();
  //  cluster.fork();
  //  cluster.fork();

  cluster.on('exit', () => {
    setTimeout(() => {
      cluster.fork();
    }, 5000);
  })
 } else {
   require('./app.js');

   process.on('uncaughtException', (err) => {
     console.error(err);
     process.exit(1);
   })
   
   setInterval(() => {
     const rss = process.memoryUsage().rss;
     console.log('rss', rss);
     
     if (rss > 734003200) {
       console.log('oom');
       process.exit(1);
     }
   }, 5000)
 }