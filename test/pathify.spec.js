/*jshint mocha: true*/

var expect = require('chai').expect;
var xmldoc = require('xmldoc');
var pathifyFn = require('../src/pathify.js');

// test
describe('svg-flatten: pathify function', function() {
    it('should convert circle', function() {
        var source = new xmldoc.XmlDocument('<svg><circle cx="100" cy="200" r="17"/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M83,200a17,17 0 1,0 34,0a17,17 0 1,0 -34,0"/></svg>');

        // test
        expect(pathifyFn(source).toString()).to.be.equal(target.toString());
    });

    it('should convert ellipse', function() {
        var source = new xmldoc.XmlDocument('<svg><ellipse cx="200" cy="200" rx="11" ry="42"/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M189,200a11,42 0 1,0 22,0a11,42 0 1,0 -22,0"/></svg>');

        // test
        expect(pathifyFn(source).toString()).to.be.equal(target.toString());
    });

    it('should convert line', function() {
        var source = new xmldoc.XmlDocument('<svg><line x1="300" y1="200" x2="350" y2="250"/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M300,200 350,250"/></svg>');

        // test
        expect(pathifyFn(source).toString()).to.be.equal(target.toString());
    });

    it('should convert polygons', function() {
        var source = new xmldoc.XmlDocument('<svg><polygon points="100,10 40,198 190,78 10,78 160,198"/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M100,10 40,198 190,78 10,78 160,198z"/></svg>');

        // test
        expect(pathifyFn(source).toString()).to.be.equal(target.toString());
    });

    it('should convert polyline', function() {
        var source = new xmldoc.XmlDocument('<svg><polyline style="fill:none" points="400,150 450,250 400,300"/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path style="fill:none" d="M400,150 450,250 400,300"/></svg>');

        // test
        expect(pathifyFn(source).toString()).to.be.equal(target.toString());
    });

    it('should convert polyline with extra whitespaces', function() {
        var source = new xmldoc.XmlDocument('<svg><polyline style="fill:none" points="400,150 450,250 400,300  "/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path style="fill:none" d="M400,150 450,250 400,300"/></svg>');

        // test
        expect(pathifyFn(source).toString()).to.be.equal(target.toString());
    });

    it('should convert rect', function() {
        var source = new xmldoc.XmlDocument('<svg><rect x="500" y="200" width="80" height="100"/></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M500,200 580,200 580,300 500,300z"/></svg>');

        // test
        expect(pathifyFn(source).toString()).to.be.equal(target.toString());
    });

    it('should preserve groups', function() {
        var source = new xmldoc.XmlDocument('<svg viewBox="0 0 1920.7 1133.7"><path d="M976.7,262v294.4h294.4V262H976.7z M1221,506.4h-97.1v-97.1h97.1V506.4z"/></svg>');

        // test
        expect(pathifyFn(source)).to.be.equal(source);
    });
    it('should preserve nested groups', function() {
        var source = new xmldoc.XmlDocument('<svg><g transform="rotate(20)"><g transform="rotate(30)"><line x1="300" y1="200" x2="350" y2="250"/></g></g></svg>');
        var target = new xmldoc.XmlDocument('<svg><g transform="rotate(20)"><g transform="rotate(30)"><path d="M300,200 350,250"/></g></g></svg>');

        // test
        expect(pathifyFn(source).toString()).to.be.equal(target.toString());
    });

    it('should should convert group children', function() {
        var source = new xmldoc.XmlDocument('<svg><g transform="rotate(45)"><line x1="300" y1="200" x2="350" y2="250"/><circle cx="100" cy="200" r="17"/></g></svg>');
        var target = new xmldoc.XmlDocument('<svg><g transform="rotate(45)"><path d="M300,200 350,250"/><path d="M83,200a17,17 0 1,0 34,0a17,17 0 1,0 -34,0"/></g></svg>');

        // test
        expect(pathifyFn(source).toString()).to.be.equal(target.toString());
    });
});
