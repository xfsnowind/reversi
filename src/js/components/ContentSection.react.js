var React = require("react"),
    TopbarSection = require("./TopbarSection.react"),
    FootbarSection = require("./FootbarSection.react"),
    BoardSection = require("./BoardSection.react");

var ContentSection = React.createClass({
    render: function () {
        return (
            <div className="content">
                <TopbarSection />
                <BoardSection />
                <FootbarSection />
            </div>
            );
    }
});

module.exports = ContentSection;
