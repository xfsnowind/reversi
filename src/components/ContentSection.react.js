var React = require("react"),
    Topbar = require("./TopbarSection.react"),
    Footbar = require("./FootbarSection.react"),
    BoardSection = require("./BoardSection.react");

var ContentSection = React.createClass({
    render: function () {
        return (
            <div className="content">
                <Topbar />
                <BoardSection />
                <Footbar />
            </div>
            );
    }
});

module.exports = ContentSection;
