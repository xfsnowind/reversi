jest.dontMock("../../src/js/components/PieceSection.react");
jest.dontMock("../../src/js/components/FlipperSection.react");
jest.dontMock("../../src/js/components/GridSection.react");
jest.dontMock("../../src/js/actions/PlayerActionCreators");
jest.dontMock("../../src/constants/ReversiConstants");

describe("GridSection", function() {
    it("get right class with given grid", function() {
        var React = require('react/addons'),
            Immutable = require("immutable"),
            GridSection = require('../../src/js/components/GridSection.react'),
            TestUtils = React.addons.TestUtils;

        var emptyGrid = Immutable.fromJS({"value": "EMPTY"}),
            whiteGrid = Immutable.fromJS({"value": "WHITE"}),
            availableGrid = Immutable.fromJS({"value": "AVAILABLE"});

        var emptyGridSection = TestUtils.renderIntoDocument(<GridSection grid={emptyGrid} />),
            whiteGridSection = TestUtils.renderIntoDocument(<GridSection grid={whiteGrid} />),
            availableGridSection = TestUtils.renderIntoDocument(<GridSection grid={availableGrid} />);

        var emptyGridNode = TestUtils.findRenderedDOMComponentWithClass(emptyGridSection, "grid");
        expect(emptyGridNode.getDOMNode().className).toEqual("grid");

        var availableGridNode = TestUtils.findRenderedDOMComponentWithClass(availableGridSection, "grid");
        expect(availableGridNode.getDOMNode().className).toEqual("grid grid--available");


        var whiteGridNode = TestUtils.findRenderedDOMComponentWithClass(whiteGridSection, "grid"),
            flipperNode = TestUtils.scryRenderedDOMComponentsWithClass(whiteGridSection, "flipper__piece");
        expect(flipperNode.length).toEqual(2);
        expect(flipperNode[0].getDOMNode().className).toEqual("flipper__piece flipper__white flipper__front");
        expect(flipperNode[1].getDOMNode().className).toEqual("flipper__piece flipper__black flipper__back");
        expect(whiteGridNode.getDOMNode().className).toEqual("grid");
    });
});
