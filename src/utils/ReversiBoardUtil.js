var Immutable = require("immutable"),
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

    isGridLegal: function(row, col) {
        var rowColLength = SettingsStore.getRowColumnLength();
        if (row > -1 && row < rowColLength && col > -1 && col < rowColLength) {
            return true;
        }
        return false;
    },

    checkReverseDirection: function(grid, board, player, direction, returnGrid) {
        var row = grid.get("row") - direction.row,
            col = grid.get("col") - direction.col;

        if (BoardUtil.isGridLegal(row, col)) {
            var reverseDirectionGrid = board.getIn([row, col]);

            if (BoardUtil.verifyGridStatus(reverseDirectionGrid, EMPTY)) {
                return false;
            } else if (BoardUtil.verifyGridStatus(reverseDirectionGrid, player)) {
                if (returnGrid) {
                    return returnGrid;
                }
                return true;
            } else if (BoardUtil.verifyGridStatus(reverseDirectionGrid, BoardUtil.changePlayer(player))) {
                if (returnGrid) {
                    returnGrid.push(reverseDirectionGrid.set("value", player));
                }
                return BoardUtil.checkReverseDirection(reverseDirectionGrid, board, player, direction, returnGrid);
            }
        }
        return false;
    },

    getAvailableGridsGivenDirection: function(grid, board, player, direction, ifReverse) {
        var row = grid.get("row") + direction.row,
            col = grid.get("col") + direction.col,
            directionGrid = board.getIn([row, col]);

        if (ifReverse) {
            return BoardUtil.checkReverseDirection(grid, board, player, direction, []);
        }

        if (BoardUtil.isGridLegal(row, col) &&
            BoardUtil.verifyGridStatus(directionGrid, EMPTY) &&
            BoardUtil.checkReverseDirection(grid, board, player, direction, null)) {
            return [directionGrid.set("value", GridStatus.get("AVAILABLE"))];
        }
    },

    getAvailableGridsGivenGrid: function(grid, board, player, ifReverse) {
        return Direction.reduce(function(availableGrids, direction) {
            return availableGrids.concat(BoardUtil.getAvailableGridsGivenDirection(grid, board, player, direction, ifReverse));
        }, []);
    },

    /* Get the available grids and fill the status to them. */
    fillAvailableGrids: function(board, player) {
        var rowColLength = SettingsStore.getRowColumnLength(),
            reversePlayer = BoardUtil.changePlayer(player),
            availableGrids = [];
        for(var i = 0; i < rowColLength; i++) {
            for(var j = 0; j < rowColLength; j++) {
                var grid = board.getIn([i, j]);
                if (BoardUtil.verifyGridStatus(grid, reversePlayer)) {
                    availableGrids = availableGrids.concat(BoardUtil.getAvailableGridsGivenGrid(grid, board, player, false));
                }
            }
        }
        return Lazy(availableGrids).compact().uniq().value();
    },

    /* Get the grids those should be reversed and reverse them. */
    reverseGrids: function(piece, board, player) {
        var reversedGrids = BoardUtil.getAvailableGridsGivenGrid(piece, board, player, true);
        var puredGrids = Lazy(reversedGrids).compact().uniq().value();
        return BoardUtil.fillPieces(board, puredGrids);
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
    },

};

module.exports = BoardUtil;
