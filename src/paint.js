/*global module*/
/*jslint node: true*/
"use strict";

function paintChessBoardColor(context, boardLen, boardWrapperLen) {
    context.fillStyle = "lightblue";
    context.fillRect(boardWrapperLen, boardWrapperLen, boardLen, boardLen);
}

module.exports = {
    drawChessBoard: function(context, pieceLen, boardLen, boardWrapperLen) {
        paintChessBoardColor(context, boardLen, boardWrapperLen);

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

    drawPiece: function(context, piece, pieceLen, boardWrapperLen, isBlack) {
        if (piece !== null) {
            var column = piece.column;
            var row = piece.row;
            var x = (column * pieceLen) + (pieceLen/2) + boardWrapperLen;
            var y = (row * pieceLen) + (pieceLen/2) + boardWrapperLen;
            var radius = (pieceLen/2) - (pieceLen/10);

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
    }
};
