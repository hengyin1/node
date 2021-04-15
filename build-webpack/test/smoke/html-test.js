const glob = require('glob');

describe('Checking generated html', () => {
  it('should generated html', (done) => {
    const files = glob.sync('./dist/index.html');

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no html generated');
    }
  });
});