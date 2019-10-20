const main = require("./main");
// const assert = require("assert");
const should = require('should');

describe("test main.js", function (params) {
    it('should equal 55 when n === 10', function () {
        // assert.equal(55, main.fibonacci(10));
        main.fibonacci(10).should.equal(55);
    });
});