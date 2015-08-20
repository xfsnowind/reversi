var React = require("react"),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    TopbarSection = require("./TopbarSection.react"),
    FootbarSection = require("./FootbarSection.react"),
    BoardSection = require("./BoardSection.react");

var ContentSection = React.createClass({

    mixins: [PureRenderMixin],

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
