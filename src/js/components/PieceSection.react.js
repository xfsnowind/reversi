var React = require("react"),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    Immutable = require("immutable"),
    FlipperSection = require("./FlipperSection.react"),
    Constants = require("../../constants/ReversiConstants"),
    GridStatus = Constants.get("GridStatus");

function hasPiece(value) {
    return Immutable.is(value, GridStatus.get("WHITE")) ||
           Immutable.is(value, GridStatus.get("BLACK"));
}

var PieceSection = React.createClass({

    mixins: [PureRenderMixin],

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
