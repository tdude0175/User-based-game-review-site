const express = require('express');
const router = express.Router();
const ReviewCollection = require("../models/reviewSchema.js");
const GameCollection = require("../models/gameSchema.js");


router.get("/reviews",(req,res)=>
{
   res.send("we have review access now");
});


//don't need to fill out each individuial piece since info can be added late {and will be}
router.post("/addReview",(req,res)=>
{
    // console.log(req.body);
    // console.log("Made it through");
    ReviewCollection.create({
        gameIdReferencePiece: req.body.gameIdReferencePiece,
        title: req.body.title,
        body:req.body.body,
        creatorIdReferencePiece:req.body.creatorIdReferencePiece,
        gameReviewNumber: req.body.gameReviewNumber,
    },(errors,results)=>
    {
        if(errors)
        {
            // console.log(errors);
            res.send(errors);
        }
        else
            {
                // console.log("it didn't have an error");
                res.send(results._id);
            }
    });
});

router.post("/listReviews",(req,res)=>
{
    ReviewCollection.find({gameIdReferencePiece:req.body.gameIdReferencePiece},(errors,results)=>
    {
        if(errors)
        {
            res.send(errors);
        }
        else
            {
                res.send(results)
            }
    });
});

router.put("/updateReview",(req,res)=>
{
    ReviewCollection.findOneAndUpdate({_id:req.body._id},req.body,(errors,results)=>
    {
        if(errors)
        {
            res.send(errors);
        }
        else
            {
                res.send("Update complete");
            }
    });
});

router.put("/reviewReview",(req,res)=>
{
    ReviewCollection.findOneAndUpdate({_id:req.body._id},{$push:{reviewRating:req.body}},(errors,results)=>
    {
        if(errors)
        {
            res.send(errors);
        }
        else
            {
                res.send("Review Added");
            }
    })
});

router.delete("/deleteReview",(req,res)=>
{
    ReviewCollection.findOneAndDelete({_id: req.body._id},(errors,results)=>
    {
        if(errors)
        {
            res.send(errors);
        }
        else
            {
                res.send("Review Removed");
            }
    });
});


module.exports = router;