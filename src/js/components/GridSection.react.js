import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import Constants from "../../constants/ReversiConstants";
import PlayerActionCreators from "../actions/PlayerActionCreators";
import PieceSection from "./PieceSection.react";

var AVAILABLE = Constants.get("GridStatus").get("AVAILABLE");

var GridSection = React.createClass({

    mixins: [PureRenderMixin],

    render: function() {
        var className = "grid";
        if (Immutable.is(this.props.grid.get("value"), AVAILABLE)) {
            className = "grid grid--available";
        }

        return (
            <div className={className} onClick={this._onClick}>
                <PieceSection player={this.props.grid.get("value")} />
            </div>
        );
    },

    _onClick: function(event) {
        if (Immutable.is(this.props.grid.get("value"), AVAILABLE)) {
            PlayerActionCreators.clickThread(this.props.grid);
        }
    }
});

export default GridSection;
