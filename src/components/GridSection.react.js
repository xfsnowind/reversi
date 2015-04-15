var React = require("react/addons"),
    Immutable = require("immutable"),
    ContentStore = require("../Stores/ContentStore"),
    GridStatus = require("../constants/ReversiConstants").get("GridStatus"),
    PlayerActionCreators = require("../actions/PlayerActionCreators"),
    PieceSection = require("./PieceSection.react");

var GridSection = React.createClass({

    render: function() {
        var piece = <PieceSection player={this.props.grid.get("value")}/>;
        return (
            <div className="node" onClick={this._onClick}>
                {piece}
            </div>
        );
    },

    _onClick: function(event) {
        var player = ContentStore.getPlayer();
        if (Immutable.is(this.props.grid.get("value"), GridStatus.get("EMPTY"))) {
            PlayerActionCreators.clickThread(this.props.grid);
        }
    }
});

module.exports = GridSection;
