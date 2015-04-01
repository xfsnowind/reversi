var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    constants = require("../constants/ReversiConstants");

var GameStore = assign({}, EventEmitter.prototype, {
});

module.exports = GameStore;
