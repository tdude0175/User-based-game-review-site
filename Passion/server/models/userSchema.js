const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema
(
    {
        username:{type:String,required:true,max:250},
        password:{type: String,required:true,max:500},
        profilePicture:{type:String},
        BackgroundImage:{type:String},
        followedGames:[
            {
                gameReferenceId:{type,String}
            }
        ]
    }
);
module.exports = mongoose.model("userAccounts",userSchema);