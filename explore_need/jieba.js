const fs = require('fs');
const iconv = require('iconv-lite');
const parse = require("csv-parse");
const nodejieba = require("nodejieba");

// fs.createReadStream(__dirname + '/data/data1.csv').pipe(iconv.decodeStream('gbk')).pipe(iconv.encodeStream('utf8')).pipe(fs.createWriteStream(__dirname + '/data/data4.csv'));

fs.readFile(__dirname + '/data/data4.csv', 'utf-8', (err, res) => {
  // console.log(res);
  parse(res, {
    from_line: 3
  }, function(err, output){
    if (err) {
      console.log(err);
      return;
    }
    
    output = output.map(item => {
      // const words = nodejieba.tag(item[0]).filter(item => item.tag == 'n' || item.tag == 'eng' || item.tag == 'nr' || item.tag == 'nz' || item.tag == 'x');
      // const word = words.reduce((pre, cur) => pre + cur.word, '');
      // return word;

      return  nodejieba.tag(item[0]);
    });
 
    console.log(output);
  })
})

