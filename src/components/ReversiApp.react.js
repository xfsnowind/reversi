var React = require("react"),
    BoardSection = require("./BoardSection.react"),
    SidebarSection = require("./SidebarSection.react");

var ReversiApp = React.createClass({
    render: function () {
        return (
            <div className="app">
                <SidebarSection />
                <BoardSection />
            </div>
            );
    }
});
module.exports = ReversiApp;
