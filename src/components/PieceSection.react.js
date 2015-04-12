var React = require("react"),
    Immutable = require("immutable"),
    Constants = require("../constants/ReversiConstants");

var PieceSection = React.createClass({
    render: function() {
        if (!Immutable.is(this.props.player, Constants.getIn(["GridStatus", "EMPTY"]))) {
            var className = "piece " + this.props.player;
            return (
                <div className={className} />
            );
        } else {
            return false;
        }
    }
});

module.exports = PieceSection;
