var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    config = require("../../constants/Config.json");

var _rowColLength = config["rowColLength"];

var SettingsStore = assign({}, EventEmitter.prototype, {
    getRowColumnLength: function () {
        return _rowColLength;
    }
});

module.exports = SettingsStore;
