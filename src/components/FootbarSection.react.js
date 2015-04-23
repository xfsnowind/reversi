var React = require("react"),
    Immutable = require("immutable"),
    BoardStore = require("../stores/BoardStore"),
    SidebarActionCreators = require("../actions/SidebarActionCreators");

function getStateFromStores() {
    return {data: Immutable.Map({
        "canRegret": BoardStore.canRegret(),
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
            regretButton;

        if (regretDisable) {
            regretButton = <input type="Button" className="regret" onClick={this._regret} disabled value="Regret"/>
        } else {
            regretButton = <input type="Button" className="regret" onClick={this._regret} value="Regret"/>
        }

        return (
            <div className="footbar">
                <input type="button" className="start" onClick={this._start} value="New Game"/>
                {regretButton}
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

module.exports = FootbarSection;
