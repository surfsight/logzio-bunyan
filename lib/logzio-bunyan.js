var logzioNodejs = require('logzio-nodejs');
var stringifySafe = require('json-stringify-safe');
var _assign = require('lodash.assign');


function LogzioLogger(options) {
    _assign(this, options);

    this.logzioLogger = logzioNodejs.createLogger(options);

    this.end = function () {
        this.logzioLogger.close();
    };
}

var levels = {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal'
};

LogzioLogger.prototype.safeToString = function (json) {
    try {
        return JSON.stringify(json);
    }
    catch (ex) {
        return stringifySafe(json, null, null, function () {
        });
    }
};

LogzioLogger.prototype.write = function (msg) {
    msg.message = JSON.stringify(msg);
    this.logzioLogger.log(msg);
};

exports = module.exports = LogzioLogger;

