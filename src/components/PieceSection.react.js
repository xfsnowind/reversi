var React = require("react"),
    Immutable = require("immutable"),
    FlipperSection = require("./FlipperSection.react"),
    Constants = require("../constants/ReversiConstants"),
    GridStatus = Constants.get("GridStatus");

function hasPiece(value) {
    return Immutable.is(value, GridStatus.get("WHITE")) ||
           Immutable.is(value, GridStatus.get("BLACK"));
}

var PieceSection = React.createClass({
    render: function() {
        if (hasPiece(this.props.player)) {
            return (
                <FlipperSection player={this.props.player} />
            );
        } else {
            return false;
        }
    }
});

module.exports = PieceSection;
