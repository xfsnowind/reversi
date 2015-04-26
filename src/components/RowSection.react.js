var React = require("react"),
    Immutable = require("immutable"),
    GridSection = require("./GridSection.react");

var RowSection = React.createClass({

    shouldComponentUpdate: function(nextProps) {
        return !Immutable.is(nextProps.row, this.props.row);
    },

    render: function() {
        var columnItems = this.props.row.map(function(grid) {
                return <GridSection grid={grid} key={grid.get("row") + ", " + grid.get("col")}/>;
            });

        return (
            <div className="row">
                <strong className="y-marker">{this.props.id}</strong>
                {columnItems}
            </div>
        );
    }
});

module.exports = RowSection;
