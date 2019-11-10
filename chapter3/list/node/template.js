const vm = require('vm');
const fs = require('fs');

const templateContext = vm.createContext({});
function createTemplate(templatePath) {
  return vm.runInContext(
    `(function (data) {
      with (data) {
        return \`${fs.readFileSync(templatePath, 'utf-8')}\`
      }
    })`,
    templateContext
  )
}

module.exports = createTemplate