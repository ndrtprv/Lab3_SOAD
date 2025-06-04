const js2xmlparser = require('js2xmlparser');

module.exports = function formatResponse(req, res, next) {
    res.formatResponse = (data) => {
        if (req.headers['accept'] === 'application/xml') {
            res.set('Content-Type', 'application/xml');
            res.send(js2xmlparser.parse("response", data));
        } else {
            res.json(data);
        }
    };
    next();
}