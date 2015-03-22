/*global require, module*/
/*jslint node: true*/
"use strict";

var paint = require("./paint.js"),
    settings = require("./settings.js");

var WHITE = -1,
    EMPTY = 0,
    BLACK = 1,
    N = settings.boardLen / settings.pieceLen;

function P(piece) {
    return piece.row + piece.column * N;
}

function getCanvasContext(canvasElement) {
    if (canvasElement.getContext) {
        return canvasElement.getContext('2d');
    }
    return null;
}

function initBoard() {
    var board = [];
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            board[P({row: i, column: j})] = EMPTY;
        }
    }
    var rightBottomRow = rightBottomColumn = N >> 1;

    board[P({row: rightBottomRow - 1, column: rightBottomColumn - 1})] = WHITE;
    board[P({row: rightBottomRow, column: rightBottomColumn - 1})] = BLACK;
    board[P({row: rightBottomRow - 1, column: rightBottomColumn})] = WHITE;
    board[P({row: rightBottomRow, column: rightBottomColumn})] = BLACK;
    return board;
}

function init() {
    var canvasElement = document.getElementById("canvas"),
        canvasContext=  getCanvasContext(canvasElement),
        board = initBoard(),
        isBlack = true;

    if (canvasContext) {
        paint.drawEmptyBoard(canvasContext, board);

        canvasElement.addEventListener("click", function (event) {
            var cell = paint.getPieceFromEvent(event);
            isBlack = paint.drawPiece(canvasContext, cell, isBlack);
        }, false);
    } else {
        console.log("fail");
    }
}

init();
