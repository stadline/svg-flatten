var parseFn = require('./parse.js');
var pathifyFn = require('./pathify.js');
var transformFn = require('./transform.js');
var flattenFn = require('./flatten.js');

function Wrapper(source) {
    if (typeof source === "string") {
        this._value = parseFn(source);
    } else {
        this._value = source;
    }

    this.pathify = function() {
        this._value = pathifyFn(this._value);
        return this;
    };

    this.transform = function() {
        this._value = transformFn(this._value);
        return this;
    };

    this.flatten = function() {
        this._value = flattenFn(this._value);
        return this;
    };

    this.value = function() {
        if (typeof source === "string") {
            var meta = source.substr(0, source.indexOf("<" + this._value.name));
            return meta + this._value.toString();
        } else {
            return this._value;
        }
    };
}

module.exports = function(source) {
    return new Wrapper(source);
};
