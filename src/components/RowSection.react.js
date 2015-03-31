var React = require("react"),
    Immutable = require("immutable"),
    SettingsStore = require("../Stores/SettingsStore");

function getStateFromStores() {
    return Immutable.Map({
        columnNum: SettingsStore.getRowColumnLength()
    });
}
var RowSection = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },

    render: function() {
        var columnItems = [];
        for (var i = 0; i < this.state.get("columnNum"); i++) {
            columnItems.push(<div className="node"></div>);
        }
        return (
            <div className="row">
                {columnItems}
            </div>
        );
    }
});

module.exports = RowSection;
