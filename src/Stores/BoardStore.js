var EventEmitter = require('events').EventEmitter,
    Immutable = require("immutable"),
    assign = require('object-assign'),
    Dispatcher = require("../dispatcher/ReversiDispatcher"),
    SettingsStore = require("./SettingsStore"),
    BoardUtil = require("../utils/ReversiBoardUtil"),
    Constants = require("../constants/ReversiConstants"),
    ActionTypes = Constants.get("ActionTypes"),
    GridStatus = Constants.get("GridStatus");

var CHANGE_EVENT = "change",
    WHITE = GridStatus.get("WHITE"),
    BLACK = GridStatus.get("BLACK");

var _player = null,
    _history = [],
    _board = [];

function init() {
    var rowColLength = SettingsStore.getRowColumnLength(),
        halfRowColLength = rowColLength / 2,
        initPieces = [{row: halfRowColLength - 1, col: halfRowColLength - 1, value: WHITE},
                      {row: halfRowColLength, col: halfRowColLength - 1, value: BLACK},
                      {row: halfRowColLength - 1, col: halfRowColLength, value: BLACK},
                      {row: halfRowColLength, col: halfRowColLength, value: WHITE}];
    _player = WHITE;
    for (var i = 0; i < rowColLength; i++) {
        var row = [];
        for (var j = 0; j < rowColLength; j++) {
            row.push({row:i, col:j, value: GridStatus.get("EMPTY")});
        }
        _board.push(Immutable.fromJS(row));
    }
    _board = BoardUtil.fillPieces(Immutable.fromJS(_board), initPieces);
    var availableGrids = BoardUtil.fillAvailableGrids(_board, _player);
    _board = BoardUtil.fillPieces(_board, availableGrids);
    _history = Immutable.fromJS(_history.push(_board));
}

var BoardStore = assign({}, EventEmitter.prototype, {
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

    getNumberPieces: function(player) {
        var rowColLength = SettingsStore.getRowColumnLength(),
            num = 0;
        for(var i = 0; i < rowColLength; i++) {
            for(var j = 0; j < rowColLength; j++) {
                var grid = _board.getIn([i, j]);
                if (BoardUtil.verifyGridStatus(grid, player)) {
                    num++;
                }
            }
        }
        return num;
    },

    getPlayer: function() {
        return _player;
    }
});

BoardStore.dispatchToken = Dispatcher.register(function(action) {
    var content = action.content;

    switch (action.type) {
        case ActionTypes.get("CLICK_THREAD"):
            _board = BoardUtil.fillPiece(_board, content.get("row"), content.get("col"), _player);
            _board = BoardUtil.clearAvailableGrids(_board);
            _board = BoardUtil.reverseGrids(content, _board, _player);
            _player = BoardUtil.changePlayer(_player);
            var availableGrids = BoardUtil.fillAvailableGrids(_board, _player);
            if (availableGrids.length === 0) {
                _player = BoardUtil.changePlayer(_player);
                // availableGrids = BoardUtil.fillAvailableGrids(_board, _player);
            } else {
                _board = BoardUtil.fillPieces(_board, availableGrids);
            }
            BoardStore.emitChange(CHANGE_EVENT);
            break;

        default:
    }
});

init();

module.exports = BoardStore;
