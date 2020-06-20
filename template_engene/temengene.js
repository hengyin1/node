const vm = require('vm');

const user = {
  name: '<script />'
}
const result = `<h2>${user.name}</h2>`;

const templateMap = {
  templateA: '`<h2>${inlude("templateB")}</h2>`',
  templateB: '`hello world!`'
}

const context = {
  inlude: function (name) {
    return templateMap[name]();
  },
  _: function (markup) {
    if (!markup) return;
    return String(markup)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;');
  }
}

Object.keys(templateMap).forEach(key => {
  const tem = templateMap[key];
  templateMap[key] = vm.runInNewContext(`
    (function () {
      return ${tem}
    })
  `, context);
})

console.log(templateMap['templateA']());


// console.log(vm.runInNewContext('`<h2>${_(user.name)}</h2>`', {
//   user,
//   _: function (markup) {
//     if (!markup) return;
//     return String(markup)
//       .replace(/&/g, '&amp;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;')
//       .replace(/'/g, '&#39;')
//       .replace(/"/g, '&quot;')
//   }
// }));