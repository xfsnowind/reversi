var React = require("react/addons"),
    Immutable = require("immutable"),
    BoardStore = require("../Stores/BoardStore"),
    GridStatus = require("../constants/ReversiConstants").get("GridStatus"),
    PlayerActionCreators = require("../actions/PlayerActionCreators"),
    PieceSection = require("./PieceSection.react");

var GridSection = React.createClass({

    render: function() {
        var piece = <PieceSection player={this.props.grid.get("value")}/>,
            className = "node";
        if (Immutable.is(this.props.grid.get("value"), GridStatus.get("AVAILABLE"))) {
            className = "node AVAILABLE";
        } else {
            className = "node No-AVAILABLE";
        }

        return (
            <div className={className} onClick={this._onClick}>
                {piece}
            </div>
        );
    },

    _onClick: function(event) {
        if (Immutable.is(this.props.grid.get("value"), GridStatus.get("AVAILABLE"))) {
            PlayerActionCreators.clickThread(this.props.grid);
        }
    }
});

module.exports = GridSection;
