const EasySock = require('easy_sock');
const fs = require('fs');
const protobuf = require('protocol-buffers');
const schemas = protobuf(fs.readFileSync(__dirname + '/detail-service/proto/detail.proto'));

const easySock = new EasySock({
  ip: '127.0.0.1',
  port: 400,
  timeout: 500,
  keepAlive: true
})

easySock.encode = function (data, seq) {
  console.log("data", data);
  
  const body = schemas.ColumnRequest.encode(data);

  const head = Buffer.alloc(8);
  head.writeInt32BE(seq);
  head.writeInt32BE(body.length, 4);

  return Buffer.concat([head, body]);
}

easySock.decode = function (buffer) {
  const seq = buffer.readInt32BE();
  const body = schemas.ColumnResponse.decode(buffer.slice(8));

  return {
    seq,
    result: body
  }
}

easySock.isReceiveComplete = function (buffer) {
  if (buffer.length < 8) {
    return 0;
  }
  const bodyLength = buffer.readInt32BE(4);

  if (buffer.length >= bodyLength + 8) {
    return bodyLength + 8;
  } else {
    return 0;
  }
}

module.exports = easySock;

