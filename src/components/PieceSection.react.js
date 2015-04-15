var React = require("react"),
    Immutable = require("immutable"),
    Constants = require("../constants/ReversiConstants"),
    GridStatus = Constants.get("GridStatus");

var PieceSection = React.createClass({
    render: function() {
        if (Immutable.is(this.props.player, GridStatus.get("WHITE")) ||
            Immutable.is(this.props.player, GridStatus.get("BLACK"))
) {
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
