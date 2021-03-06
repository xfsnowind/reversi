var React = require("react"),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    Immutable = require("immutable"),
    BoardStore = require("../stores/BoardStore"),
    SettingsStore = require("../stores/SettingsStore"),
    RowSection = require("./RowSection.react");

function getStateFromStores() {
    return {data: Immutable.Map({"board": BoardStore.getBoard()})};
}

var markers = "abcdefghijklmnopqrstuvwxyz";

var BoardSection = React.createClass({

    mixins: [PureRenderMixin],

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        BoardStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        BoardStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var board = this.state.data.get("board"),
            rowColLength = SettingsStore.getRowColumnLength(),
            i = 0,
            markerItems = markers.substring(0, rowColLength)
                                 .split("")
                                 .map(function(a) {
                                     return <div key={"x-marker" + a} className="board__x-marker">
                                                <span>{a.toUpperCase()}</span>
                                            </div>;
                                 }),
            rowListItems = board.map(function(row) {
                i++;
                return <RowSection row={row} id={i} key={"row" + row.getIn([0, "row"])} />;
            });
        markerItems = [<div key="x-marker0" className="board__x-marker"> </div>].concat(markerItems);

        return (
            <div className="board">
                <div className="board__x-markers">{markerItems}</div>
                {rowListItems}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = BoardSection;
