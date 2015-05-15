jest.dontMock("../../src/components/PieceSection.react.js");
jest.dontMock("../../src/components/FlipperSection.react.js");
jest.dontMock("../../src/constants/ReversiConstants");

var React = require('react/addons'),
    PieceSection = require('../../src/components/PieceSection.react.js'),
    TestUtils = React.addons.TestUtils;

describe("PieceSection", function() {
    it("get right class with given white grid", function() {
        var pieceSection = TestUtils.renderIntoDocument(<PieceSection player="WHITE" />),
            pieceWhiteNode = TestUtils.findRenderedDOMComponentWithClass(pieceSection, 'flipper__white');
        expect(pieceWhiteNode.getDOMNode().className).toEqual("flipper__piece flipper__white flipper__front");

        pieceSection = TestUtils.renderIntoDocument(<PieceSection player="BLACK" />);
        var pieceBlackNode = TestUtils.findRenderedDOMComponentWithClass(pieceSection, 'flipper__black');
        expect(pieceBlackNode.getDOMNode().className).toEqual("flipper__piece flipper__black flipper__front");
    });

    it("no dom node with empty grid", function() {
        var pieceSection = TestUtils.renderIntoDocument(<PieceSection player="EMPTY" />),
            pieceEmptyNodes = TestUtils.scryRenderedDOMComponentsWithTag(pieceSection, 'div');
        expect(pieceEmptyNodes.length).toEqual(0);

    })

    it("no dom node with available grid", function() {
        var pieceSection = TestUtils.renderIntoDocument(<PieceSection player="AVAILABLE" />),
            pieceAvailableNodes = TestUtils.scryRenderedDOMComponentsWithTag(pieceSection, 'div');
        expect(pieceAvailableNodes.length).toEqual(0);
    });
});
