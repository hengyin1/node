const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base');
  console.log(baseConfig);

  it('entry', () => {
    assert.equal(baseConfig.entry.index, '/Users/yinheng/Desktop/code/temp/node/build-webpack/test/smoke/template/src/index/index.jsx');
    assert.equal(baseConfig.entry.search, '/Users/yinheng/Desktop/code/temp/node/build-webpack/test/smoke/template/src/search/index.jsx');
  });
});