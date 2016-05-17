var transform = require('./transform.js');
var xmldoc = require('xmldoc');

function flattenSvg(dom) {
    var newChildren = [];

    dom.children.forEach(function (child) {
        newChildren.push(flatten(child));
    });

    dom.children = newChildren;

    if (newChildren.length > 0) {
        dom.firstChild = newChildren[0];
        dom.lastChild = newChildren[newChildren.length - 1];
    }

    return dom;
}

function flattenGroup(dom) {
    var path = new xmldoc.XmlDocument('<path/>');

    path.attr = dom.attr;
    path.attr.d = "";

    dom.children.forEach(function (child) {
        var flatChild = transform(flatten(child));

        if (flatChild.attr.d) {
            var prefix = path.attr.d.length ? " " : "";
            path.attr.d += prefix + flatChild.attr.d;
        }
    });

    return path;
}

function flatten(dom) {
    if (dom.name === 'svg') {
        return flattenSvg(dom);
    } else if (dom.name === 'g') {
        return flattenGroup(dom);
    } else {
        return dom;
    }
}

module.exports = flatten;