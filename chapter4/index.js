 const cluster = require('cluster');

 if (cluster.isMaster) {
   for (let index = 0; index < 3; index++) {
     const worker = cluster.fork();

     let missedHello = 0;
     let interval = setInterval(() => {
       worker.send('hello');
       missedHello++;

       if (missedHello >= 3) {
         clearInterval(interval);
         process.kill(worker.process.pid);
       }
     }, 3000);

     worker.on('message', (msg) => {
       if (msg == 'world') {
        missedHello--;
       }
     });
   }

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
   });

   process.on('message', (msg) => {
     if (msg == 'hello') {
       process.send('world');
     }
   });
   
   setInterval(() => {
     const rss = process.memoryUsage().rss;
     console.log('rss', rss);
     
     if (rss > 734003200) {
       console.log('oom');
       process.exit(1);
     }
   }, 5000);
 }