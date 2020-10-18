const fs = require('fs');
const parse = require("csv-parse");
const nodejieba = require("nodejieba");

fs.readFile(__dirname + '/data/zenme_tupian.csv', 'utf-8', (err, res) => {
  // console.log(res);
  parse(res, {
    from_line: 3,
    skip_lines_with_error: true
  }, function(err, output){
    if (err) {
      console.log(err);
      return;
    }

    output = output.map(item => item[0]);
    
    let output_cut = output.map(item => {
      return  nodejieba.tag(item).map(item => item.word);
    })
    // console.log(output_cut);

    const vecIndex = {};
    let vecCounter = 1;
    output_cut.flat().forEach(element => {
      if (!vecIndex.hasOwnProperty(element)) {
        vecIndex[element] = vecCounter++;
      }
    })
    // console.log(vecIndex);

    output_cut = output_cut.map((element, index) => {
      return {
        word: output[index],
        vec: element.map(item => vecIndex[item]).reduce((pre, cur) => pre + cur, 0) / element.length
      }
    })

    output_cut = output_cut.filter(item => Math.abs(item.vec - 3) <= 3);
    console.log(output_cut.length);
    console.log(output_cut);
  })
})

