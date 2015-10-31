import React from 'react';
import Immutable from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FlipperSection from "./FlipperSection.react";
import Constants from "../../constants/ReversiConstants";

var GridStatus = Constants.get("GridStatus");

function hasPiece(value) {
    return Immutable.is(value, GridStatus.get("WHITE")) ||
           Immutable.is(value, GridStatus.get("BLACK"));
}

var PieceSection = React.createClass({

    mixins: [PureRenderMixin],

    render: function() {
        if (hasPiece(this.props.player)) {
            return (
                <FlipperSection player={this.props.player} />
            );
        } else {
            return false;
        }
    }
});

export default PieceSection;
