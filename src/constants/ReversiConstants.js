var Immutable = require("immutable"),
    keyMirror = require("keymirror");

module.exports = Immutable.Map({
    "GridStatus": Immutable.Map(
        keyMirror({
            "WHITE": null,
            "BLACK": null,
            "EMPTY": null
        })
    ),
    "ActionTypes": Immutable.Map(
        keyMirror({
            "CLICK_THREAD": null
        })
    )
});
