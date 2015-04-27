var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var _rowColLength = 8;

var SettingsStore = assign({}, EventEmitter.prototype, {
    getRowColumnLength: function () {
        return _rowColLength;
    }
});

module.exports = SettingsStore;
