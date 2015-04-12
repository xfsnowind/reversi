var Dispatcher = require("../dispatcher/ReversiDispatcher"),
    Constants = require("../Constants/ReversiConstants"),
    ActionTypes = Constants.get("ActionTypes");

module.exports = {
    clickThread: function(pos) {
        Dispatcher.dispatch({
            "type": ActionTypes.get("CLICK_THREAD"),
            "content": pos
        });
    }
};

