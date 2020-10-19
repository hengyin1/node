const fs = require('fs');
const parse = require("csv-parse");
const nodejieba = require("nodejieba");

fs.readFile(__dirname + '/data/shibie_input.csv', 'utf-8', (err, res) => {
  // console.log(res);
  parse(res, {
    from_line: 3,
    skip_lines_with_error: true
  }, function(err, output){
    if (err) {
      console.log(err);
      return;
    }
    
    output = output.map(item => {
      // const words = nodejieba.tag(item[0]).filter(item => item.tag == 'n' || item.tag == 'eng' || item.tag == 'nr' || item.tag == 'nz' || item.tag == 'x');
      // const word = words.reduce((pre, cur) => pre + cur.word, '');
      // return word;

      const tags =['v', 'vn', 'r', 'l', 'ul', 'c', 'uj', 'd', 'm', 'f', 'i', 'p', 'ud', 'b', 'uz'];
      return  nodejieba.tag(item[0])
              .filter(item => !tags.includes(item.tag)).map(item => item.word);
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
    for (const [key, value] of Object.entries(outputObj).filter(item => item[1] > 99).sort(compaire)) {
      outputStr += `${key},${value}\n`;
    }
    console.log(outputStr);

    fs.writeFile(__dirname + '/data/shibie_output.csv', outputStr, {encoding: 'utf8'}, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    })
  })
})

