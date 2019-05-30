var express = require('express');
var router = express.Router();
var ReviewCollection = require("../models/reviewSchema.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Add dummy review Data for testing*/
// router.get("/dummyData", (req,res)=>
// {
//   let data =
//       [
//         {title:"Review1",body:"This is a short review about some game",creatorIdReferencePiece:"123",gameIdReferencePiece: "123",
//         reviewRating: [{userRatings:1},{userRatings:3},{userRatings:4},{userRatings:4}]},
//         {title:"Review2",body:"This is a short review about some game",creatorIdReferencePiece:"123",gameIdReferencePiece: "123",
//           reviewRating: [{userRatings:1},{userRatings:3},{userRatings:4},{userRatings:4}]},
//         {title:"Review3",body:"This is a short review about some game",creatorIdReferencePiece:"123",gameIdReferencePiece: "123",
//           reviewRating: [{userRatings:1},{userRatings:3},{userRatings:4},{userRatings:4}]}
//       ];
//   ReviewCollection.create(data,(errors,results)=>
//   {
//     if(errors)res.send(errors);
//     else res.send(results)
//   })
// });


// router.get("/userDummyData",(req,res)=>
// {
//   let data =
//       [
//         {},
//         {},
//         {}
//       ];
// });

// router.get("/gameDummyData",(req,res)=>
// {
//   let data =
//       [
//         {}
//       ];
// });




module.exports = router;
