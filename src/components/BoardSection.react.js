var React = require("react"),
    Immutable = require("immutable"),
    dispatcher = require("../dispatcher/ReversiDispatcher"),
    BoardStore = require("../Stores/BoardStore"),
    RowSection = require("./RowSection.react");

function getStateFromStores() {
    return {data: Immutable.Map({"board": BoardStore.getBoard()})};
}

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
            rowListItems = board.map(function(row) {
                return <RowSection row={row}/>;
            });
        return (
            <div className="content">
                <div className="board">
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
