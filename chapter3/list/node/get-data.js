const listClient = require('./list-client');

module.exports = async function (sortType = 0, filtType = 0) {
  const data = await new Promise((resolve, reject) => {
    listClient.write({
      sortType,
      filtType
    }, function (error, res) {
      error ? reject(error) : resolve(res);
    });
  });

  return data;
}
