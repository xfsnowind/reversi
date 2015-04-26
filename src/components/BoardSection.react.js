var React = require("react"),
    Lazy = require("lazy.js"),
    Immutable = require("immutable"),
    BoardStore = require("../Stores/BoardStore"),
    SettingsStore = require("../stores/SettingsStore"),
    RowSection = require("./RowSection.react");

function getStateFromStores() {
    return {data: Immutable.Map({"board": BoardStore.getBoard()})};
}

var markers = "abcdefghijklmnopqrstuvwxyz";

var BoardSection = React.createClass({

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
            markerItems = Lazy(markers).take(rowColLength)
                                       .map(function(a) {
                                           return <div key={"x-marker" + a} className="x-marker">{a.toUpperCase()}</div>;
                                       })
                                       .value(),
            rowListItems = board.map(function(row) {
                i++;
                return <RowSection row={row} id={i} key={"row" + row.getIn([0, "row"])} />;
            });
        markerItems = [<div key="x-marker0" className="x-marker"> </div>].concat(markerItems);

        return (
            <div className="board">
                <div className="x-markers">{markerItems}</div>
                <div className="board-content">
                    {rowListItems}
                </div>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = BoardSection;
