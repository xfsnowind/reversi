/*global module, document, require, Math*/
/*jslint node: true*/
"use strict";

var settings = require("./settings.js"),
    boardLen = settings.boardLen,
    boardWrapperLen = settings.boardWrapperLen,
    pieceLen = settings.pieceLen;

function paintChessBoardColor(context) {
    context.fillStyle = "lightblue";
    context.fillRect(boardWrapperLen, boardWrapperLen, boardLen, boardLen);
}

module.exports = {
    drawEmptyBoard: function(context) {
        paintChessBoardColor(context);

        context.lineWidth = 1.5;
        context.beginPath();

        /* vertical lines */
        for (var x = 0; x <= boardLen; x += pieceLen) {
            context.moveTo(0.5 + x + boardWrapperLen, boardWrapperLen);
            context.lineTo(0.5 + x + boardWrapperLen, boardWrapperLen + boardLen);
        }

        /* horizontal lines */
        for (var y = 0; y <= boardLen; y += pieceLen) {
            context.moveTo(boardWrapperLen, 0.5 + y + boardWrapperLen);
            context.lineTo(boardWrapperLen + boardLen, boardWrapperLen + 0.5 +  y);
        }

        /* draw it! */
        context.strokeStyle = "#000";
        context.stroke();
    },

    // update

    drawPiece: function(context, piece, isBlack) {
        if (piece !== null) {
            var column = piece.column,
                row = piece.row,
                x = (column * pieceLen) + (pieceLen / 2) + boardWrapperLen,
                y = (row * pieceLen) + (pieceLen / 2) + boardWrapperLen,
                radius = (pieceLen / 2) - (pieceLen / 10);

            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2, false);
            context.closePath();

            if (isBlack) {
                context.strokeStyle = "#333";
                context.fillStyle = "#000";
            } else {
                context.strokeStyle = "#999";
                context.fillStyle = "#fff";
            }
            context.stroke();
            context.fill();
            return !isBlack;
        }
        return isBlack;
    },

    getPieceFromEvent: function (event) {
        var x, y;
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

        x -= (settings.beginCanvasX + boardWrapperLen);
        y -= (settings.beginCanvasY + boardWrapperLen);

        if (x < 0 || y < 0 || x > boardLen || y > boardLen) {
            return null;
        }
        return {
           row: Math.floor(y / pieceLen),
           column: Math.floor(x / pieceLen)
       };
    }
};
