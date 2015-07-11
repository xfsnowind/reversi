var React = require("react"),
    Immutable = require("immutable"),
    FlipperSection = require("./FlipperSection.react"),
    GridStatus = require("../../constants/ReversiConstants").get("GridStatus"),
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
            if (numWhite > numBlack) {
                player = GridStatus.get("White");
            } else {
                player = GridStatus.get("Black");
            }

            middleText = "Winner";
        } else {
            middleText = "Current Player";
        }

        return (
            <div className="topbar">
                <div className="topbar__row">
                    <div className="topbar__node">
                        <div className="topbar__grid">
                            <FlipperSection player={GridStatus.get("WHITE")} />
                        </div>
                    </div>
                    <div className="topbar__node">
                        {middleText}
                    </div>
                    <div className="topbar__node">
                        <div className="topbar__grid">
                            <FlipperSection player={GridStatus.get("BLACK")} />
                        </div>
                    </div>
                </div>
                <div className="topbar__row">
                    <div className="topbar__node">{numWhite}</div>
                    <div className="topbar__node">
                        <div className="topbar__grid">
                            <FlipperSection player={player} />
                        </div>
                    </div>
                    <div className="topbar__node">{numBlack}</div>
                </div>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = TopbarSection;
