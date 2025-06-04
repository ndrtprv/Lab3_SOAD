const xml2js = require('xml2js');

module.exports = function parseXmlAsync(xmlStr) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlStr, { explicitArray: false }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}