const fs = require('fs');
const iconv = require('iconv-lite');

fs.createReadStream(__dirname + '/data/shibie_input1.csv').pipe(iconv.decodeStream('gbk')).pipe(iconv.encodeStream('utf8')).pipe(fs.createWriteStream(__dirname + '/data/shibie_input.csv'));