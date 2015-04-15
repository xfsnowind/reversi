var React = require("react"),
    Immutable = require("immutable"),
    dispatcher = require("../dispatcher/ReversiDispatcher"),
    ContentStore = require("../Stores/ContentStore"),
    RowSection = require("./RowSection.react");

function getStateFromStores() {
    return {data: Immutable.Map({"board": ContentStore.getBoard()})};
}

var ContentSection = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        ContentStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ContentStore.removeChangeListener(this._onChange);
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

module.exports = ContentSection;
