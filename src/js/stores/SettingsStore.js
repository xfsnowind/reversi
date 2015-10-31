import EventEmitter from 'events';
import assign from 'object-assign';

var config = require("../../constants/Config.json"),
    _rowColLength = config["rowColLength"];

var SettingsStore = assign({}, EventEmitter.prototype, {
    getRowColumnLength: function () {
        return _rowColLength;
    }
});

export default SettingsStore;
