var React = require("react"),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    Immutable = require("immutable"),
    GridSection = require("./GridSection.react");

var RowSection = React.createClass({

    mixins: [PureRenderMixin],

    render: function() {
        var columnItems = this.props.row.map(function(grid) {
                return <GridSection grid={grid} key={grid.get("row") + ", " + grid.get("col")}/>;
            });

        return (
            <div className="board__row">
                <strong className="board__y-marker">
                    <span>{this.props.id}</span>
                </strong>
                {columnItems}
            </div>
        );
    }
});

module.exports = RowSection;
