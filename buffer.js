const buffer1 = Buffer.from('hello')

const buffer2 = Buffer.from([1, 2, 3, 4])

const buffer3 = Buffer.alloc(20)


console.log(buffer1);
console.log(buffer2);
console.log(buffer3);

buffer2.writeInt8(8, 1);
console.log(buffer2);
buffer2.writeInt16BE(512, 2);
console.log(buffer2);

const fs = require('fs')
const protobuf = require('protocol-buffers')
const schema = protobuf(fs.readFileSync('test.proto'))
console.log(schema);

const buffer4 = schema.Cloumn.encode({
  id: 1,
  name: 'Node.js',
  price: 80
})
console.log(schema.Cloumn.decode(buffer4));


