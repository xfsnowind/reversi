var React = require("react"),
    Immutable = require("immutable"),
    dispatcher = require("../dispatcher/ReversiDispatcher"),
    BoardStore = require("../stores/BoardStore"),
    SidebarActionCreators = require("../actions/SidebarActionCreators"),
    Constants = require("../constants/ReversiConstants"),
    GridStatus = Constants.get("GridStatus");

function getStateFromStores() {
    return {data: Immutable.Map({
        "numWhite": BoardStore.getNumberPieces()[0],
        "numBlack": BoardStore.getNumberPieces()[1],
        "canRegret": BoardStore.canRegret(),
        "player": BoardStore.getPlayer(),
        "gameOver": BoardStore.gameOver(),
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
            numBlack = this.state.data.get("numBlack"),
            regretDisable = !this.state.data.get("canRegret"),
            player = this.state.data.get("player"),
            gameOver = this.state.data.get("gameOver"),
            gameOverText,
            regretButton;

        if (regretDisable) {
            regretButton = <input type="Button" onClick={this._regret} disabled value="Regret"/>
        } else {
            regretButton = <input type="Button" onClick={this._regret} value="Regret"/>
        }

        if (gameOver) {
            var winner = null;
            if (numWhite > numBlack) {
                winner = "White";
            } else {
                winner = "Black"
            }

            gameOverText = <div>Game Over: {winner} wins!</div>
        }

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
                    "Player: "
                    {player}
                </div>
                <div>
                    <input type="button" onClick={this._start} value="New Game"/>
                </div>
                <div>{regretButton}</div>
                {gameOverText}
            </div>
        );
    },

    _start: function() {
        SidebarActionCreators.startGame();
    },

    _regret: function() {
        SidebarActionCreators.regret();
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = SidebarSection;
