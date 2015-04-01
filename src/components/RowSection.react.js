var React = require("react"),
    Immutable = require("immutable"),
    SettingsStore = require("../Stores/SettingsStore"),
    GridSection = require("./GridSection.react");

function getStateFromStores() {
    return Immutable.Map({
        "columnNum": SettingsStore.getRowColumnLength()
    });
}
var RowSection = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },

    render: function() {
        var columnItems = [];
        for (var i = 0; i < this.state.get("columnNum"); i++) {
            columnItems.push(<GridSection />);
        }
        return (
            <div className="row">
                {columnItems}
            </div>
        );
    }
});

module.exports = RowSection;
