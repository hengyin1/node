module.exports = {
  detail: {
    protocol: 'geek-rpc',
    ip: '127.0.0.1',
    port: 4000,
    protobufFile: __dirname + '/../proto/detail.proto',
    requestStruct: 'ColumnRequest',
    responseStruct: 'ColumnResponse'
  },
  articles: {
    protocol: 'http',
    url: 'http://127.0.0.1:4003',
    before: function (data) {
      return data;
    },
    then: function (data) {
      return JSON.parse(data);
    },
    catch: function () {
      
    }
  }
}