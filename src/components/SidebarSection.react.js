var React = require("react"),
    Immutable = require("immutable"),
    BoardStore = require("../stores/BoardStore"),
    FootbarActionCreators = require("../actions/FootbarActionCreators");

function getStateFromStores() {
    return {data: Immutable.Map({
        "canRegret": BoardStore.canRegret(),
        "numWhite": BoardStore.getNumberPieces()[0],
        "numBlack": BoardStore.getNumberPieces()[1],
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
        var regretDisable = !this.state.data.get("canRegret"),
            gameOver = this.state.data.get("gameOver"),
            numWhite = this.state.data.get("numWhite"),
            numBlack = this.state.data.get("numBlack"),
            player = this.state.data.get("player"),
            middleText,
            regretButton;

        if (regretDisable || gameOver) {
            regretButton = <input type="Button" className="button button--danger" onClick={this._regret} disabled="disabled" value="Regret"/>
        } else {
            regretButton = <input type="Button" className="button button--danger" onClick={this._regret} value="Regret"/>
        }

        if (gameOver) {
            var winner = numWhite > numBlack ? "White" : "Black";
            middleText = "Game Over: " + winner + " wins!";
        } else {
            middleText = "Player: " + player;
        }

        return (
            <div className="sidebar">
                <div>White: {numWhite}</div>
                <div>{middleText}</div>
                <div>Black: {numBlack}</div>
                <div>
                    <input type="button" className="button button--success" onClick={this._start} value="New Game"/>
                </div>
                <div>{regretButton}</div>
            </div>
        );
    },

    _start: function() {
        FootbarActionCreators.startGame();
    },

    _regret: function() {
        FootbarActionCreators.regret();
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = SidebarSection;
