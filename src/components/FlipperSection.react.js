var React = require("react");

var FlipperSection = React.createClass({
    render: function() {
       var player = this.props.player.toLowerCase();

        return (
            <div className="flipper-container">
                <div className="flipper">
                    <div className={"white piece " + (player == "white" ? "front" : "back")}> </div>
                    <div className={"black piece " + (player == "black" ? "front" : "back")}> </div>
                </div>
            </div>
        );
    }
});

module.exports = FlipperSection;
