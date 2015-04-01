var React = require("react"),
    Immutable = require("immutable"),
    GameStore = require("../Stores/GameStore"),
    PieceSection = require("./PieceSection.react");

var GridSection = React.createClass({
    getInitialState: function() {
        return Immutable.Map({
            "player": null
        });
    },

    render: function() {
        var piece;
        if (this.state.get("player")) {
            piece = <PieceSection player={this.state.get("player")}/>;
        }
        return (
            <div className="node" onClick={_onClick}>
                {piece}
            </div>
        );
    },

    _onClick: function(event) {
        var player = GameStore.getPlayer();
        this.setState(this.state.set("player", player));
    }
});

module.exports = GridSection;
