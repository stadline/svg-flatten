/*jshint singleGroups: false*/

function _convertEllipse(cx, cy, rx, ry) {
    return "M" + (cx - rx) + "," + cy + "a" + rx + "," + ry + " 0 1,0 " + (rx * 2) + ",0a" + rx + "," + ry + " 0 1,0 " + (rx * -2) + ",0";
}

function _convertPoints(points) {
    var path = "";

    for (var i=0; i<points.length; i+=2) {
        var prefix = path.length ? ' ' : 'M';
        path += prefix + points[i] + ',' + points[i+1];
    }

    return path;
}

function convertGroup(dom) {
    var newChildren = [];

    dom.children.forEach(function (child) {
        newChildren.push(pathify(child));
    });

    dom.children = newChildren;

    if (newChildren.length > 0) {
        dom.firstChild = newChildren[0];
        dom.lastChild = newChildren[newChildren.length - 1];
    }

    return dom;
}

function convertCircle(dom) {
    var path = _convertEllipse(dom.attr.cx, dom.attr.cy, dom.attr.r, dom.attr.r);

    delete dom.attr.cx;
    delete dom.attr.cy;
    delete dom.attr.r;

    dom.name = 'path';
    dom.attr.d = path;

    return dom;
}

function convertEllipse(dom) {
    var path = _convertEllipse(dom.attr.cx, dom.attr.cy, dom.attr.rx, dom.attr.ry);

    delete dom.attr.cx;
    delete dom.attr.cy;
    delete dom.attr.rx;
    delete dom.attr.ry;

    dom.name = 'path';
    dom.attr.d = path;

    return dom;
}

function convertLine(dom) {
    var path = _convertPoints([dom.attr.x1, dom.attr.y1, dom.attr.x2, dom.attr.y2]);

    delete dom.attr.x1;
    delete dom.attr.y1;
    delete dom.attr.x2;
    delete dom.attr.y2;

    dom.name = 'path';
    dom.attr.d = path;

    return dom;
}

function convertPolygon(dom) {
    var points = dom.attr.points.trim().split(/[\s,]+/);
    var path = _convertPoints(points) + "z";

    delete dom.attr.points;

    dom.name = 'path';
    dom.attr.d = path;

    return dom;
}

function convertPolyline(dom) {
    var points = dom.attr.points.trim().split(/[\s,]+/);
    var path = _convertPoints(points);

    delete dom.attr.points;

    dom.name = 'path';
    dom.attr.d = path;

    return dom;
}

function convertRect(dom) {
    var x = parseFloat(dom.attr.x);
    var y = parseFloat(dom.attr.y);
    var width = parseFloat(dom.attr.width);
    var height = parseFloat(dom.attr.height);

    var points = [];
    points.push(x, y);
    points.push(x + width, y);
    points.push(x + width, y + height);
    points.push(x, y + height);
    var path = _convertPoints(points) + "z";

    delete dom.attr.x;
    delete dom.attr.y;
    delete dom.attr.width;
    delete dom.attr.height;

    dom.name = 'path';
    dom.attr.d = path;

    return dom;
}

function pathify(dom) {
    if (dom.name === 'svg') {
        return convertGroup(dom);
    } else if (dom.name === 'circle') {
        return convertCircle(dom);
    } else if (dom.name === 'ellipse') {
        return convertEllipse(dom);
    } else if (dom.name === 'line') {
        return convertLine(dom);
    } else if (dom.name === 'polygon') {
        return convertPolygon(dom);
    } else if (dom.name === 'polyline') {
        return convertPolyline(dom);
    } else if (dom.name === 'rect') {
        return convertRect(dom);
    } else if (dom.name === 'g') {
        return convertGroup(dom);
    } else {
        return dom;
    }
}

module.exports = pathify;