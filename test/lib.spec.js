/*jshint mocha: true*/
/*jshint expr: true*/
/*jshint multistr: true*/

var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

// sample file
var file = '<?xml version="1.0" encoding="utf-8"?> \
<!-- Generator: Adobe Illustrator 19.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> \
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> \
<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 1920.7 1133.7" style="enable-background:new 0 0 1920.7 1133.7;" xml:space="preserve"> \
    <rect x="804.5" y="83" class="st0" width="112.5" height="112.5" transform="translate(0, 100)" /> \
</svg>';

// test
describe('svg-flatten lib', function() {
    var parse;
    var pathify;
    var transform;
    var flatten;
    var lib;

    beforeEach(function () {
        parse = sinon.stub();
        pathify = sinon.stub();
        transform = sinon.stub();
        flatten = sinon.stub();

        parse.withArgs(file).returns(file);

        // inject stubs into library
        lib = proxyquire('../src/lib.js', {
            './parse.js': parse,
            './pathify.js': pathify,
            './transform.js': transform,
            './flatten.js': flatten
        });
    });

    it('should wrap the source', function() {
        var wrapper = lib(file);

        // test
        expect(wrapper).to.be.an('object');
        expect(wrapper._value).to.be.equal(file);
    });

    it('should apply the parse filter', function() {
        // init mocks
        var parsedFile = {
            parsed: true
        };

        parse.withArgs(file).returns(parsedFile);

        // test
        expect(lib(file)._value).to.be.equal(parsedFile);
        expect(parse.calledOnce).to.be.true;
    });

    it('should apply the pathify filter', function() {
        var wrapper = lib(file);

        // init mocks
        var pathifiedFile = {
            pathified: true
        };

        pathify.withArgs(file).returns(pathifiedFile);

        // test
        expect(wrapper.pathify()._value).to.be.equal(pathifiedFile);
        expect(pathify.calledOnce).to.be.true;
    });

    it('should apply the transform filter', function() {
        var wrapper = lib(file);

        // init mocks
        var transformedFile = {
            transformed: true
        };

        transform.withArgs(file).returns(transformedFile);

        // test
        expect(wrapper.transform()._value).to.be.equal(transformedFile);
        expect(transform.calledOnce).to.be.true;
    });

    it('should apply the flatten filter', function() {
        var wrapper = lib(file);

        // init mocks
        var flatFile = {
            flat: true
        };

        flatten.withArgs(file).returns(flatFile);

        // test
        expect(wrapper.flatten()._value).to.be.equal(flatFile);
        expect(flatten.calledOnce).to.be.true;
    });

    it('should chain filters', function() {
        var wrapper = lib(file);

        // init mocks
        var pathifiedFile = {
            pathified: true
        };

        var flatFile = {
            flat: true
        };

        pathify.withArgs(file).returns(pathifiedFile);
        flatten.withArgs(pathifiedFile).returns(flatFile);

        // test
        expect(wrapper.pathify().flatten()._value).to.be.equal(flatFile);
        expect(parse.calledOnce).to.be.true;
        expect(pathify.calledOnce).to.be.true;
        expect(flatten.calledOnce).to.be.true;
    });
});
