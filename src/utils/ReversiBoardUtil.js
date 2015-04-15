var Immutable = require("Immutable"),
    Lazy = require("lazy.js"),
    SettingsStore = require("../stores/SettingsStore"),
    Constants = require("../constants/ReversiConstants"),
    Direction = Constants.get("Direction"),
    GridStatus = Constants.get("GridStatus");

var EMPTY = GridStatus.get("EMPTY"),
    WHITE = GridStatus.get("WHITE");

var BoardUtil = {
    changePlayer: function(player) {
        if (Immutable.is(player, WHITE)) {
            return GridStatus.get("BLACK");
        }
        return WHITE;
    },

    fillPiece: function(board, row, col, value) {
        return board.setIn([row, col, "value"], value);
    },

    fillPieces: function(board, pieces) {
        var immutablePieces = Immutable.fromJS(pieces);
        return immutablePieces.reduce(function(preVal, currVal) {
            return BoardUtil.fillPiece(preVal, currVal.get("row"), currVal.get("col"), currVal.get("value"));
        }, board);
    },

    verifyGridStatus: function(grid, status) {
        return Immutable.is(grid.get("value"), status);
    },

    isGridLegal: function(grid) {
        var rowColLength = SettingsStore.getRowColumnLength(),
            row = grid.get("row"),
            col = grid.get("col");
        if (row > -1 && row < rowColLength && col > -1 && col < rowColLength) {
            return true;
        }
        return false;
    },

    checkReverseDirection: function(grid, board, player, direction) {
        var reverseDirectionGrid = board.getIn([grid.get("row") - direction.row,
                                                grid.get("col") - direction.col]);
        if (BoardUtil.isGridLegal(reverseDirectionGrid)) {
            if (BoardUtil.verifyGridStatus(reverseDirectionGrid, EMPTY)) {
                return false;
            } else if (BoardUtil.verifyGridStatus(reverseDirectionGrid, player)) {
                return true;
            } else if (BoardUtil.verifyGridStatus(reverseDirectionGrid, BoardUtil.changePlayer(player))) {
                return BoardUtil.checkReverseDirection(reverseDirectionGrid, board, player, direction);
            }
        }
        return false;
    },

    getAvailableGridsGivenDirection: function(grid, board, player, direction) {
        var directionGrid = board.getIn([grid.get("row") + direction.row,
                                         grid.get("col") + direction.col]);
        if (BoardUtil.isGridLegal(directionGrid) &&
            BoardUtil.verifyGridStatus(directionGrid, EMPTY) &&
            BoardUtil.checkReverseDirection(grid, board, player, direction)) {
            return directionGrid.set("value", GridStatus.get("AVAILABLE"));
        }
        return null;
    },

    getAvailableGridsGivenGrid: function(grid, board, player) {
        return Direction.reduce(function(availableGrids, direction) {
            availableGrids.push(BoardUtil.getAvailableGridsGivenDirection(grid, board, player, direction));
            return availableGrids;
        }, []);
    },

    getAvailableGrids: function(board, player) {
        var rowColLength = SettingsStore.getRowColumnLength(),
            reversePlayer = BoardUtil.changePlayer(player),
            availableGrids = [];
        for(var i = 0; i < rowColLength; i++) {
            for(var j = 0; j < rowColLength; j++) {
                var grid = board.getIn([i, j]);
                if (BoardUtil.verifyGridStatus(grid, reversePlayer)) {
                    availableGrids = availableGrids.concat(BoardUtil.getAvailableGridsGivenGrid(grid, board, player));
                }
            }
        }
        return Lazy(availableGrids).compact().uniq().value();
    },

    clearAvailableGrids: function(board) {
        var rowColLength = SettingsStore.getRowColumnLength(),
            availableGrids = [];
        for(var i = 0; i < rowColLength; i++) {
            for(var j = 0; j < rowColLength; j++) {
                var grid = board.getIn([i, j]);
                if (BoardUtil.verifyGridStatus(grid, GridStatus.get("AVAILABLE"))) {
                    availableGrids.push(grid.set("value", EMPTY));
                }
            }
        }
        return BoardUtil.fillPieces(board, availableGrids);
    }
};

module.exports = BoardUtil;
