const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const gameSchema = new Schema
(
    {
        gameArtWork: {type: String},
        gameTitle: {type: String, required: true},
        gameInfo: {
            gameReleaseDate: {type: Date},
            gameConsoles: {type: String},
            gameCreators:{type:String},
            gameDescription:{type:String,max:5000}
        },
        gameRating: [
            {
                reviewId: {type: String}
            }
        ]
    }
);


module.exports = mongoose.model("games", gameSchema);