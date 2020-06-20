const net = require('net');

const socket = new net.Socket({});

socket.connect({
  host: '127.0.0.1',
  port: 4000
})

const lessonids = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

setInterval(() => {
  socket.write(encode());
}, 50)

socket.on('data', (buffer) => {
  const seqBuffer = buffer.slice(0, 2);
  const titltBuffer = buffer.slice(2);
  console.log(seqBuffer.readInt16BE(), titltBuffer.toString());
  // socket.write(encode());
})

let seq = 0;
function encode() {
  let buffer = Buffer.alloc(6);
  let lessonid = lessonids[Math.floor(Math.random() * lessonids.length)];
  const _seq = seq++;
  console.log(_seq, lessonid);
  buffer.writeInt16BE(_seq);
  buffer.writeInt32BE(lessonid, 2);
  return buffer;
}