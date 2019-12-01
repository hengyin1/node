function factory(config) {
  config.before = config.before || (d => d);
  config.then = config.then || (d => d);
  config.catch = config.catch || (d => d);

  requesters[config.protocol].compile(config);
  
  return function (data) {
    data = config.before(data);
    return requesters[config.protocol]
      .request(data)
      .then(config.then)
      .catch(config.catch);
  }
}

const requesters = {};

factory.registerProtocol = function (protocol, requester) {
  requesters[protocol] = requester;
}

module.exports = factory