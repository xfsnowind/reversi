var React = require("react"),
    Immutable = require("immutable"),
    dispatcher = require("../dispatcher/ReversiDispatcher"),
    SettingsStore = require("../Stores/SettingsStore"),
    RowSection = require("./RowSection.react");

function getStateFromStores() {
    return Immutable.Map({
        rowLength: SettingsStore.getRowColumnLength()
    });
}

var ContentSection = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },

    render: function() {
        var rowListItems = [];
        for (var i = 0; i < this.state.get("rowLength"); i++) {
            rowListItems.push(<RowSection />);
        }
        return (
            <div className="content">
                {rowListItems}
            </div>
        );
    }
});

module.exports = ContentSection;
