var React = require("react"),
    Immutable = require("immutable"),
    BoardStore = require("../stores/BoardStore"),
    FootbarActionCreators = require("../actions/FootbarActionCreators");

function getStateFromStores() {
    return {data: Immutable.Map({
        "canRegret": BoardStore.canRegret(),
        "gameOver": BoardStore.gameOver(),
    })};
}

var FootbarSection = React.createClass({

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
            regretButton;

        if (regretDisable || gameOver) {
            regretButton = <input type="Button" className="regret btn btn-danger" onClick={this._regret} disabled="disabled" value="Regret"/>
        } else {
            regretButton = <input type="Button" className="regret btn btn-danger" onClick={this._regret} value="Regret"/>
        }

        return (
            <div className="footbar">
                <input type="button" className="start btn btn-success" onClick={this._start} value="New Game"/>
                {regretButton}
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

module.exports = FootbarSection;
