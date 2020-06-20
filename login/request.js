const https = require('https');
const querystring = require('querystring');

const request = function(url) {
  return new Promise((resolve, reject) => {
  
    const options = {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    };
    
    let _chunk = '';
    const req = https.request(url, options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        _chunk += chunk;
      });
      res.on('end', () => {
        console.log('No more data in response.');
        resolve(_chunk);
      });
    });
  
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
      reject(e.message);
    });
    
    req.end();
  });
};

module.exports = request;