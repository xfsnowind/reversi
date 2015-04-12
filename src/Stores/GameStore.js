var EventEmitter = require('events').EventEmitter,
    Immutable = require("immutable"),
    assign = require('object-assign'),
    Dispatcher = require("../dispatcher/ReversiDispatcher"),
    SettingsStore = require("./SettingsStore"),
    Constants = require("../constants/ReversiConstants"),
    ActionTypes = Constants.get("ActionTypes"),
    GridStatus = Constants.get("GridStatus");

var CHANGE_EVENT = "change";

var _player = null,
    _board = [];

var GameStore = assign({}, EventEmitter.prototype, {
    init: function() {
        var rowColLength = SettingsStore.getRowColumnLength();
        _player = GridStatus.get("WHITE");
        for (var i = 0; i < rowColLength; i++) {
            var row = [];
            for (var j = 0; j < rowColLength; j++) {
                row.push({x:i, y:j, value: GridStatus.get("EMPTY")});
            }
            _board.push(Immutable.fromJS(row));
        }
        _board = Immutable.fromJS(_board);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getBoard: function() {
        return _board;
    },

    getPlayer: function() {
        return _player;
    }
});

GameStore.dispatchToken = Dispatcher.register(function(action) {
    switch (action.type) {
        case ActionTypes.get("CLICK_THREAD"):
            var content = action.content;
            _player = GridStatus.get("BLACK");
            _board = _board.setIn([content.get("x"), content.get("y"), "value"], _player);
            GameStore.emitChange(CHANGE_EVENT);
            break;

        default:
    }
});

GameStore.init();

module.exports = GameStore;
