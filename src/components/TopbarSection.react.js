var React = require("react"),
    Immutable = require("immutable"),
    BoardStore = require("../stores/BoardStore");

function getStateFromStores() {
    return {data: Immutable.Map({
        "numWhite": BoardStore.getNumberPieces()[0],
        "numBlack": BoardStore.getNumberPieces()[1],
        "player": BoardStore.getPlayer(),
        "gameOver": BoardStore.gameOver(),
    })};
}

var TopbarSection = React.createClass({

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
            player = this.state.data.get("player"),
            gameOver = this.state.data.get("gameOver"),
            middleText;

        if (gameOver) {
            var winner = null;
            if (numWhite > numBlack) {
                winner = "White";
            } else {
                winner = "Black"
            }

            middleText = <span className="topbar-text center">Game Over: {winner} wins!</span>;
        } else {
            middleText = <span className="topbar-text center">Player:  {player}</span>;
        }

        return (
            <div className="topbar">
                <span className="topbar-text">White: {numWhite}</span>
                {middleText}
                <span className="topbar-text right">Black: {numBlack}</span>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = TopbarSection;
