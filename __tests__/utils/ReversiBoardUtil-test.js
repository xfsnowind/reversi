jest.dontMock("../../src/constants/ReversiConstants");
jest.dontMock("../../src/stores/SettingsStore");
jest.dontMock("../../src/utils/ReversiBoardUtil");

var React = require('react/addons'),
    Immutable = require("immutable"),
    BoardUtil = require("../../src/utils/ReversiBoardUtil"),
    SettingsStore = require("../../src/stores/SettingsStore"),
    Constants = require("../../src/constants/ReversiConstants"),
    GridStatus = Constants.get("GridStatus"),
    WHITE = GridStatus.get("WHITE"),
    BLACK = GridStatus.get("BLACK"),
    DIRECTION = Constants.get("Direction"),
    rowColLength = SettingsStore.getRowColumnLength(),
    TestUtils = React.addons.TestUtils;

var boardInit = [];

function initialBoard(board) {
    for (var i = 0; i < rowColLength; i++) {
        var row = [];
        for (var j = 0; j < rowColLength; j++) {
            row.push({row:i, col:j, value: GridStatus.get("EMPTY")});
        }
        board.push(Immutable.fromJS(row));
    }
    return Immutable.fromJS(board);
}
boardInit = initialBoard(boardInit);

var filledBoard = Immutable.fromJS([[{"row": 0,"col": 0,"value": "EMPTY"},
                                     {"row": 0,"col": 1,"value": "EMPTY"},
                                     {"row": 0,"col": 2,"value": "EMPTY"},
                                     {"row": 0,"col": 3,"value": "EMPTY"},
                                     {"row": 0,"col": 4,"value": "EMPTY"},
                                     {"row": 0,"col": 5,"value": "EMPTY"},
                                     {"row": 0,"col": 6,"value": "EMPTY"},
                                     {"row": 0,"col": 7,"value": "EMPTY"}],
                                    [{"row": 1,"col": 0,"value": "EMPTY"},
                                     {"row": 1,"col": 1,"value": "EMPTY"},
                                     {"row": 1,"col": 2,"value": "EMPTY"},
                                     {"row": 1,"col": 3,"value": "EMPTY"},
                                     {"row": 1,"col": 4,"value": "EMPTY"},
                                     {"row": 1,"col": 5,"value": "EMPTY"},
                                     {"row": 1,"col": 6,"value": "EMPTY"},
                                     {"row": 1,"col": 7,"value": "EMPTY"}],
                                    [{"row": 2,"col": 0,"value": "EMPTY"},
                                     {"row": 2,"col": 1,"value": "EMPTY"},
                                     {"row": 2,"col": 2,"value": "EMPTY"},
                                     {"row": 2,"col": 3,"value": "WHITE"},
                                     {"row": 2,"col": 4,"value": "EMPTY"},
                                     {"row": 2,"col": 5,"value": "EMPTY"},
                                     {"row": 2,"col": 6,"value": "EMPTY"},
                                     {"row": 2,"col": 7,"value": "EMPTY"}],
                                    [{"row": 3,"col": 0,"value": "EMPTY"},
                                     {"row": 3,"col": 1,"value": "EMPTY"},
                                     {"row": 3,"col": 2,"value": "EMPTY"},
                                     {"row": 3,"col": 3,"value": "EMPTY"},
                                     {"row": 3,"col": 4,"value": "EMPTY"},
                                     {"row": 3,"col": 5,"value": "EMPTY"},
                                     {"row": 3,"col": 6,"value": "EMPTY"},
                                     {"row": 3,"col": 7,"value": "EMPTY"}],
                                    [{"row": 4,"col": 0,"value": "EMPTY"},
                                     {"row": 4,"col": 1,"value": "EMPTY"},
                                     {"row": 4,"col": 2,"value": "EMPTY"},
                                     {"row": 4,"col": 3,"value": "EMPTY"},
                                     {"row": 4,"col": 4,"value": "EMPTY"},
                                     {"row": 4,"col": 5,"value": "EMPTY"},
                                     {"row": 4,"col": 6,"value": "EMPTY"},
                                     {"row": 4,"col": 7,"value": "EMPTY"}],
                                    [{"row": 5,"col": 0,"value": "EMPTY"},
                                     {"row": 5,"col": 1,"value": "EMPTY"},
                                     {"row": 5,"col": 2,"value": "EMPTY"},
                                     {"row": 5,"col": 3,"value": "EMPTY"},
                                     {"row": 5,"col": 4,"value": "EMPTY"},
                                     {"row": 5,"col": 5,"value": "EMPTY"},
                                     {"row": 5,"col": 6,"value": "EMPTY"},
                                     {"row": 5,"col": 7,"value": "EMPTY"}],
                                    [{"row": 6,"col": 0,"value": "EMPTY"},
                                     {"row": 6,"col": 1,"value": "EMPTY"},
                                     {"row": 6,"col": 2,"value": "EMPTY"},
                                     {"row": 6,"col": 3,"value": "EMPTY"},
                                     {"row": 6,"col": 4,"value": "EMPTY"},
                                     {"row": 6,"col": 5,"value": "EMPTY"},
                                     {"row": 6,"col": 6,"value": "EMPTY"},
                                     {"row": 6,"col": 7,"value": "EMPTY"}],
                                    [{"row": 7,"col": 0,"value": "EMPTY"},
                                     {"row": 7,"col": 1,"value": "EMPTY"},
                                     {"row": 7,"col": 2,"value": "EMPTY"},
                                     {"row": 7,"col": 3,"value": "EMPTY"},
                                     {"row": 7,"col": 4,"value": "EMPTY"},
                                     {"row": 7,"col": 5,"value": "EMPTY"},
                                     {"row": 7,"col": 6,"value": "EMPTY"},
                                     {"row": 7,"col": 7,"value": "EMPTY"}]]);

describe("ReversiBoardUtil", function() {
    describe("changePlayer", function() {
        it("change player", function() {
            expect(BoardUtil.changePlayer(WHITE)).toEqual(BLACK);
            expect(BoardUtil.changePlayer(BLACK)).toEqual(WHITE);
        });
    });

    describe("fillPiece", function() {
        it("fill piece when given row and col are available", function() {
            expect(Immutable.is(BoardUtil.fillPiece(boardInit, 2, 3, "WHITE"), filledBoard)).toEqual(true);
        });
    });

    describe("fillPieces", function() {
        it("fill pieces to board with given grids", function() {
            expect(Immutable.is(BoardUtil.fillPieces(boardInit, [{row: 2, col: 3, value: "WHITE"}]), filledBoard)).toEqual(true);
        });
    });

    describe("verifyGridStatus", function() {
        it("verify grid status", function() {
            expect(BoardUtil.verifyGridStatus(Immutable.fromJS({value: "BLACK"}), BLACK)).toEqual(true);
            expect(BoardUtil.verifyGridStatus(Immutable.fromJS({value: "BLACK"}), WHITE)).toEqual(false);
        });
    });

    describe("isGridLegal", function() {
        it("is given grid legal", function() {
            expect(BoardUtil.isGridLegal(2, 4)).toEqual(true);
            expect(BoardUtil.isGridLegal(-2, 4)).toEqual(false);
            expect(BoardUtil.isGridLegal(2, -4)).toEqual(false);
            expect(BoardUtil.isGridLegal(2, 9)).toEqual(false);
            expect(BoardUtil.isGridLegal(9, 4)).toEqual(false);
        });
    });

    describe("checkReverseDirectionAvailableAvailable", function() {
        /*          0   00000000
         *          1   00000000
         *          2   00000000
         *          3   000wbbw0
         *          4   000bw000
         *          5   000bw000
         *          6   000wbb00
         *          7   00000000*/
        var pieces = Immutable.fromJS([{row: 3, col: 3, value: "WHITE"},
                                       {row: 3, col: 4, value: "BLACK"},
                                       {row: 3, col: 5, value: "BLACK"},
                                       {row: 3, col: 6, value: "WHITE"},
                                       {row: 4, col: 3, value: "BLACK"},
                                       {row: 4, col: 4, value: "WHITE"},
                                       {row: 5, col: 3, value: "BLACK"},
                                       {row: 5, col: 4, value: "WHITE"},
                                       {row: 6, col: 3, value: "WHITE"},
                                       {row: 6, col: 4, value: "BLACK"},
                                       {row: 6, col: 5, value: "BLACK"}]),
            filledBoard = BoardUtil.fillPieces(boardInit, pieces);

        it("return true if there exists the grid whose value is same with player on reversed direction with given direction", function() {
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 3}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 3}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 3}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("LEFT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 4}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("RIGHT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 3}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("UP_LEFT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 4}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 3}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN_LEFT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 4}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"))).toEqual(true);
        });

        it("return false if grid on the reversed direction exceed the borders", function() {
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 7, col: 3}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 0, col: 3}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 7}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 0}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 7, col: 3}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("UP_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 7}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("UP_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 7, col: 4}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 0}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 0, col: 3}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 7}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 0, col: 4}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 0}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"))).toEqual(false);
        });

        it("return an array grids if there exists the grid whose value is same with player on reversed direction with given direction", function() {
            var result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 3}),
                                                                filledBoard,
                                                                "WHITE",
                                                                DIRECTION.get("UP"),
                                                                []),
                expectedResult = [Immutable.fromJS({row: 4, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 5, col: 3, value: "WHITE"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 6, col: 3}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN"),
                                                            []);
            expectedResult = [Immutable.fromJS({row: 5, col: 3, value: "WHITE"}),
                              Immutable.fromJS({row: 4, col: 3, value: "WHITE"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 3}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("LEFT"),
                                                            []);
            expectedResult = [Immutable.fromJS({row: 3, col: 4, value: "WHITE"}),
                              Immutable.fromJS({row: 3, col: 5, value: "WHITE"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 6}),
                                                            filledBoard,
                                                            "WHITE",
                                                            DIRECTION.get("RIGHT"),
                                                            []);
            expectedResult = [Immutable.fromJS({row: 3, col: 5, value: "WHITE"}),
                              Immutable.fromJS({row: 3, col: 4, value: "WHITE"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 4, col: 3}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_LEFT"),
                                                            []);
            expectedResult = [Immutable.fromJS({row: 5, col: 4, value: "BLACK"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 5}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"),
                                                            []);
            expectedResult = [Immutable.fromJS({row: 4, col: 4, value: "BLACK"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 5, col: 3}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_LEFT"),
                                                            []);
            expectedResult = [Immutable.fromJS({row: 4, col: 4, value: "BLACK"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }


            result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 6, col: 5}),
                                                            filledBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"),
                                                            []);
            expectedResult = [Immutable.fromJS({row: 5, col: 4, value: "BLACK"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

        });
    });

    describe("getAvailableGridsGivenDirection", function() {
        /*          0   00000000
         *          1   00000000
         *          2   00000000
         *          3   000wbbw0
         *          4   000bw000
         *          5   000bw000
         *          6   000wbb00
         *          7   00000000*/
        var pieces = Immutable.fromJS([{row: 3, col: 3, value: "WHITE"},
                                       {row: 3, col: 4, value: "BLACK"},
                                       {row: 3, col: 5, value: "BLACK"},
                                       {row: 3, col: 6, value: "WHITE"},
                                       {row: 4, col: 3, value: "BLACK"},
                                       {row: 4, col: 4, value: "WHITE"},
                                       {row: 5, col: 3, value: "BLACK"},
                                       {row: 5, col: 4, value: "WHITE"},
                                       {row: 6, col: 3, value: "WHITE"},
                                       {row: 6, col: 4, value: "BLACK"},
                                       {row: 6, col: 5, value: "BLACK"}]),
            filledBoard = BoardUtil.fillPieces(boardInit, pieces);

            // result = BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 6, col: 5}),
            //                                          filledBoard,
            //                                          "BLACK",
            //                                          DIRECTION.get("DOWN_RIGHT"),
            //                                          []);
            // expectedResult = [Immutable.fromJS({row: 5, col: 4, value: "BLACK"})];
            // for (var i = 0; i < result.length; i++) {
            //     expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            // }



    });
});
