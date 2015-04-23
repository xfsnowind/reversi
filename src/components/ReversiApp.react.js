var React = require("react"),
    ContentSection = require("./ContentSection.react");

var ReversiApp = React.createClass({
    render: function () {
        return (
            <div className="app">
                <div className="sidebar hidden-xs"></div>
                <ContentSection />
            </div>
            );
    }
});
module.exports = ReversiApp;
