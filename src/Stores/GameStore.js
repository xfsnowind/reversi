var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    constants = require("../constants/ReversiConstants");

var _player = constants.WHITE;

var GameStore = assign({}, EventEmitter.prototype, {
    getPlayer: function() {
        return _player;
    }
});

module.exports = GameStore;
