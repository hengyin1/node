const fs = require('fs');
const parse = require("csv-parse");
const nodejieba = require("nodejieba");

fs.readFile(__dirname + '/data/data1.csv', 'utf-8', (err, res) => {
  console.log(res);
  parse(res, {
    bom: true
  }, function(err, output){
    console.log(err);
    console.log(output);
  })
})

