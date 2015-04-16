var Dispatcher = require("../dispatcher/ReversiDispatcher"),
    Constants = require("../constants/ReversiConstants"),
    ActionTypes = Constants.get("ActionTypes");

module.exports = {
    startGame: function() {
        Dispatcher.dispatch({
            "type": ActionTypes.get("START_THREAD")
        });
    }
};

