/*jshint mocha: true*/

var expect = require('chai').expect;
var xmldoc = require('xmldoc');
var transformFn = require('../src/transform.js');

// test
describe('svg-flatten: transform function', function() {
    it('should apply translate transformation', function() {
        var source = new xmldoc.XmlDocument('<svg><path d="M300,200 350,250" transform="translate(10, 20)"/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M310 220L360 270"/></svg>');

        // test
        expect(transformFn(source).toString()).to.be.equal(target.toString());
    });

    it('should apply rotate transformation', function() {
        var source = new xmldoc.XmlDocument('<svg><path d="M300,200 350,250" transform="rotate(90)"/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M-200 300L-250 350"/></svg>');

        // test
        expect(transformFn(source).toString()).to.be.equal(target.toString());
    });

    it('should apply chained transformation', function() {
        var source = new xmldoc.XmlDocument('<svg><path d="M300,200 350,250" transform="translate(10, 0) translate(0, 20)"/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M310 220L360 270"/></svg>');

        // test
        expect(transformFn(source).toString()).to.be.equal(target.toString());
    });

    it('should work with complex paths', function() {
        var circle = new xmldoc.XmlDocument('<path d="M83,200a17,17 0 1,0 34,0a17,17 0 1,0 -34,0" transform="translate(10, 0)"/>');
        var ellipse = new xmldoc.XmlDocument('<path d="M189,200a11,42 0 1,0 22,0a11,42 0 1,0 -22,0" transform="translate(10, 0)"/>');
        var line = new xmldoc.XmlDocument('<path d="M300,200 350,250" transform="translate(10, 0)"/>');
        var polygon = new xmldoc.XmlDocument('<path d="M100,10 40,198 190,78 10,78 160,198z" transform="translate(10, 0)"/>');
        var polyline = new xmldoc.XmlDocument('<path d="M400,150 450,250 400,300" transform="translate(10, 0)"/>');
        var rect = new xmldoc.XmlDocument('<path d="M500,200 580,200 580,300 500,300z" transform="translate(10, 0)"/>');
        var shape = new xmldoc.XmlDocument('<path d="M1422,416.1c-6.3-40.5,83.3-114,173-108c90.1,6,173.9,92,175,188c1,85.5-64.1,140.2-79,152 c-97.2,76.6-220.5,30.1-236,24c-84.8-33.6-153-114.3-138-142c22.1-40.7,210.4,57.4,263-10c21.5-27.5,16-77-2-87 c-19.5-10.8-44.9,29.6-91,26C1458.8,456.8,1425.5,438.3,1422,416.1z" transform="translate(10, 0)"/>');

        // test
        expect(transformFn(circle).toString()).to.be.equal('<path d="M93 200a17 17 0 1 0 34 0 17 17 0 1 0-34 0"/>');
        expect(transformFn(ellipse).toString()).to.be.equal('<path d="M199 200a42 11 90 1 0 22 0 42 11 90 1 0-22 0"/>');
        expect(transformFn(line).toString()).to.be.equal('<path d="M310 200L360 250"/>');
        expect(transformFn(polygon).toString()).to.be.equal('<path d="M110 10L50 198 200 78 20 78 170 198z"/>');
        expect(transformFn(polyline).toString()).to.be.equal('<path d="M410 150L460 250 410 300"/>');
        expect(transformFn(rect).toString()).to.be.equal('<path d="M510 200L590 200 590 300 510 300z"/>');
        expect(transformFn(shape).toString()).to.be.equal('<path d="M1432 416.1c-6.3-40.5 83.3-114 173-108 90.1 6 173.9 92 175 188 1 85.5-64.1 140.2-79 152-97.2 76.6-220.5 30.1-236 24-84.8-33.6-153-114.3-138-142 22.1-40.7 210.4 57.4 263-10 21.5-27.5 16-77-2-87-19.5-10.8-44.9 29.6-91 26C1468.8 456.8 1435.5 438.3 1432 416.1z"/>');
    });
});
