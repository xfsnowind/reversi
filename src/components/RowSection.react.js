var React = require("react"),
    Immutable = require("immutable"),
    GridSection = require("./GridSection.react");

var RowSection = React.createClass({

    render: function() {
        var row = this.props.row,
            columnItems = row.map(function(grid) {
                return <GridSection grid={grid} />;
            });
        return (
            <div className="row">
                {columnItems}
            </div>
        );
    }
});

module.exports = RowSection;
