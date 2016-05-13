var xmldoc = require('xmldoc');

module.exports = function (source) {
    try {
        return new xmldoc.XmlDocument(source);
    } catch (exception) {
        var dom = new xmldoc.XmlDocument('<invalid />');
        dom.attr.reason = exception.toString();

        return dom;
    }
};