var React = require("react"),
    Immutable = require("immutable"),
    FlipperSection = require("./FlipperSection.react"),
    Constants = require("../constants/ReversiConstants"),
    GridStatus = Constants.get("GridStatus");

function hasPiece(value) {
    return Immutable.is(value, GridStatus.get("WHITE")) ||
           Immutable.is(value, GridStatus.get("BLACK"))
}

var PieceSection = React.createClass({
    getInitialState: function() {
        return {flipped: false};
    },

    componentWillReceiveProps: function(nextProps) {
        if (hasPiece(this.props.player) &&
            !Immutable.is(nextProps.player, this.props.player)) {
            this.setState({flipped: !this.state.flipped});
        }
    },

    render: function() {
        if (hasPiece(this.props.player)) {
            return (
                <FlipperSection player={this.props.player} flipped={this.state.flipped} />
            );
        } else {
            return false;
        }
    }
});

module.exports = PieceSection;
