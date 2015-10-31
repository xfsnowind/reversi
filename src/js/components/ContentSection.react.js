import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TopbarSection from "./TopbarSection.react";
import FootbarSection from "./FootbarSection.react";
import BoardSection from "./BoardSection.react";

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

export default ContentSection;
