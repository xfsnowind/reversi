jest.dontMock("../../src/components/FlipperSection.react.js");
describe("FlipperSection", function() {
    it("get right class with given player", function() {
        var React = require('react/addons'),
            FlipperSection = require('../../src/components/FlipperSection.react.js'),
            TestUtils = React.addons.TestUtils,

            flipperSection = TestUtils.renderIntoDocument(<FlipperSection player="WHITE" />),
            flipperWhiteNode = TestUtils.findRenderedDOMComponentWithClass(flipperSection, 'flipper__white');

        expect(flipperWhiteNode.getDOMNode().className).toEqual("flipper__piece flipper__white flipper__front");
    });
});
