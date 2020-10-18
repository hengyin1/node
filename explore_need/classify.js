const fs = require('fs');
const parse = require("csv-parse");
const nodejieba = require("nodejieba");

fs.readFile(__dirname + '/data/zenme_pdf.csv', 'utf-8', (err, res) => {
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
      const tags =['r', 'i', 'p', 'uj', 'x', 'f', 'b', 'm', 'a', 'd', 'l', 'c'];
      return {
        word: item[0],
        cut: Array.from(new Set(nodejieba.tag(item[0]).filter(item => !tags.includes(item.tag)).map(item => item.word)))
      }
    })
    // console.log(output);

    let counter = 0;
    const classify_loop = () => {
      // counter++;
      // if (counter > 3) return;

      let classify = [];
      let refer_cut = null;
      let start_index = 0;
      for (let i = 0; i < output.length; i++) {
        if (output[i]) {
          classify.push(output[i].word);
          refer_cut = output[i].cut;
          start_index = i + 1;
          output[i] = null;
          break;
        }
      }
  
      if (!refer_cut) return;
  
      for (let i = start_index; i < output.length; i++) {
        if (!output[i]) continue;
        const { word, cut } = output[i];
        const vec_index = Array.from(new Set([...refer_cut, ...cut]));
        const refer_vec = vec_index.map(item => refer_cut.includes(item) ? 1 : 0);
        const vec = vec_index.map(item => cut.includes(item) ? 1 : 0);
        const dot_res = dot(normalize(refer_vec), normalize(vec));
        if (dot_res >= 0.7) {
          output[i] = null;
          classify.push(word);
        }
      }
      // console.log(classify);
  
      let outputStr = '\ufeff' + `${classify.length}\n`;
      classify.forEach(item => {
        outputStr += `${item}\n`;
      })
      // console.log(outputStr);
  
      const file_name = refer_cut.join('_');
      fs.writeFile(__dirname + `/data/classify/${file_name}.csv`, outputStr, {encoding: 'utf8'}, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        classify_loop();
      })
    }

    classify_loop();
  })
})

function normalize(out) {
  let len = out.reduce((pre, cur) => pre + cur * cur, 0);
  if (len > 0) {
      len = 1 / Math.sqrt(len);
  }

  return out.map(item => item * len);
}

function dot(a, b) {
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out += a[i] * b[i];
  }

  return out;
}

