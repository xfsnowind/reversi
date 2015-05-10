var React = require("react"),
    Immutable = require("immutable"),
    AVAILABLE = require("../constants/ReversiConstants").get("GridStatus").get("AVAILABLE"),
    PlayerActionCreators = require("../actions/PlayerActionCreators"),
    PieceSection = require("./PieceSection.react");

var GridSection = React.createClass({

    shouldComponentUpdate: function(nextProps, nextState) {
        return !Immutable.is(nextProps.grid, this.props.grid);
    },

    render: function() {
        var className = "grid";
        if (Immutable.is(this.props.grid.get("value"), AVAILABLE)) {
            className = "grid--available";
        }

        return (
            <div className={className} onClick={this._onClick}>
                <PieceSection player={this.props.grid.get("value")} />
            </div>
        );
    },

    _onClick: function(event) {
        if (Immutable.is(this.props.grid.get("value"), AVAILABLE)) {
            PlayerActionCreators.clickThread(this.props.grid);
        }
    }
});

module.exports = GridSection;
