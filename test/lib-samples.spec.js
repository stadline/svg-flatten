/*jshint mocha: true*/

var expect = require('chai').expect;
var fs = require('fs');
var svgflatten = require('../src/lib.js');

// test
describe('svg-flatten: test samples', function() {
    it('should give accurate results', function() {
        var sample = fs.readFileSync(__dirname + '/samples/sample1.svg', 'utf8');

        var result = svgflatten(sample)
          .pathify()
          .flatten()
          .transform()
          .value();

        var expectedResult = fs.readFileSync(__dirname + '/samples/sample1_result.svg', 'utf8');

        // test
        expect(result).to.be.equal(expectedResult);
    });
});
