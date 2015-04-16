var React = require("react"),
    Immutable = require("immutable"),
    dispatcher = require("../dispatcher/ReversiDispatcher"),
    BoardStore = require("../stores/BoardStore"),
    SidebarActionCreators = require("../actions/SidebarActionCreators"),
    Constants = require("../constants/ReversiConstants"),
    GridStatus = Constants.get("GridStatus");

function getStateFromStores() {
    return {data: Immutable.Map({
        "numWhite": BoardStore.getNumberPieces(GridStatus.get("WHITE")),
        "numBlack": BoardStore.getNumberPieces(GridStatus.get("BLACK")),
    })};
}

var SidebarSection = React.createClass({

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
        var numWhite = this.state.data.get("numWhite"),
            numBlack = this.state.data.get("numBlack");
        return (
            <div className="sidebar">
                <div>
                    "White: "
                    {numWhite}
                </div>
                <div>
                    "Black: "
                    {numBlack}
                </div>
                <div>
                    <input type="button" onClick={this._start} value="New Game"/>
                </div>
            </div>
        );
    },

    _start: function() {
        SidebarActionCreators.startGame();
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = SidebarSection;
