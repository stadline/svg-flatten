/*jshint mocha: true*/

var expect = require('chai').expect;
var xmldoc = require('xmldoc');
var flattenFn = require('../src/flatten.js');

// test
describe('svg-flatten: flatten function', function() {
    it('should flatten path groups', function() {
        var source = new xmldoc.XmlDocument('<svg><g><path d="M300,200 350,250"/><path d="M400,200 450,250"/></g></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M300,200 350,250 M400,200 450,250"/></svg>');

        // test
        expect(flattenFn(source).toString()).to.be.equal(target.toString());
    });

    it('should flatten nested path groups', function() {
        var source = new xmldoc.XmlDocument('<svg><g><g><path d="M300,200 350,250"/><path d="M400,200 450,250"/></g><g><path d="M100,200 150,250"/></g></g></svg>');
        var target = new xmldoc.XmlDocument('<svg><path d="M300,200 350,250 M400,200 450,250 M100,200 150,250"/></svg>');

        // test
        expect(flattenFn(source).toString()).to.be.equal(target.toString());
    });

    it('should work with complex groups', function() {
        var source = new xmldoc.XmlDocument('<svg><g transform="translate(200, 300) rotate(20)" title="gauche"><g transform="translate(-50, -100)"><style type="text/css">.st0{fill:#D6D5D5;}</style><g><path class="st0" d="M300,200 350,250"/></g><g><path class="st0" d="M400,200 450,250"/></g></g></g></svg>');
        var target = new xmldoc.XmlDocument('<svg><path transform="translate(200, 300) rotate(20)" title="gauche" d="M250 100L300 150M350 100L400 150"/></svg>');

        // test
        expect(flattenFn(source).toString()).to.be.equal(target.toString());
    });
});
