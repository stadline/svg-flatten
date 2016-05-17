/*jshint mocha: true*/

var expect = require('chai').expect;
var fs = require('fs');
var svgflatten = require('../src/lib.js');
var xmldoc = require('xmldoc');

// test
describe('svg-flatten: test samples', function () {
    var samples = ["sample1", "sample2", "sample3"];

    samples.forEach(function(basename) {
        it('should give accurate results (' + basename + ')', function () {
            var sample = fs.readFileSync(__dirname + '/samples/' + basename + '.svg', 'utf8');
            var expectedResult = fs.readFileSync(__dirname + '/samples/' + basename + '_result.svg', 'utf8');

            // test with string
            var result = svgflatten(sample)
              .pathify()
              .flatten()
              .transform()
              .value();

            expect(result).to.be.equal(expectedResult);

            // test with dom
            var sampleDom = new xmldoc.XmlDocument(sample);
            var expectedResultDom = new xmldoc.XmlDocument(expectedResult);

            var resultDom = svgflatten(sampleDom)
              .pathify()
              .flatten()
              .transform()
              .value();

            expect(resultDom.toString()).to.be.equal(expectedResultDom.toString());
        });
    });
});
