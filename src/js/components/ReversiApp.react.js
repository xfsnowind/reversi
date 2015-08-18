var React = require("react"),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    ContentSection = require("./ContentSection.react"),
    SidebarSection = require("./SidebarSection.react");

var ReversiApp = React.createClass({

    mixins: [PureRenderMixin],

    render: function () {
        return (
            <div className="app">
                <SidebarSection />
                <ContentSection />
            </div>
            );
    }
});
module.exports = ReversiApp;
