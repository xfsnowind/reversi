import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ContentSection from "./ContentSection.react";
import SidebarSection from "./SidebarSection.react";

const ReversiApp = React.createClass({

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

export default ReversiApp;
