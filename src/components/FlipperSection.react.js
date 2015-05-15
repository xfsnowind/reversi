var React = require("react");

var FlipperSection = React.createClass({
    render: function() {
       var player = this.props.player;

        return (
            <div className="flipper">
                <div className={"flipper__piece flipper__white " + (player == "WHITE" ? "flipper__front" : "flipper__back")}> </div>
                <div className={"flipper__piece flipper__black " + (player == "BLACK" ? "flipper__front" : "flipper__back")}> </div>
            </div>
        );
    }
});

module.exports = FlipperSection;
