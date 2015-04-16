var React = require("react"),
    BoardSection = require("./BoardSection.react");

var ContentSection = React.createClass({
    render: function () {
        return (
            <div className="content">
                <BoardSection />
            </div>
            );
    }
});
module.exports = ContentSection;
