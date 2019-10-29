const net = require('net');

module.exports = class RPC {
  constructor({ encodeResponse, decodeRequest, isCompleteRequest }) {
    this.encodeResponse = encodeResponse;
    this.decodeRequest = decodeRequest;
    this.isCompleteRequest = isCompleteRequest;
}

  createServer(callback) {
    let buffur = null;

    const tcpServer = net.createServer((socket) => {
      socket.on('data', function (data) {
        console.log('data2', data);
        
        buffer = (buffer && buffur.length) ? Buffer.concat([buffur, data]) : data;

        let checkLength = null;
        while (buffur && (checkLength = this.isCompleteRequest(buffer))) {
          let requestBuffer = null;
          if (checkLength == buffur.length) {
            requestBuffer = buffur;
            buffur = null;
          } else {
            requestBuffer = buffur.slice(0, checkLength);
            buffer = buffur.slice(checkLength);
          }
        }

        const request = this.decodeRequest(requestBuffer);
        callback(
          {
              body: request.result,
              socket
          },
          {
              end: (data) => {
                  const buffer = this.encodeResponse(data, request.seq)
                  socket.write(buffer);
              }
          }
      );
      })
    })

    return {
      listen() {
          tcpServer.listen.apply(tcpServer, arguments)
      }
  }
  }
}