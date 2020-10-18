const fs = require('fs');
const iconv = require('iconv-lite');

fs.createReadStream(__dirname + '/data/zenme_pdf1.csv').pipe(iconv.decodeStream('gbk')).pipe(iconv.encodeStream('utf8')).pipe(fs.createWriteStream(__dirname + '/data/zenme_pdf.csv'));