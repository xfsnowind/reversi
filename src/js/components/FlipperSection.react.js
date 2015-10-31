import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var FlipperSection = React.createClass({

    mixins: [PureRenderMixin],

    render: function() {
       var player = this.props.player;

        return (
            <div className="flipper">
                <div className={"flipper__piece flipper__white " + (player == "WHITE" ? "flipper__front" : "flipper__back")}> </div>
                <div className={"flipper__piece flipper__black " + (player == "BLACK" ? "flipper__front" : "flipper__back")}> </div>
            </div>
        );
    }
});

export default FlipperSection;
