jest.dontMock("../src/components/FlipperSection.react.js");
describe("FlipperSection", function() {
    it("change state after click", function() {
        var React = require('react/addons');
        var FlipperSection = require('../src/components/FlipperSection.react.js');
        var TestUtils = React.addons.TestUtils;

        var flipperSection = TestUtils.renderIntoDocument(<FlipperSection player="WHITE" />);
        var flipperWhiteNode = TestUtils.findRenderedDOMComponentWithClass(flipperSection, 'flipper__white');
        expect(flipperWhiteNode.getDOMNode().className).toEqual("flipper__piece flipper__white flipper__front");
    });
});
