const fs = require('fs');
const EasySock = require('easy_sock');
const protobuff = require('protocol-buffers');

const schema = protobuff(fs.readFileSync(__dirname + '/../schema/comment.proto'));

const easySock = new EasySock({
  ip: '127.0.0.1',
  port: 4001,
  timeout: 500,
  keepAlive: true
});

easySock.encode = function (data, seq) {
  const body = schema.CommentListRequest.encode(data);

  const header = Buffer.alloc(8);
  header.writeInt32BE(seq);
  header.writeDoubleBE(body.length, 4);

  return Buffer.concat([header, body]);
}

easySock.decode = function (buffer) {
  const seq = buffer.readInt32BE();
  const body = schema.CommentListResponse.decode(buffer.slice(8));

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

