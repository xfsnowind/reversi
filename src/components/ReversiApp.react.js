var React = require("react"),
    ContentSection = require("./ContentSection.react"),
    SidebarSection = require("./SidebarSection.react");

var ReversiApp = React.createClass({
    render: function () {
        return (
            <div className="app">
                <ContentSection />
                <SidebarSection />
            </div>
            );
    }
});
module.exports = ReversiApp;
