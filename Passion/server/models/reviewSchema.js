const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewSchema = new Schema
(
    {
        title: {type:String,max:250},
        body:{type:String,required:true,max:5000},
        creatorIdReferencePiece:{type:String,required:true},
        gameIdReferencePiece:{type:String,required:true},
        reviewRating: [{
            userRatings:{type:Number,min:0,max:5}
        }
        ]
    }
);


module.exports = mongoose.model("userReviews",reviewSchema);