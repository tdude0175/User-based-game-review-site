const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const longReviewSchema = new Schema
(
    {
        title: {type:String,max:500},
        body:{type:String,required:true,max:5000},
        creatorIdReferencePiece:{type:String,required:true},
        gameIdReferencePiece:{type:String,required:true},
        reviewRating: [{
            userRatings:{type:Number,min:0,max:5}
        }
        ]
    }
);


module.exports = mongoose.model("longUserReviews",longReviewSchema);