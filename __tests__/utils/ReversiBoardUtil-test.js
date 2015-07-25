jest.dontMock("../../src/constants/ReversiConstants");
jest.dontMock("../../src/js/stores/SettingsStore");
jest.dontMock("../../src/js/utils/ReversiBoardUtil");
jest.dontMock("lodash");

var React = require('react/addons'),
    Immutable = require("immutable"),
    BoardUtil = require("../../src/js/utils/ReversiBoardUtil"),
    SettingsStore = require("../../src/js/stores/SettingsStore"),
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
    testBoard = BoardUtil.fillPieces(boardInit, pieces);

describe("ReversiBoardUtil", function() {
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
        it("return true if there exists the grid whose value is same with player on reversed direction with given direction", function() {
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 3}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 3}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("LEFT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 4}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("RIGHT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("UP_LEFT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 4}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN_LEFT"))).toEqual(true);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 4}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"))).toEqual(true);
        });

        it("return false if grid on the reversed direction exceed the borders", function() {
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 7, col: 3}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 0, col: 3}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 7}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 0}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 7, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("UP_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 3, col: 7}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("UP_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 7, col: 4}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 4, col: 0}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("UP_RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 0, col: 3}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 7}),
                                                            testBoard,
                                                            "WHITE",
                                                            DIRECTION.get("DOWN_LEFT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 0, col: 4}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"))).toEqual(false);
            expect(BoardUtil.checkReverseDirectionAvailable(Immutable.fromJS({row: 5, col: 0}),
                                                            testBoard,
                                                            "BLACK",
                                                            DIRECTION.get("DOWN_RIGHT"))).toEqual(false);
        });
    });

    describe("flipGridsOnReversedDirection", function() {
        describe("return an array grids if there exists the grid whose value is same with player on reversed direction with direction", function() {
            var result, expectedResult;

            it("UP", function() {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 3}),
                                                                testBoard,
                                                                "WHITE",
                                                                DIRECTION.get("UP"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 4, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 5, col: 3, value: "WHITE"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("DOWN", function() {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 6, col: 3}),
                                                                testBoard,
                                                                "WHITE",
                                                                DIRECTION.get("DOWN"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 5, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 4, col: 3, value: "WHITE"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("LEFT", function() {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 3}),
                                                                testBoard,
                                                                "WHITE",
                                                                DIRECTION.get("LEFT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 3, col: 4, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 5, value: "WHITE"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("RIGHT", function() {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 6}),
                                                                testBoard,
                                                                "WHITE",
                                                                DIRECTION.get("RIGHT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 3, col: 5, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 4, value: "WHITE"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("UP_LEFT", function() {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 4, col: 3}),
                                                                testBoard,
                                                                "BLACK",
                                                                DIRECTION.get("UP_LEFT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 5, col: 4, value: "BLACK"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("UP_RIGHT", function() {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 3, col: 5}),
                                                                testBoard,
                                                                "BLACK",
                                                                DIRECTION.get("UP_RIGHT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 4, col: 4, value: "BLACK"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("DOWN_LEFT", function() {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 5, col: 3}),
                                                                testBoard,
                                                                "BLACK",
                                                                DIRECTION.get("DOWN_LEFT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 4, col: 4, value: "BLACK"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });

            it("DOWN_RIGHT", function() {
                result = BoardUtil.flipGridsOnReversedDirection(Immutable.fromJS({row: 6, col: 5}),
                                                                testBoard,
                                                                "BLACK",
                                                                DIRECTION.get("DOWN_RIGHT"),
                                                                []);
                expectedResult = [Immutable.fromJS({row: 5, col: 4, value: "BLACK"})];
                for (var i = 0; i < result.length; i++) {
                    expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
                }
            });
        });
    });

    describe("getAvailableGridsGivenDirection", function() {
        describe("return an array containing the grid that is available with direction", function() {
            var result, expectedResult;

            it("UP", function() {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 3, col: 3}),
                                                                   testBoard,
                                                                   "WHITE",
                                                                   DIRECTION.get("UP"));
                expectedResult = [Immutable.fromJS({row: 2, col: 3, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("DOWN", function() {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 6, col: 3}),
                                                                   testBoard,
                                                                   "WHITE",
                                                                   DIRECTION.get("DOWN"));
                expectedResult = [Immutable.fromJS({row: 7, col: 3, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("LEFT", function() {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 3, col: 3}),
                                                                   testBoard,
                                                                   "WHITE",
                                                                   DIRECTION.get("LEFT"));
                expectedResult = [Immutable.fromJS({row: 3, col: 2, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("RIGHT", function() {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 3, col: 6}),
                                                                   testBoard,
                                                                   "WHITE",
                                                                   DIRECTION.get("RIGHT"));
                expectedResult = [Immutable.fromJS({row: 3, col: 7, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("UP_LEFT", function() {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 4, col: 3}),
                                                                   testBoard,
                                                                   "BLACK",
                                                                   DIRECTION.get("UP_LEFT"));
                expectedResult = [Immutable.fromJS({row: 3, col: 2, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("UP_RIGHT", function() {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 3, col: 5}),
                                                                   testBoard,
                                                                   "BLACK",
                                                                   DIRECTION.get("UP_RIGHT"));
                expectedResult = [Immutable.fromJS({row: 2, col: 6, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("DOWN_LEFT", function() {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 5, col: 3}),
                                                                   testBoard,
                                                                   "BLACK",
                                                                   DIRECTION.get("DOWN_LEFT"));
                expectedResult = [Immutable.fromJS({row: 6, col: 2, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });

            it("DOWN_RIGHT", function() {
                result = BoardUtil.getAvailableGridsGivenDirection(Immutable.fromJS({row: 6, col: 5}),
                                                                   testBoard,
                                                                   "BLACK",
                                                                   DIRECTION.get("DOWN_RIGHT"));
                expectedResult = [Immutable.fromJS({row: 7, col: 6, value: "AVAILABLE"})];
                expect(Immutable.is(result[0], expectedResult[0])).toEqual(true);
            });
        });
    });

    describe("getAvailableGridsGivenGrid", function() {
        it("return an array containing the grid that is available with given correct grid", function() {
            var result, expectedResult;
            result = BoardUtil.getAvailableGridsGivenGrid(Immutable.fromJS({row: 3, col: 3}),
                                                          testBoard,
                                                          "BLACK");
            expectedResult = [Immutable.fromJS({row: 2, col: 3, value: "AVAILABLE"}),
                              undefined,
                              Immutable.fromJS({row: 3, col: 2, value: "AVAILABLE"}),
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.getAvailableGridsGivenGrid(Immutable.fromJS({row: 2, col: 2}),
                                                          testBoard,
                                                          "BLACK");
            expectedResult = [undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }
        });

        it("return an array containing the grid that is available with given exceed-border grid", function() {
            var result, expectedResult;
            result = BoardUtil.getAvailableGridsGivenGrid(Immutable.fromJS({row: 8, col: 3}),
                                                          testBoard,
                                                          "BLACK");
            expectedResult = [undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.getAvailableGridsGivenGrid(Immutable.fromJS({row: 4, col: 8}),
                                                          testBoard,
                                                          "BLACK");
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }
        });
    });

    describe("getReversableGrids", function() {
        it("return an array containing the grid that is reversed according to given correct grid", function() {
            var result = BoardUtil.getReversableGrids(Immutable.fromJS({row: 3, col: 3}),
                                                      testBoard,
                                                      "WHITE"),
                expectedResult = [Immutable.fromJS({row: 4, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 5, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 4, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 5, value: "WHITE"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }

            result = BoardUtil.getReversableGrids(Immutable.fromJS({row: 2, col: 2}),
                                                  testBoard,
                                                  "WHITE");
            expect(result.length).toEqual(0);

            result = BoardUtil.getReversableGrids(Immutable.fromJS({row: 8, col: 2}),
                                                  testBoard,
                                                  "WHITE");
            expect(result.length).toEqual(0);

            result = BoardUtil.getReversableGrids(Immutable.fromJS({row: 2, col: 8}),
                                                  testBoard,
                                                  "WHITE");
            expect(result.length).toEqual(0);
        });
    });

    describe("allAvailableGrids", function() {
        it("return an array containing the grid that is available in the board", function() {
            var result = BoardUtil.allAvailableGrids(testBoard, "WHITE"),
                expectedResult = [Immutable.fromJS({row: 4, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 5, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 4, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 5, value: "WHITE"})];
            for (var i = 0; i < result.length; i++) {
                expect(Immutable.is(result[i], expectedResult[i])).toEqual(true);
            }
        });
    });

    describe("reverseGrids", function() {
        it("With given piece, board and player, return the board that the grids has been reversed.", function() {
            var result = BoardUtil.reverseGrids(Immutable.fromJS({row: 3, col: 3, value: "WHITE"}), testBoard, "WHITE"),
                expectedResult = [Immutable.fromJS({row: 4, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 5, col: 3, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 4, value: "WHITE"}),
                                  Immutable.fromJS({row: 3, col: 5, value: "WHITE"})],
                expectedBoard = BoardUtil.fillPieces(testBoard, expectedResult);
            expect(Immutable.is(expectedBoard, result)).toEqual(true);
        });
    });

    describe("clearAvailableGrids", function() {
        it("clear all the available grids from board", function() {
            var availableGrids = BoardUtil.allAvailableGrids(testBoard, "WHITE"),
                boardWithAvailableGrids = BoardUtil.fillPieces(testBoard, availableGrids),
                boardRemovedAvailableGrids = BoardUtil.clearAvailableGrids(boardWithAvailableGrids);
            expect(Immutable.is(testBoard, boardRemovedAvailableGrids)).toEqual(true);
        });
    });
});
