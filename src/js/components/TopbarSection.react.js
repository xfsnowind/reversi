var React = require("react"),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
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
        var numWhite = this.state.data.get("numWhite"),
            numBlack = this.state.data.get("numBlack"),
            player = this.state.data.get("player"),
            gameOver = this.state.data.get("gameOver"),
            middleText;

        if (gameOver) {
            if (numWhite > numBlack) {
                player = GridStatus.get("WHITE");
            } else {
                player = GridStatus.get("BLACK");
            }

            middleText = "Winner";
        } else {
            middleText = "Current Player";
        }

        return (
            <div className="topbar">
                <table>
                    <tr>
                        <td>
                            <div className="topbar__grid">
                                <FlipperSection player={GridStatus.get("WHITE")} />
                            </div>
                        </td>
                        <td>{middleText}</td>
                        <td>
                            <div className="topbar__grid">
                                <FlipperSection player={GridStatus.get("BLACK")} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>{numWhite}</td>
                        <td>
                            <div className="topbar__grid">
                                <FlipperSection player={player} />
                            </div>
                        </td>
                        <td>{numBlack}</td>
                    </tr>
                </table>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = TopbarSection;
