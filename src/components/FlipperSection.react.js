var React = require("react");

var FlipperSection = React.createClass({
    render: function() {
       var player = this.props.player.toLowerCase();

        return (
            <div className="flipper">
                <div className={"filpper__piece flipper__white " + (player == "white" ? "flipper__front" : "flipper__back")}> </div>
                <div className={"filpper__piece flipper__black " + (player == "black" ? "flipper__front" : "flipper__back")}> </div>
            </div>
        );
    }
});

module.exports = FlipperSection;
