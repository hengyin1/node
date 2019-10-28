const fs = require('fs');
const vm = require('vm');

const templateCache = {};

const templateContext = vm.createContext({
  include: function (name, data) {
    const template = templateCache[name] || compileTemplate(name);
    return template(data);
  }
})

const compileTemplate = function (templatePath) {
  templateCache[templatePath] = vm.runInContext(
    `function (data) {
      width(data) {
        return `${fs.readFileSync(templatePath, 'utf-8')}`
      }
    }`,
    templateContext
  )
}

module.exports = compileTemplate