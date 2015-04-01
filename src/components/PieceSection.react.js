var React = require("react"),
    Immutable = require("immutable");

var PieceSection = React.createClass({
    render: function() {
        var className = "piece " + this.props.player;
        return (
            <span className={className}>
            </span>
        );
    }
});

module.exports = PieceSection;
