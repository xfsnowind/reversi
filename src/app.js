/*global require, module*/
/*jslint node: true*/
"use strict";

var paint = require("./paint.js"),
    settings = require("./settings.js");

function getCursorPosition(event, canvasElement, pieceLen, beginCanvasX, beginCanvasY, boardLen, boardWrapperLen) {
    var x;
    var y;
    if (event.pageX != undefined && event.pageY != undefined) {
        x = event.pageX;
        y = event.pageY;
    }
    else {
        x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    x -= (beginCanvasX + boardWrapperLen);
    y -= (beginCanvasY + boardWrapperLen);

    if (x < 0 || y < 0 || x > boardLen || y > boardLen) {
        return null;
    }
    return {
               row: Math.floor(y / pieceLen),
               column: Math.floor(x / pieceLen)
           };
}

function init() {
    var canvasElement = document.getElementById("canvas");
    if (canvasElement.getContext) {
        var ctx = canvasElement.getContext('2d'),
            isBlack = true,
            boardLen = settings.boardLen,
            pieceLen = settings.pieceLen,
            beginCanvasX = settings.beginCanvasX,
            beginCanvasY = settings.beginCanvasY,
            boardWrapperLen = settings.boardWrapperLen,
            board = [];

        canvasElement.addEventListener("click", function (event) {
            var cell = getCursorPosition(event, canvasElement, pieceLen,
                beginCanvasX, beginCanvasY, boardLen, boardWrapperLen);
            isBlack = paint.drawPiece(ctx, cell, pieceLen, boardWrapperLen, isBlack);
        }, false);

        paint.drawChessBoard(ctx, pieceLen, boardLen, boardWrapperLen);
    } else {
        console.log("fail");
    }
}

init();
