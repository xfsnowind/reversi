var Immutable = require("immutable"),
    keyMirror = require("keymirror");

module.exports = Immutable.fromJS({
    "GridStatus": keyMirror({
        "WHITE": null,
        "BLACK": null,
        "AVAILABLE": null,
        "EMPTY": null
    }),
    "Direction": {
        "UP":         {"row" : -1, "col" : 0},
        "DOWN":       {"row" :  1, "col" : 0},
        "LEFT":       {"row" :  0, "col" : -1},
        "RIGHT":      {"row" :  0, "col" : 1},
        "UP_LEFT":    {"row" : -1, "col" : -1},
        "UP_RIGHT":   {"row" : -1, "col" : 1},
        "DOWN_LEFT":  {"row" :  1, "col" : -1},
        "DOWN_RIGHT": {"row" :  1, "col" : 1}
    },
    "ActionTypes": keyMirror({
        "CLICK_THREAD":  null,
        "START_THREAD":  null,
        "REGRET_THREAD": null
    })
});
