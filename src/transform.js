var svgpath = require('svgpath');

function transformGroup(dom) {
    var newChildren = [];

    dom.children.forEach(function (child) {
        newChildren.push(transform(child));
    });

    dom.children = newChildren;

    if (newChildren.length > 0) {
        dom.firstChild = newChildren[0];
        dom.lastChild = newChildren[newChildren.length - 1];
    }

    return dom;
}

function transformPath(dom) {
    dom.attr.d = svgpath(dom.attr.d).transform(dom.attr.transform)
      .round(10)
      .toString();

    delete dom.attr.transform;

    return dom;
}

function transform(dom) {
    if (dom.name === 'path' && dom.attr.transform) {
        return transformPath(dom);
    } else if (dom.name === 'svg' || dom.name === 'g') {
        return transformGroup(dom);
    } else {
        return dom;
    }
}

module.exports = transform;