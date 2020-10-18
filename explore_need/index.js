const fs = require('fs');
const parse = require("csv-parse");
const nodejieba = require("nodejieba");

fs.readFile(__dirname + '/data/input1.csv', 'utf-8', (err, res) => {
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
      
      return  nodejieba.tag(item[0])
              .filter(item => item.tag != 'v' && item.tag != 'r' && item.tag != 'l' && item.tag != 'ul' && item.tag != 'c' && item.tag != 'uj' && item.tag != 'd')
              .map(item => item.word);
    }).flat();
    // console.log(output);

    const outputObj = {};
    output.forEach(element => {
      if (outputObj.hasOwnProperty(element)) {
        outputObj[element] += 1;
      } else {
        outputObj[element] = 1;
      }
    })
    // console.log(outputObj);

    const compaire = (a, b) => {
      return b[1] - a[1];
    }

    let outputStr = '\ufeff';
    for (const [key, value] of Object.entries(outputObj).sort(compaire)) {
      outputStr += `${key},${value}\n`;
    }
    console.log(outputStr);

    fs.writeFile(__dirname + '/data/output1.csv', outputStr, {encoding: 'utf8'}, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    })
  })
})

