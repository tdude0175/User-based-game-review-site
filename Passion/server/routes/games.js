const express = require('express');
const router = express.Router();
const ReviewCollection = require("../models/reviewSchema.js");
const GameCollection = require("../models/gameSchema.js");

router.get("/GameList", (req, res) => {
    GameCollection.find((errors,results)=>
    {
        if(errors)
        {
            res.send(errors);
        }
        else
            {
                console.log("Here are all games");
                res.send(results);
            }
    })
});

router.post("/addGame", (req, res) => {
    GameCollection.create({
        gameArtWork: req.body.gameArtWork,
        gameTitle: req.body.gameTitle,
        gameInfo: {
            gameReleaseDate: req.body.gameReleaseDate,
            gameConsoles: req.body.gameConsoles,
            gameCreators:req.body.gameCreators,
            gameDescription:req.body.gameDescription
        }
    }, (errors, results) => {
        if (errors) {
            res.send(errors);
        } else {
            console.log("game created");
            res.send(results);
        }
    })
});

router.put("/updateGame",(req,res)=>
{
    GameCollection.findOneAndUpdate
})

module.exports = router;